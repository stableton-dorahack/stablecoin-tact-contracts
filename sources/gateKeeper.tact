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

message UpdateTonPriceMsg {
    price: Int as uint32;
}

contract GateKeeperContract with Deployable {

    owner: Address;
    poolSettings: PoolSettings;
    tonPrice: Int as uint32;

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
   

    get fun poolSettings(): PoolSettings {
        return self.poolSettings;
    }

    get fun tonPrice(): Int {
        return self.tonPrice;
    }
}