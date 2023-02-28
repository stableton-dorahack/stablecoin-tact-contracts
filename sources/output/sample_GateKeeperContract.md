# TACT Compilation Report
Contract: GateKeeperContract
BOC Size: 823 bytes

# Types
Total Types: 9

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
TLB: `_ liquidationRatio:uint32 stabilityFeeRate:uint32 lastAccumulationTime:uint32 closeFactorBps:uint32 liquidatorIncentiveBps:uint32 treasutyFeeBps:uint32 = PoolSettings`
Signature: `PoolSettings{liquidationRatio:uint32,stabilityFeeRate:uint32,lastAccumulationTime:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32,treasutyFeeBps:uint32}`

## PoolSettingsMsg
TLB: `pool_settings_msg#e1b180f1 liquidationRatio:uint32 stabilityFeeRate:uint32 lastAccumulationTime:uint32 closeFactorBps:uint32 liquidatorIncentiveBps:uint32 treasutyFeeBps:uint32 = PoolSettingsMsg`
Signature: `PoolSettingsMsg{liquidationRatio:uint32,stabilityFeeRate:uint32,lastAccumulationTime:uint32,closeFactorBps:uint32,liquidatorIncentiveBps:uint32,treasutyFeeBps:uint32}`

## DebtRate
TLB: `_ debtAccumulatedRate:uint32 lastAccumulationTime:uint32 = DebtRate`
Signature: `DebtRate{debtAccumulatedRate:uint32,lastAccumulationTime:uint32}`

## UpdateTonPriceMsg
TLB: `update_ton_price_msg#0d11babd price:uint32 = UpdateTonPriceMsg`
Signature: `UpdateTonPriceMsg{price:uint32}`

# Get Methods
Total Get Methods: 2

## poolSettings

## tonPrice

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
57414: StabilityFeeCollector/invalid-block.timestamp