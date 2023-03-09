
message DepositCollateralMessage {
    user: Address;
    amount: Int as coins;
}

message WithdrawCollateralMessage {
  user: Address;
  amount: Int as coins;
  debtRate: Int;
}

message WithdrawStablecoinMessage {
    user: Address;
    amount: Int as uint64;
    // todo add pool settings values requred for stable witdrawal 
    debtRate: Int as uint64;
}

message RepayStablecoinMessage {
    user: Address;
    amount: Int as uint64;
    // todo add settings required for repay calculations
    debtRate: Int as uint64;
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
    fees: Int as uint64;
}

// stablecoinMaster messages

message MintFeesMessage { 
    to: Address;
    amount: Int as coins;
}

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

message BurnMessage {
    user: Address;
    amount: Int as coins;
    fees: Int as coins;
}

message RepayBurnNotification {
    user: Address;
    amount: Int as coins;
}

message StablecoinBurnedMessage {
    user: Address;
    amount: Int as uint64;
    fees: Int as uint64;
}
