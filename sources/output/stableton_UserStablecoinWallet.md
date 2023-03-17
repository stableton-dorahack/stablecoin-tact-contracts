# TACT Compilation Report
Contract: UserStablecoinWallet
BOC Size: 2532 bytes

# Types
Total Types: 38

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## PositionState
TLB: `_ collateral:coins debt:uint64 = PositionState`
Signature: `PositionState{collateral:coins,debt:uint64}`

## Message
TLB: `_ timestamp:uint64 message:^string = Message`
Signature: `Message{timestamp:uint64,message:^string}`

## PoolSettings
TLB: `_ liquidationRatio:int257 stabilityFeeRate:int257 liquidatorIncentiveBps:int257 = PoolSettings`
Signature: `PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257}`

## DebtRate
TLB: `_ debtAccumulatedRate:int257 lastAccumulationTime:int257 = DebtRate`
Signature: `DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257}`

## DepositCollateralMessage
TLB: `deposit_collateral_message#92c1e2a5 user:address amount:coins settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257} rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} tonPriceWithSafetyMargin:coins = DepositCollateralMessage`
Signature: `DepositCollateralMessage{user:address,amount:coins,settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257},rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},tonPriceWithSafetyMargin:coins}`

## WithdrawCollateralMessage
TLB: `withdraw_collateral_message#781f4855 user:address amount:coins settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257} rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} tonPriceWithSafetyMargin:coins = WithdrawCollateralMessage`
Signature: `WithdrawCollateralMessage{user:address,amount:coins,settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257},rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},tonPriceWithSafetyMargin:coins}`

## WithdrawStablecoinMessage
TLB: `withdraw_stablecoin_message#5038b327 user:address amount:uint64 settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257} rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} tonPriceWithSafetyMargin:coins = WithdrawStablecoinMessage`
Signature: `WithdrawStablecoinMessage{user:address,amount:uint64,settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257},rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},tonPriceWithSafetyMargin:coins}`

## RepayStablecoinMessage
TLB: `repay_stablecoin_message#b646d1e8 user:address amount:uint64 settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257} rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} tonPriceWithSafetyMargin:coins = RepayStablecoinMessage`
Signature: `RepayStablecoinMessage{user:address,amount:uint64,settings:PoolSettings{liquidationRatio:int257,stabilityFeeRate:int257,liquidatorIncentiveBps:int257},rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},tonPriceWithSafetyMargin:coins}`

## DoWithdrawCollateralMessage
TLB: `do_withdraw_collateral_message#c3cd33bf user:address amount:uint64 = DoWithdrawCollateralMessage`
Signature: `DoWithdrawCollateralMessage{user:address,amount:uint64}`

## IncreaseTotalStableMessage
TLB: `increase_total_stable_message#96096519 user:address amount:uint64 = IncreaseTotalStableMessage`
Signature: `IncreaseTotalStableMessage{user:address,amount:uint64}`

## DecreaseTotalStableMessage
TLB: `decrease_total_stable_message#10cda82c user:address amount:uint64 = DecreaseTotalStableMessage`
Signature: `DecreaseTotalStableMessage{user:address,amount:uint64}`

## JettonData
TLB: `_ totalSupply:int257 mintable:bool owner:address content:Maybe ^cell walletCode:^cell = JettonData`
Signature: `JettonData{totalSupply:int257,mintable:bool,owner:address,content:Maybe ^cell,walletCode:^cell}`

## JettonWalletData
TLB: `_ balance:int257 owner:address master:address walletCode:^cell = JettonWalletData`
Signature: `JettonWalletData{balance:int257,owner:address,master:address,walletCode:^cell}`

## SetUserPositionDependecyMessage
TLB: `set_user_position_dependecy_message#f037fcfb stablecoinMasterAddress:address positionsManagerAddress:address = SetUserPositionDependecyMessage`
Signature: `SetUserPositionDependecyMessage{stablecoinMasterAddress:address,positionsManagerAddress:address}`

## SetPositionIdMessage
TLB: `set_position_id_message#4a35f9d0 user:address positionId:int257 = SetPositionIdMessage`
Signature: `SetPositionIdMessage{user:address,positionId:int257}`

## NewPositionIdMessage
TLB: `new_position_id_message#0d74c595 user:address = NewPositionIdMessage`
Signature: `NewPositionIdMessage{user:address}`

## SetPositionAddressMessage
TLB: `set_position_address_message#5da6de96 user:address position:address = SetPositionAddressMessage`
Signature: `SetPositionAddressMessage{user:address,position:address}`

## MintMessage
TLB: `mint_message#903559b2 user:address amount:coins = MintMessage`
Signature: `MintMessage{user:address,amount:coins}`

## RepayBurnMessage
TLB: `repay_burn_message#eca0fcdc user:address amount:coins rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} userPosition:address = RepayBurnMessage`
Signature: `RepayBurnMessage{user:address,amount:coins,rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},userPosition:address}`

## RepayBurnNotification
TLB: `repay_burn_notification#a6096d65 user:address amount:coins rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} userPosition:address = RepayBurnNotification`
Signature: `RepayBurnNotification{user:address,amount:coins,rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257},userPosition:address}`

## StablecoinBurnedMessage
TLB: `stablecoin_burned_message#895bc796 user:address amount:coins rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257} = StablecoinBurnedMessage`
Signature: `StablecoinBurnedMessage{user:address,amount:coins,rate:DebtRate{debtAccumulatedRate:int257,lastAccumulationTime:int257}}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins destination:address responseDestination:Maybe address customPayload:Maybe ^cell forwardTonAmount:coins forwardPayload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,destination:address,responseDestination:Maybe address,customPayload:Maybe ^cell,forwardTonAmount:coins,forwardPayload:remainder<slice>}`

## TokenTransferInternal
TLB: `token_transfer_internal#178d4519 queryId:uint64 amount:coins from:address responseAddress:Maybe address forwardTonAmount:coins forwardPayload:remainder<slice> = TokenTransferInternal`
Signature: `TokenTransferInternal{queryId:uint64,amount:coins,from:address,responseAddress:Maybe address,forwardTonAmount:coins,forwardPayload:remainder<slice>}`

## TokenNotification
TLB: `token_notification#7362d09c queryId:uint64 amount:coins from:address forwardPayload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{queryId:uint64,amount:coins,from:address,forwardPayload:remainder<slice>}`

## TokenBurn
TLB: `token_burn#595f07bc queryId:uint64 amount:coins owner:address responseAddress:Maybe address = TokenBurn`
Signature: `TokenBurn{queryId:uint64,amount:coins,owner:address,responseAddress:Maybe address}`

## TokenBurnNotification
TLB: `token_burn_notification#7bdd97de queryId:uint64 amount:coins owner:address responseAddress:Maybe address = TokenBurnNotification`
Signature: `TokenBurnNotification{queryId:uint64,amount:coins,owner:address,responseAddress:Maybe address}`

## TokenExcesses
TLB: `token_excesses#d53276db queryId:uint64 = TokenExcesses`
Signature: `TokenExcesses{queryId:uint64}`

## TokenUpdateContent
TLB: `token_update_content#0c087a9e content:Maybe ^cell = TokenUpdateContent`
Signature: `TokenUpdateContent{content:Maybe ^cell}`

## WithdrawFeesMessage
TLB: `withdraw_fees_message#c78aa748 to:address amount:coins = WithdrawFeesMessage`
Signature: `WithdrawFeesMessage{to:address,amount:coins}`

## SetDeps
TLB: `set_deps#be15db7c positionsManagerAddress:address gateKeeperAddress:address stablecoinMasterAddress:address = SetDeps`
Signature: `SetDeps{positionsManagerAddress:address,gateKeeperAddress:address,stablecoinMasterAddress:address}`

## Deps
TLB: `_ positionsManagerAddress:address gateKeeperAddress:address stablecoinMasterAddress:address = Deps`
Signature: `Deps{positionsManagerAddress:address,gateKeeperAddress:address,stablecoinMasterAddress:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Mint
TLB: `mint#01fb345b amount:int257 = Mint`
Signature: `Mint{amount:int257}`

# Get Methods
Total Get Methods: 2

## get_wallet_data

## getBalance

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
13650: Invalid bounced message
15032: not from stablecoin master
16059: Invalid value
33545: not from gatekeeper
53160: not from positions manager
61910: not from positionsManager
62972: Invalid balance