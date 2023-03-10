# TACT Compilation Report
Contract: PositionAddressContract
BOC Size: 1130 bytes

# Types
Total Types: 34

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## PoolSettings
TLB: `_ liquidationRatio:uint32 stabilityFeeRate:uint32 closeFactorBps:uint32 liquidatorIncentiveBps:uint32 = PoolSettings`
Signature: `PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32}`

## DebtRate
TLB: `_ debtAccumulatedRate:uint32 lastAccumulationTime:uint32 = DebtRate`
Signature: `DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32}`

## DepositCollateralMessage
TLB: `deposit_collateral_message#dded1fe8 user:address amount:coins settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32} rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32} tonPriceWithSafetyMargin:coins = DepositCollateralMessage`
Signature: `DepositCollateralMessage{user:address,amount:coins,settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32},rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32},tonPriceWithSafetyMargin:coins}`

## WithdrawCollateralMessage
TLB: `withdraw_collateral_message#cb461808 user:address amount:coins settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32} rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32} tonPriceWithSafetyMargin:coins = WithdrawCollateralMessage`
Signature: `WithdrawCollateralMessage{user:address,amount:coins,settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32},rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32},tonPriceWithSafetyMargin:coins}`

## WithdrawStablecoinMessage
TLB: `withdraw_stablecoin_message#6c3989bb user:address amount:uint64 settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32} rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32} tonPriceWithSafetyMargin:coins = WithdrawStablecoinMessage`
Signature: `WithdrawStablecoinMessage{user:address,amount:uint64,settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32},rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32},tonPriceWithSafetyMargin:coins}`

## RepayStablecoinMessage
TLB: `repay_stablecoin_message#bef31e07 user:address amount:uint64 settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32} rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32} tonPriceWithSafetyMargin:coins = RepayStablecoinMessage`
Signature: `RepayStablecoinMessage{user:address,amount:uint64,settings:PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32},rate:DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32},tonPriceWithSafetyMargin:coins}`

## DoWithdrawCollateralMessage
TLB: `do_withdraw_collateral_message#c3cd33bf user:address amount:uint64 = DoWithdrawCollateralMessage`
Signature: `DoWithdrawCollateralMessage{user:address,amount:uint64}`

## IncreaseTotalStableMessage
TLB: `increase_total_stable_message#96096519 user:address amount:uint64 = IncreaseTotalStableMessage`
Signature: `IncreaseTotalStableMessage{user:address,amount:uint64}`

## DecreaseTotalStableMessage
TLB: `decrease_total_stable_message#ed81304a user:address amount:uint64 fees:uint64 = DecreaseTotalStableMessage`
Signature: `DecreaseTotalStableMessage{user:address,amount:uint64,fees:uint64}`

## MintFeesMessage
TLB: `mint_fees_message#9d42541d to:address amount:coins = MintFeesMessage`
Signature: `MintFeesMessage{to:address,amount:coins}`

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
TLB: `repay_burn_message#b065c3ac user:address amount:coins fees:coins = RepayBurnMessage`
Signature: `RepayBurnMessage{user:address,amount:coins,fees:coins}`

## RepayBurnNotification
TLB: `repay_burn_notification#8c5f4c71 user:address amount:coins fees:coins = RepayBurnNotification`
Signature: `RepayBurnNotification{user:address,amount:coins,fees:coins}`

## StablecoinBurnedMessage
TLB: `stablecoin_burned_message#ea319d9c user:address amount:coins fees:coins = StablecoinBurnedMessage`
Signature: `StablecoinBurnedMessage{user:address,amount:coins,fees:coins}`

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

## SetUserStatusMsg
TLB: `set_user_status_msg#837b1751 queryId:uint64 user:address message:^string = SetUserStatusMsg`
Signature: `SetUserStatusMsg{queryId:uint64,user:address,message:^string}`

## PositionState
TLB: `_ collateral:coins debt:uint64 = PositionState`
Signature: `PositionState{collateral:coins,debt:uint64}`

# Get Methods
Total Get Methods: 2

## getPositionId

## getPositionAddress

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
15032: not from stablecoin master
22230: Already set
31797: debt less than repay amount
43504: position will not be healthy
53160: not from positions manager
61910: not from positionsManager
63577: withdrawal amount more than position has