# TACT Compilation Report
Contract: PositionAddressContract
BOC Size: 572 bytes

# Types
Total Types: 19

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

## PositionState
TLB: `_ collateral:coins debt:uint64 = PositionState`
Signature: `PositionState{collateral:coins,debt:uint64}`

## StablecoinBurnedMessage
TLB: `stablecoin_burned_message#d2be4c6c user:address amount:uint64 fees:uint64 = StablecoinBurnedMessage`
Signature: `StablecoinBurnedMessage{user:address,amount:uint64,fees:uint64}`

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

## SetPositionIdMessage
TLB: `set_position_id_message#00b3cad5 positionId:uint8 = SetPositionIdMessage`
Signature: `SetPositionIdMessage{positionId:uint8}`

## SetPositionAddressMessage
TLB: `set_position_address_message#cf891f9e user:address = SetPositionAddressMessage`
Signature: `SetPositionAddressMessage{user:address}`

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
4429: Invalid sender