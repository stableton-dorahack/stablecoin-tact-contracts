import "@stdlib/deploy";

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



contract GateKeeperContract with Deployable {

    const RAY: Int = 10**27;

    owner: Address;
    poolSettings: PoolSettings;
    tonPrice: Int as uint32;
    debtRate: DebtRate;

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
    }


    fun setPoolSettings(settings: PoolSettings) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        self.poolSettings = settings;
    }

    fun setTonPrice(price: Int) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        self.tonPrice = price;
    }

    fun updateDebtAccumulatedRate() {
        // can be called by anyone
        require(now() + 1000 > self.debtRate.lastAccumulationTime, "updateDebtAccumulatedRate:Invalid timestamp");
        self.debtRate.debtAccumulatedRate = (self.debtRate.debtAccumulatedRate * self.rpow(poolSettings.stabilityFeeRate, now() - debtRate.lastAccumulationTime)) * RAY;
        self.debtRate.lastAccumulationTime = now();

    }

    fun mod(a: Int, b: Int) -> Int {
        let div: Int = a / b;
        return a - div * b;
    }

    fun rpow(x: Int, n: Int) -> Int {
        let z: Int = 10**27;
        // todo include fift rpow function
        return z;
    }

    fun pow(a,b) -> Int {
        let x: Int = a;
        repeat(b) {
            x = x * a;
        }
        return x;
    }

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
        self.setTonPrice(msg.price);
    }

    receive("updateDebtRate"){
        self.updateDebtAccumulatedRate();
    }
   

    get fun poolSettings(): PoolSettings {
        return self.poolSettings;
    }

    get fun tonPrice(): Int {
        return self.tonPrice;
    }
}