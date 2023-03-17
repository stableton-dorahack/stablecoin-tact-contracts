import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./UserPosition";
import "./math/math.tact";


message PoolSettingsMsg {
    liquidationRatio: Int as uint32;
    stabilityFeeRate: Int as uint64; // 100000000062 = X**1.000000000627 every second = 2%/yr., look at ./math/math.tact
    liquidatorIncentiveBps: Int as uint32;
}

struct Deps {
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

message UpdateTonPriceMsg {
    price: Int as uint32;
}

message DepositCollateralUserMessage {
    user: Address;
    amount: Int as coins;
}

message WithdrawStablecoinUserMessage {
    user: Address;
    amount: Int as coins;
}

message RepayStablecoinUserMessage {
    user: Address;
    amount: Int as coins;
}

message WithdrawCollateralUserMessage {
    user: Address;
    amount: Int as coins;
}

message SetDeps {
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}


contract GateKeeperContract with Deployable, Ownable {

    const MinTonForStorage: Int = ton("0.01");
    const GasConsumption: Int = ton("0.01");
    const RAY: Int = pow(10, 27);

    // deps
    deps: Deps;

    owner: Address;
    poolSettings: PoolSettings;
    tonPrice: Int as uint32;
    tonPriceWithSafetyMargin: Int as uint32;
    debtRate: DebtRate;
    totalCollateralAmount: Int as coins = 0;
    stablecoinsIssued: Int as coins = 0;
    totalFeesCollected: Int as coins = 0;

    init() {
        self.owner = sender();
        self.poolSettings = PoolSettings{
            liquidationRatio: 0,
            stabilityFeeRate: 0,
            liquidatorIncentiveBps: 0
        };
        self.tonPrice = 0;  
        self.tonPriceWithSafetyMargin = 0;
        self.debtRate = DebtRate{
            debtAccumulatedRate: 1000000000, 
            lastAccumulationTime: now()
        };
       
        self.deps = Deps{
            stablecoinMasterAddress: newAddress(0, 0),
            positionsManagerAddress: newAddress(0, 0)
        };
    }


    // owner actions 

    receive(msg: SetDeps) {
        self.requireOwner();
        self.deps.stablecoinMasterAddress = msg.stablecoinMasterAddress;
        self.deps.positionsManagerAddress = msg.positionsManagerAddress;
        reply("deps set".asComment());
    }

    receive(msg: PoolSettingsMsg) {
        self.requireOwner();
        self.poolSettings = PoolSettings{
            liquidationRatio: msg.liquidationRatio,
            stabilityFeeRate: msg.stabilityFeeRate,
            liquidatorIncentiveBps: msg.liquidatorIncentiveBps
        };
        reply("pool settings updated".asComment());
    }

    // due to we have no true decentralized oracles,
    // at the moment we update Ton price centralized way
    receive(msg: UpdateTonPriceMsg) {
        self.requireOwner();
        // todo calculate price with safety margin
        
        // priceWithSafetyMargin = rdiv(rdiv(mul(tonPrice, 10**9), stableCoinReferencePrice), _liquidationRatio)
        // ((tonPrice * 1)) / liquidationRatio
        // tonPrice = 3.2 * 10**9
        // liquidationRatio = 120% = 1.2 = 1_200_000_000
        // priceWithSafetyMargin = 3.2 / 1.2 = 2.66 this is the price of collateral value calculated with

        self.tonPriceWithSafetyMargin = msg.price * 1000000000 / self.poolSettings.liquidationRatio;
        self.tonPrice = msg.price;
        reply("ton price updated".asComment());
    }

    // can be called by anyone, who is ready to pay for tx
    // can be incentivized by some small premium for call
    // calculates fees from total issued stablecoins, 
    // accrued from last collect period on per seconds basis
    // increases debt rate

    /* original formula from makerDao
    _debtAccumulatedRate = rmul(
      rpow(add(globalStabilityFeeRate, _stabilityFeeRate), now - _lastAccumulationTime, RAY),
      _previousDebtAccumulatedRate
    );
    */
    receive("collectFees"){
        require(now() > self.debtRate.lastAccumulationTime, "updateDebtAccumulatedRate: Invalid timestamp");
        let precision = pow(10, 12);
        self.debtRate.debtAccumulatedRate = self.debtRate.debtAccumulatedRate * rpow(self.poolSettings.stabilityFeeRate, now() - self.debtRate.lastAccumulationTime, precision);
        self.debtRate.lastAccumulationTime = now();
        reply("debt rate updated".asComment());
    }

    /*
        called by owner
        check if totalFeesCollected >= amount
        decrease collectedFees (maybe need to do it after notification from stablecoin master mint)
        stablecoinMaster.mintFees(MintFeesMessage)
    */
    receive("WithdrawFees") {
        self.requireOwner();
        require(self.totalFeesCollected > 0, "no fees collected");
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: WithdrawFeesMessage{
                to: sender(),
                amount: self.totalFeesCollected
            }.toCell()
        });
        self.totalFeesCollected = 0;
    }


    // user actions

    /*
        called by user wallet
        store ton in this contract
        call positionsManager.depositCollateral(DepositCollateralMessage)

    */
    receive(msg: DepositCollateralUserMessage) {
        require(sender() == msg.user, "Invalid sender");
    
        require(context().value >= msg.amount + self.GasConsumption + self.MinTonForStorage, "not enough tons sent");

        let valueToSendForward: Int = context().value - self.MinTonForStorage - self.GasConsumption - msg.amount;
       
        // dump("valueToSendForward");
        // dump(valueToSendForward);

        send(SendParameters{
            to: self.deps.positionsManagerAddress, 
            value: valueToSendForward,
            mode: SendIgnoreErrors, 
            bounce: true,
            body: DepositCollateralMessage{
                user: msg.user,
                amount: msg.amount,
                settings: self.poolSettings,
                rate: self.debtRate,
                tonPriceWithSafetyMargin: self.tonPriceWithSafetyMargin
            }.toCell()
        });

    }

    /*
        called by user owner
        call positionsManager.withdrawStablecoin(WithdrawStablecoinMessage)
    */
    receive(msg: WithdrawStablecoinUserMessage) {
        
        send(SendParameters{
            to: self.deps.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: WithdrawStablecoinMessage{
                user: msg.user,
                amount: msg.amount,
                settings: self.poolSettings,
                rate: self.debtRate,
                tonPriceWithSafetyMargin: self.tonPriceWithSafetyMargin
            }.toCell()
        });

    }

    /*
        called by user owner
        call positionsManager.repayStablecoin(RepayStablecoinMessage)
    */
    receive(msg: RepayStablecoinUserMessage) {
        send(SendParameters{
            to: self.deps.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: WithdrawStablecoinMessage{
                user: msg.user,
                amount: msg.amount,
                settings: self.poolSettings,
                rate: self.debtRate,
                tonPriceWithSafetyMargin: self.tonPriceWithSafetyMargin
            }.toCell()
        });
    }

    /*
        called by user owner
        call positionsManager.withdrawCollateral(RepayStablecoinMessage)
    */
    receive(msg: WithdrawCollateralUserMessage) {
        require(sender() == msg.user, "invalid sender");

         send(SendParameters{
            to: self.deps.positionsManagerAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: WithdrawCollateralMessage{
                user: msg.user,
                amount: msg.amount,
                settings: self.poolSettings,
                rate: self.debtRate,
                tonPriceWithSafetyMargin: self.tonPriceWithSafetyMargin
            }.toCell()
        });


    }

    // from positionsManagers actions

    /*
        called by positionsManager
        transfer ton to user wallet
    */
    receive(msg: DoWithdrawCollateralMessage) {
        require(sender() == self.deps.positionsManagerAddress, "invalid sender");

        require(self.totalCollateralAmount - msg.amount >= 0, "not enough collateral on contract");

        self.totalCollateralAmount = self.totalCollateralAmount - msg.amount;

        // pay ton collateral to user and send excess
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: msg.amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });

    }

    /*
        called by positionsManager
        decrease stablecoinsIssued
        increase totalFeesCollected
        send excess to user

    */
    receive(msg: DecreaseTotalStableMessage) {
        require(sender() == self.deps.positionsManagerAddress, "invalid sender");
        self.stablecoinsIssued = self.stablecoinsIssued - msg.amount;

        // pay excess
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });

    }

    /*
        called by positionsManager
        increasr stablecoinsIssued
        send excess to user
        userStatus.message('stable paid received)
    */
    receive(msg: IncreaseTotalStableMessage) {
        require(sender() == self.deps.positionsManagerAddress, "invalid sender");

        self.stablecoinsIssued = self.stablecoinsIssued + msg.amount;

        // pay excess back to user
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });

    }


    // send all balance to the owner, should be removed later
    receive("EmergencyExit") {
        require(sender() == self.owner, "invalid sender");

        send(SendParameters{
            to: sender(),
            bounce: false,
            value: myBalance() - context().value - self.MinTonForStorage,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    fun getUserPositionAddress(user: Address): Address {
        let init: StateInit = initOf UserPositionContract(user, self.deps.stablecoinMasterAddress, myAddress());
        return contractAddress(init);
    }

    get fun poolSettings(): PoolSettings {
        return self.poolSettings;
    }

    get fun tonPrice(): Int {
        return self.tonPrice;
    }

    get fun tonPriceWithSafetyMargin(): Int {
        return self.tonPriceWithSafetyMargin;
    }

    get fun debtRate(): DebtRate {
        return self.debtRate;
    }

    get fun stablecoinsIssued(): Int {
        return self.stablecoinsIssued;
    }

    get fun totalCollateralAmount(): Int {
        return self.totalCollateralAmount;
    }

    get fun getBalance(): Int {
        return myBalance();
    }

    get fun getDeps(): Deps {
        return self.deps;
    }
 }