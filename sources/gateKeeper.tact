import "@stdlib/deploy";
import "./messages";

struct PoolSettings {
    liquidationRatio: Int as uint32;
    stabilityFeeRate: Int as uint32;
    lastAccumulationTime: Int as uint32;
    closeFactorBps: Int as uint32;
    liquidatorIncentiveBps: Int as uint32;
    treasutyFeeBps: Int as uint32;
}

message PoolSettingsMsg {
    liquidationRatio: Int as uint32;
    stabilityFeeRate: Int as uint32;
    lastAccumulationTime: Int as uint32;
    closeFactorBps: Int as uint32;
    liquidatorIncentiveBps: Int as uint32;
    treasutyFeeBps: Int as uint32;
}

struct DebtRate {
    debtAccumulatedRate: Int as uint32;
    lastAccumulationTime: Int as uint32;
}


message UpdateTonPriceMsg {
    price: Int as uint32;
}

message DepositCollateralUserMessage {
    amount: Int as coins;
}

message WithdrawStablecoinUserMessage {
    amount: Int as coins;
}

message RepayStablecoinUserMessage {
    amount: Int as coins;
}

message WithdrawCollateralUserMessage {
    amount: Int as coins;
}

message WithdrawFeesMessage {
    amount: Int as coins;
}



contract GateKeeperContract with Deployable {

    RAY: Int;
    owner: Address;
    poolSettings: PoolSettings;
    tonPrice: Int as uint32;
    debtRate: DebtRate;
    totalCollateralAmount: Int as coins = 0;
    stablecoinsIssued: Int as coins = 0;
    totalFeesCollected: Int as coins = 0;

    init(owner: Address) {
        self.owner = owner;
        self.poolSettings = PoolSettings{
            liquidationRatio: 0,
            stabilityFeeRate: 0,
            lastAccumulationTime: 0,
            closeFactorBps: 0,
            liquidatorIncentiveBps: 0,
            treasutyFeeBps: 0
        };
        self.tonPrice = 0;  
        self.debtRate = DebtRate{
            debtAccumulatedRate: 1000000000, 
            lastAccumulationTime: now()
        };
        self.RAY = self.pow(10, 27);
    }



    fun setPoolSettings(settings: PoolSettings) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        self.poolSettings = settings;
    }


    fun updateDebtAccumulatedRate() {
        // can be called by anyone
        // todo math pow in fift
        require(now() + 1000 > self.debtRate.lastAccumulationTime, "updateDebtAccumulatedRate:Invalid timestamp");
        self.debtRate.debtAccumulatedRate = (self.debtRate.debtAccumulatedRate * self.rpow(self.poolSettings.stabilityFeeRate, now() - self.debtRate.lastAccumulationTime)) * self.RAY;
        self.debtRate.lastAccumulationTime = now();
    }

    fun mod(a: Int, b: Int): Int {
        let div: Int = a / b;
        return a - div * b;
    }

    fun rpow(x: Int, n: Int): Int {
        let z: Int = self.RAY;
        // todo include fift rpow function
        return z;
    }

    fun pow(a: Int, b: Int): Int {
        let x: Int = a;
        repeat(b) {
            x = x * a;
        }
        return x;
    }

    fun calculatePriceWithSafetyMargin(price: Int): Int {
        // todo calculate price with safety margin
        return price;
    }

    // owner actions 

    receive(msg: PoolSettingsMsg) {
        self.setPoolSettings(PoolSettings{
            liquidationRatio: msg.liquidationRatio,
            stabilityFeeRate: msg.stabilityFeeRate,
            lastAccumulationTime: msg.lastAccumulationTime,
            closeFactorBps: msg.closeFactorBps,
            liquidatorIncentiveBps: msg.liquidatorIncentiveBps,
            treasutyFeeBps: msg.treasutyFeeBps
        });
    }

    receive(msg: UpdateTonPriceMsg) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        // todo calculate price with safety margin 
        let priceWithSafetyMargin: Int = self.calculatePriceWithSafetyMargin(msg.price);
        self.tonPrice = priceWithSafetyMargin;
    }

    receive("updateDebtRate"){
        self.updateDebtAccumulatedRate();
    }

    /*
        called by owner
        check if totalFeesCollected >= amount
        decrease collectedFees (maybe need to do it after notification from stablecoin master mint)
        stablecoinMaster.mintFees(MintFeesMessage)
    */
    receive(msg: WithdrawFeesMessage) {
        
    }

    /*
        called by owner 
        transfers all tons to owner 
        totalCollateralAmount = 0

    */
    receive("emergencyExit"){
        
    }

    // user actions

    /*
        called by user wallet
        store ton in this contract
        call positionsManager.depositCollateral(DepositCollateralMessage)

    */
    receive(msg: DepositCollateralUserMessage) {
        
    }

    /*
        called by user owner
        call positionsManager.withdrawStablecoin(WithdrawStablecoinMessage)
    */
    receive(msg: WithdrawStablecoinUserMessage) {

    }

    /*
        called by user owner
        call positionsManager.repayStablecoin(RepayStablecoinMessage)
    */
    receive(msg: RepayStablecoinUserMessage) {

    }

    /*
        called by user owner
        call positionsManager.withdrawCollateral(RepayStablecoinMessage)
    */
    receive(msg: WithdrawCollateralUserMessage) {

    }

    // from positionsManagers actions

    /*
        called by positionsManager
        transfer ton to user wallet
        userStatus.message('ton withdrawal ok')
    */
    receive(msg: WithdrawCollateralMessage) {

    }

    /*
        called by positionsManager
        decrease stablecoinsIssued
        increase totalFeesCollected
        send excess to user
        userStatus.message('stable paid back ok')
    */
    receive(msg: DecreaseTotalStableMessage) {

    }

    /*
        called by positionsManager
        increasr stablecoinsIssued
        send excess to user
        userStatus.message('stable paid received)
    */
    receive(msg: IncreaseTotalStableMessage) {

    }



    get fun poolSettings(): PoolSettings {
        return self.poolSettings;
    }

    get fun tonPrice(): Int {
        return self.tonPrice;
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
}