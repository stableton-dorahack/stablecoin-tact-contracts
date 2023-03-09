# TACT Compilation Report
Contract: UserPositionContract
BOC Size: 1678 bytes

# Types
Total Types: 25

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

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## DepositCollateralMessage
TLB: `deposit_collateral_message#11dfb138 user:address amount:coins = DepositCollateralMessage`
Signature: `DepositCollateralMessage{user:address,amount:coins}`

## WithdrawCollateralMessage
TLB: `withdraw_collateral_message#6829d55e user:address amount:coins debtRate:int257 = WithdrawCollateralMessage`
Signature: `WithdrawCollateralMessage{user:address,amount:coins,debtRate:int257}`

## WithdrawStablecoinMessage
TLB: `withdraw_stablecoin_message#f3554cd7 user:address amount:uint64 debtRate:uint64 = WithdrawStablecoinMessage`
Signature: `WithdrawStablecoinMessage{user:address,amount:uint64,debtRate:uint64}`

## RepayStablecoinMessage
TLB: `repay_stablecoin_message#6e81f446 user:address amount:uint64 debtRate:uint64 = RepayStablecoinMessage`
Signature: `RepayStablecoinMessage{user:address,amount:uint64,debtRate:uint64}`

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

## BurnMessage
TLB: `burn_message#b625719b user:address amount:coins fees:coins = BurnMessage`
Signature: `BurnMessage{user:address,amount:coins,fees:coins}`

## RepayBurnNotification
TLB: `repay_burn_notification#563c6d94 user:address amount:coins = RepayBurnNotification`
Signature: `RepayBurnNotification{user:address,amount:coins}`

## StablecoinBurnedMessage
TLB: `stablecoin_burned_message#d2be4c6c user:address amount:uint64 fees:uint64 = StablecoinBurnedMessage`
Signature: `StablecoinBurnedMessage{user:address,amount:uint64,fees:uint64}`

## PositionState
TLB: `_ collateral:coins debt:uint64 = PositionState`
Signature: `PositionState{collateral:coins,debt:uint64}`

# Get Methods
Total Get Methods: 4

## getPositionUser

## getPositionId

## getPositionState

## owner

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
15032: not from stablecoin master
22230: Already set
31797: debt less than repay amount
53160: not from positions manager
61910: not from positionsManager
63577: withdrawal amount more than position has