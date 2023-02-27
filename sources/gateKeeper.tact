import "@stdlib/deploy";


message Add {
    amount: Int as uint32;
}

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


contract GateKeeperContract with Deployable {

    owner: Address;
    poolSettings: PoolSettings;

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
    }


    fun setPoolSettings(settings: PoolSettings) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        self.poolSettings = settings;
    }

   

    get fun poolSettings(): PoolSettings {
        return self.poolSettings;
    }
}