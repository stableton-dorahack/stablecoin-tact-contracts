import "./messages";

struct PositionState {
    collateral: Int as coins;
    debt: Int as uint64;
}

struct Message {
    timestamp: Int as uint64;
    message: String;
}

contract UserPositionContract  {

    const MinTonsForStorage: Int = ton("0.01");

    user: Address; // who owns this position
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
    collateral: Int as coins = 0;
    debt: Int = 0;
    message: Message;

    init(user: Address, stablecoinMasterAddress: Address, positionsManagerAddress: Address) {
        self.user = user; 
        self.stablecoinMasterAddress = stablecoinMasterAddress;
        self.positionsManagerAddress = positionsManagerAddress;
        self.message = Message{
            timestamp: 0,
            message: "Position Created"
        };

        // register this position in positionsManager
        send(SendParameters{
            to: self.positionsManagerAddress, 
            // how much we should send to this contract? 
            // how to pay for storage for this contract later? 
            // we have no more writes in position address contract ever
            mode: SendIgnoreErrors, 
            value: ton("0.1"), 
            bounce: true,
            body: NewPositionIdMessage{
                user: user
            }.toCell()
        });
    }

    fun setMessage(msg: String) {
        let updatedMessage: Message = Message{
            timestamp: now(),
            message: msg
        };
        self.message = updatedMessage;
    }

    /*
        message came from positionsManager
        check if position healthy
        add collateral
    */
    receive(msg: DepositCollateralMessage) {
        require(sender() == self.positionsManagerAddress, "not from positionsManager");

        // todo check if position healthy
        // todo if unhealthy - user can not do anything, hence we need to pay collateral back from gatekeeper to sender 
        self.collateral = self.collateral + msg.amount;
        self.setMessage("Collateral added");

        // pay excess to user
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }


    fun isPositionHealthy(collateral: Int, debt: Int, tonPriceWithSafetyMargin: Int, debtRate: Int): Bool {
        // todo rewrite healh calculation to loanToValue ratio
        dump("collateral");
        dump(collateral);
        dump("debt");
        dump(debt);
        dump("tonPriceWithSafetyMargin");
        dump(tonPriceWithSafetyMargin);
        dump("debtRate"); 
        dump(debtRate);

        // todo normalize debt to stables
        let normalizedDebt: Int = debt * 1000000000 / debtRate;
        dump("isPositionHealthy.normalizedDebt");
        dump(normalizedDebt);

        let collateralPriceWithSafetyMargin: Int = collateral * tonPriceWithSafetyMargin / 1000000000;
        dump("isPositionHealthy.collateralPriceWithSafetyMargin");
        dump(collateralPriceWithSafetyMargin);

        return  collateralPriceWithSafetyMargin >= debt;
    }


    /*
        message came from positionsManager
        check if position healthy after withdraw
        if not - sent userStatus.message('can not withdraw stablecoin: position is not healthy')
        if healthy - make withdrawal of stablecoin
        call positionsManager.increaseTotalStablecoin
        add position debt
        call stablecoinMaster.mint(user, amount)
    */
    receive(msg: WithdrawStablecoinMessage) {
        require(sender() == self.positionsManagerAddress, "not from positionsManager");

        let normalizedWithdrawDebt: Int = msg.amount * 1000000000 / msg.rate.debtAccumulatedRate;
        let debtAfterWithdraw: Int = self.debt + normalizedWithdrawDebt;
        // dump("debtAfterWithdraw");
        // dump(debtAfterWithdraw);

        if (!self.isPositionHealthy(self.collateral, debtAfterWithdraw, msg.tonPriceWithSafetyMargin, msg.rate.debtAccumulatedRate)){
            self.setMessage("position will not be healthy");
            // pay excess to user
            send(SendParameters{
                to: msg.user,
                bounce: false,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });

            return;
        } 

        
        // dump("position healthy");

        send(SendParameters{
            to: self.stablecoinMasterAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: MintMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        });

        self.debt = debtAfterWithdraw;
        self.setMessage("Stablecoins sent");

        // todo move this send after successfull stable mint notification
        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: IncreaseTotalStableMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        });


    }

    /*
        message came from positionsManager
        check if position debt GE than amount paid back
            call stablecoinMaster.burn(user, amount, fees)
        if position debt less than amount paid back
            calculate position debt and pay it only
            call stablecoinMaster.burn(user, amount, fees)
        send userStatus.message('stable repaid')
    */
    receive(msg: RepayStablecoinMessage) {

        require(sender() == self.positionsManagerAddress, "not from positionsManager");

        let amountToBurn: Int = msg.amount;

        let factDebtInStables: Int = self.debt * msg.rate.debtAccumulatedRate / 1000000000;

        // if position healthy now?
        if (!self.isPositionHealthy(self.collateral, self.debt, msg.tonPriceWithSafetyMargin, msg.rate.debtAccumulatedRate)){
            self.setMessage("position is not healthy");
            // pay excess to user
            send(SendParameters{
                to: msg.user,
                bounce: false,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });

            return;
        } 

        // todo add bounced handler in sender to pay ctx.value back to sender
        if (factDebtInStables < msg.amount) {
            self.setMessage("Your debt is less than you want to repay, charge sent back");
            amountToBurn = factDebtInStables;
        }

        self.setMessage("stables are going to burn...");

        send(SendParameters{
            to: self.stablecoinMasterAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: RepayBurnMessage{
                user: msg.user,
                amount: amountToBurn,
                rate: msg.rate,
                userPosition: myAddress()
            }.toCell()
        });

    }

    /*
        message came from stablecoinMaster
        call positionsManager.decreaseTotalStable(burnedAmount, fees)
        decrease position debt
    */
    receive(msg: StablecoinBurnedMessage) {
       
        require(sender() == self.stablecoinMasterAddress, "not from stablecoin master");

        // todo check if debt still more than repayment

        self.debt = self.debt - msg.amount * 1000000000 / msg.rate.debtAccumulatedRate;

        self.setMessage("you've paid stables back");

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            bounce: true,
            body: DecreaseTotalStableMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        }); 
        
    }

    /*
        message came from positionsManager
        check if amount to withdraw <= position collateral
        if not - bounce??
        check if position remains healthy after withdrawal
        if not - userStatus.message('can not withdraw this amount of ton')
        if ok
            decrease position collateral by amount
            positionsManager.doWithdrawCollateral(user, amount)
    */
    receive(msg: WithdrawCollateralMessage) {
        require(sender() == self.positionsManagerAddress, "not from positions manager");

        if (msg.amount  > self.collateral) {
            self.setMessage("withdrawal amount more than position has");
            // pay excess to user
            send(SendParameters{
                to: msg.user,
                bounce: false,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });

            return;
        }


        let collateralAfterWithdraw: Int = self.collateral - msg.amount;

        if (!self.isPositionHealthy(collateralAfterWithdraw, self.debt, msg.tonPriceWithSafetyMargin, msg.rate.debtAccumulatedRate)){
            self.setMessage("position will not be healthy");
            // pay excess to user
            send(SendParameters{
                to: msg.user,
                bounce: false,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });

            return;
        } 
        

        self.collateral = collateralAfterWithdraw;
        self.setMessage("collateral sent back to yor wallet");

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: DoWithdrawCollateralMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        });

        
    }


    get fun positionUser(): Address {
        return self.user;
    }

    get fun positionState(): PositionState  {
        return PositionState{
            collateral: self.collateral,
            debt: self.debt
        };
    }

    get fun message(): Message {
        return self.message;
    }

    
}