import "@stdlib/deploy";
import "./messages";

struct PositionState {
    collateral: Int as coins;
    debt: Int as uint64;
}

contract UserPositionContract with Deployable {

    const MinTonsForStorage: Int = ton("0.01");
    const GasConsumption: Int = ton("0.01");

    user: Address; // who owns this position
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
    positionId: Int as uint32 = 0;
    collateral: Int as coins = 0;
    debt: Int as uint64 = 0;
    message: String;

    init(user: Address, stablecoinMasterAddress: Address, positionsManagerAddress: Address) {
        self.user = user; 
        self.stablecoinMasterAddress = stablecoinMasterAddress;
        self.positionsManagerAddress = positionsManagerAddress;
        self.message = "Position created";
        // todo call positionsManager.newPositionId(user)
        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: NewPositionIdMessage{
                user: user
            }.toCell()
        });
    }


    /*
        message came from positionsManager
        check if position healthy
        add collateral
    */
    receive(msg: DepositCollateralMessage) {
        require(sender() == self.positionsManagerAddress, "not from positionsManager");

        // todo check if position healthy
        // todo if unhealthy - need to pay collateral back from gatekeeper to sender 
        self.collateral = self.collateral + msg.amount;

        // pay excess to user
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });

        self.message = "Collateral added";
    }

    /*
        message came from positionsManager
        check if positionId is not set
        set positionId
        register positionId:address in positionAddress.setPositionAddress
    */
    receive(msg: SetPositionIdMessage) {
        require(sender() == self.positionsManagerAddress, "not from positionsManager");

        self.positionId = msg.positionId; 

        let init: StateInit = initOf PositionAddressContract(self.positionId, self.positionsManagerAddress);
        let positionAddress: Address = contractAddress(init);

        // later - need maybe send amount to separate contract with payseparategas

        send(SendParameters{
            to: positionAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: SetPositionAddressMessage{
                user: msg.user,
                position: myAddress()
            }.toCell(),
            code: init.code,
            data: init.data
        });
        
    }


    fun isPositionHealthy(collateral: Int, debt: Int, tonPriceWithSafetyMargin: Int): Bool {
        // todo rewrite healh calculation to loanToValue ratio
        dump("collateral");
        dump(collateral);
        dump("collateral * tonPriceWithSafetyMargin");
        dump(collateral * tonPriceWithSafetyMargin);
        dump("debt");
        dump(debt);

        return collateral * tonPriceWithSafetyMargin / 1000000000 >= debt;
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

        // todo check if position healthy

        let debtAfterWithdraw: Int = self.debt * msg.rate.debtAccumulatedRate + msg.amount;
        // dump("debtAfterWithdraw");
        // dump(debtAfterWithdraw);
        
        require(self.isPositionHealthy(self.collateral, debtAfterWithdraw, msg.tonPriceWithSafetyMargin), "position will not be healthy");
        
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

        self.debt = self.debt + msg.amount * 1000000000 / msg.rate.debtAccumulatedRate;
        self.message = "Stablecoins sent";
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

        require(self.debt >= msg.amount, "debt less than repay amount");

        // todo calculate from debtShare
        let amountToBurn: Int = msg.amount; 

        send(SendParameters{
            to: self.stablecoinMasterAddress, 
            value: ton("0.5"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: RepayBurnMessage{
                user: msg.user,
                amount: amountToBurn, 
                fees: 1 // todo calculate fees 
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

        // require(self.debt >= msg.amount, "debt less than repay amount");

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.4"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: DecreaseTotalStableMessage{
                user: msg.user,
                amount: msg.amount, 
                fees: msg.fees
            }.toCell()
        });

        self.debt = self.debt - msg.amount;
        
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

        require(msg.amount <= self.collateral, "withdrawal amount more than position has");

        // todo calculate health

        self.collateral = self.collateral - msg.amount;

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: DoWithdrawCollateralMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        });
    }


    get fun getPositionUser(): Address {
        return self.user;
    }

    get fun getPositionId(): Int {
        return self.positionId;
    }

    get fun getPositionState(): PositionState  {
        return PositionState{
            collateral: self.collateral,
            debt: self.debt
        };
    }

    get fun getMessage(): String {
        return self.message;
    }
    
}

contract PositionAddressContract with Deployable {
   
    id: Int as uint32;
    positionAddress: Address;
    positionsManagerAddress: Address;

    init(id: Int, positionsManagerAddress: Address) {
        self.id = id; 
        self.positionAddress = newAddress(0, 0);
        self.positionsManagerAddress = positionsManagerAddress;
    }

    /*
        message came from userPosition
        set position address
        now we can determine this contract address by positionId 
        and get positionAddress by getter
    */
    receive(msg: SetPositionAddressMessage) {

        // todo enable access check below
        // let init: StateInit = initOf UserPositionContract(user, self.positionsManagerAddress);
        // require(contractAddress(init) == sender(), "Invalid sender");

        require(self.positionAddress == newAddress(0,0), "Already set");
        self.positionAddress = msg.position; //msg.positionAddress;

        // pay excess to user
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }



    get fun getPositionId(): Int {
        return self.id;
    }

    get fun getPositionAddress(): Address {
        return self.positionAddress;
    }
    
}