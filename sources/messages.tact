
struct PoolSettings {
    liquidationRatio: Int;
    stabilityFeeRate: Int;
    liquidatorIncentiveBps: Int;
}

struct DebtRate {
    debtAccumulatedRate: Int;
    lastAccumulationTime: Int;
}

message DepositCollateralMessage {
    user: Address;
    amount: Int as coins;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: Int as coins;
}

message WithdrawCollateralMessage {
    user: Address;
    amount: Int as coins;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: Int as coins;
}

message WithdrawStablecoinMessage {
    user: Address;
    amount: Int as uint64; 
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: Int as coins;
}

message RepayStablecoinMessage {
    user: Address;
    amount: Int as uint64;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: Int as coins;
}

message DoWithdrawCollateralMessage {
    user: Address;
    amount: Int as uint64;
}

message IncreaseTotalStableMessage { 
    user: Address;
    amount: Int as uint64;
}

message DecreaseTotalStableMessage {
    user: Address;
    amount: Int as uint64;
}

// stablecoinMaster messages

struct JettonData {
    totalSupply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell?;
    walletCode: Cell;
}

struct JettonWalletData {
    balance: Int;
    owner: Address;
    master: Address;
    walletCode: Cell;
}

// userPosition messages

message SetUserPositionDependecyMessage {
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

message SetPositionIdMessage {
    user: Address;
    positionId: Int;
}

message NewPositionIdMessage {
    user: Address;
}

message SetPositionAddressMessage { 
    user: Address;
    position: Address;
}

// stablecoinMaster messages

message MintMessage {
    user: Address;
    amount: Int as coins;
}

message RepayBurnMessage {
    user: Address;
    amount: Int as coins;
    rate: DebtRate;
    userPosition: Address;
}

message RepayBurnNotification {
    user: Address;
    amount: Int as coins;
    rate: DebtRate;
    userPosition: Address;
}

message StablecoinBurnedMessage {
    user: Address;
    amount: Int as coins;
    rate: DebtRate;
}

// jetton messages

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0x178d4519) TokenTransferInternal {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    responseAddress: Address?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining;
}

message(0x595f07bc) TokenBurn {
    queryId: Int as uint64;
    amount: Int as coins;
    owner: Address;
    responseAddress: Address?;
}

message(0x7bdd97de) TokenBurnNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    owner: Address;
    responseAddress: Address?;
}

message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
}

message TokenUpdateContent {
    content: Cell?;
}


message WithdrawFeesMessage {
    to: Address;
    amount: Int as coins;
}

message SetDeps {
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    stablecoinMasterAddress: Address;
}

struct Deps {
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    stablecoinMasterAddress: Address;
}
