import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type PoolSettings = {
    $$type: 'PoolSettings';
    liquidationRatio: bigint;
    stabilityFeeRate: bigint;
    lastAccumulationTime: bigint;
    closeFactorBps: bigint;
    liquidatorIncentiveBps: bigint;
    treasutyFeeBps: bigint;
}

export function storePoolSettings(src: PoolSettings) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.liquidationRatio, 32);
        b_0.storeUint(src.stabilityFeeRate, 32);
        b_0.storeUint(src.lastAccumulationTime, 32);
        b_0.storeUint(src.closeFactorBps, 32);
        b_0.storeUint(src.liquidatorIncentiveBps, 32);
        b_0.storeUint(src.treasutyFeeBps, 32);
    };
}

export function loadPoolSettings(slice: Slice) {
    let sc_0 = slice;
    let _liquidationRatio = sc_0.loadUintBig(32);
    let _stabilityFeeRate = sc_0.loadUintBig(32);
    let _lastAccumulationTime = sc_0.loadUintBig(32);
    let _closeFactorBps = sc_0.loadUintBig(32);
    let _liquidatorIncentiveBps = sc_0.loadUintBig(32);
    let _treasutyFeeBps = sc_0.loadUintBig(32);
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, lastAccumulationTime: _lastAccumulationTime, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps, treasutyFeeBps: _treasutyFeeBps };
}

function loadTuplePoolSettings(source: TupleReader) {
    let _liquidationRatio = source.readBigNumber();
    let _stabilityFeeRate = source.readBigNumber();
    let _lastAccumulationTime = source.readBigNumber();
    let _closeFactorBps = source.readBigNumber();
    let _liquidatorIncentiveBps = source.readBigNumber();
    let _treasutyFeeBps = source.readBigNumber();
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, lastAccumulationTime: _lastAccumulationTime, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps, treasutyFeeBps: _treasutyFeeBps };
}

function storeTuplePoolSettings(source: PoolSettings) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationRatio);
    builder.writeNumber(source.stabilityFeeRate);
    builder.writeNumber(source.lastAccumulationTime);
    builder.writeNumber(source.closeFactorBps);
    builder.writeNumber(source.liquidatorIncentiveBps);
    builder.writeNumber(source.treasutyFeeBps);
    return builder.build();
}

function dictValueParserPoolSettings(): DictionaryValue<PoolSettings> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePoolSettings(src)).endCell());
        },
        parse: (src) => {
            return loadPoolSettings(src.loadRef().beginParse());
        }
    }
}

export type PoolSettingsMsg = {
    $$type: 'PoolSettingsMsg';
    liquidationRatio: bigint;
    stabilityFeeRate: bigint;
    lastAccumulationTime: bigint;
    closeFactorBps: bigint;
    liquidatorIncentiveBps: bigint;
    treasutyFeeBps: bigint;
}

export function storePoolSettingsMsg(src: PoolSettingsMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3786506481, 32);
        b_0.storeUint(src.liquidationRatio, 32);
        b_0.storeUint(src.stabilityFeeRate, 32);
        b_0.storeUint(src.lastAccumulationTime, 32);
        b_0.storeUint(src.closeFactorBps, 32);
        b_0.storeUint(src.liquidatorIncentiveBps, 32);
        b_0.storeUint(src.treasutyFeeBps, 32);
    };
}

export function loadPoolSettingsMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3786506481) { throw Error('Invalid prefix'); }
    let _liquidationRatio = sc_0.loadUintBig(32);
    let _stabilityFeeRate = sc_0.loadUintBig(32);
    let _lastAccumulationTime = sc_0.loadUintBig(32);
    let _closeFactorBps = sc_0.loadUintBig(32);
    let _liquidatorIncentiveBps = sc_0.loadUintBig(32);
    let _treasutyFeeBps = sc_0.loadUintBig(32);
    return { $$type: 'PoolSettingsMsg' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, lastAccumulationTime: _lastAccumulationTime, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps, treasutyFeeBps: _treasutyFeeBps };
}

function loadTuplePoolSettingsMsg(source: TupleReader) {
    let _liquidationRatio = source.readBigNumber();
    let _stabilityFeeRate = source.readBigNumber();
    let _lastAccumulationTime = source.readBigNumber();
    let _closeFactorBps = source.readBigNumber();
    let _liquidatorIncentiveBps = source.readBigNumber();
    let _treasutyFeeBps = source.readBigNumber();
    return { $$type: 'PoolSettingsMsg' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, lastAccumulationTime: _lastAccumulationTime, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps, treasutyFeeBps: _treasutyFeeBps };
}

function storeTuplePoolSettingsMsg(source: PoolSettingsMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationRatio);
    builder.writeNumber(source.stabilityFeeRate);
    builder.writeNumber(source.lastAccumulationTime);
    builder.writeNumber(source.closeFactorBps);
    builder.writeNumber(source.liquidatorIncentiveBps);
    builder.writeNumber(source.treasutyFeeBps);
    return builder.build();
}

function dictValueParserPoolSettingsMsg(): DictionaryValue<PoolSettingsMsg> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePoolSettingsMsg(src)).endCell());
        },
        parse: (src) => {
            return loadPoolSettingsMsg(src.loadRef().beginParse());
        }
    }
}

export type DebtRate = {
    $$type: 'DebtRate';
    debtAccumulatedRate: bigint;
    lastAccumulationTime: bigint;
}

export function storeDebtRate(src: DebtRate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.debtAccumulatedRate, 32);
        b_0.storeUint(src.lastAccumulationTime, 32);
    };
}

export function loadDebtRate(slice: Slice) {
    let sc_0 = slice;
    let _debtAccumulatedRate = sc_0.loadUintBig(32);
    let _lastAccumulationTime = sc_0.loadUintBig(32);
    return { $$type: 'DebtRate' as const, debtAccumulatedRate: _debtAccumulatedRate, lastAccumulationTime: _lastAccumulationTime };
}

function loadTupleDebtRate(source: TupleReader) {
    let _debtAccumulatedRate = source.readBigNumber();
    let _lastAccumulationTime = source.readBigNumber();
    return { $$type: 'DebtRate' as const, debtAccumulatedRate: _debtAccumulatedRate, lastAccumulationTime: _lastAccumulationTime };
}

function storeTupleDebtRate(source: DebtRate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.debtAccumulatedRate);
    builder.writeNumber(source.lastAccumulationTime);
    return builder.build();
}

function dictValueParserDebtRate(): DictionaryValue<DebtRate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDebtRate(src)).endCell());
        },
        parse: (src) => {
            return loadDebtRate(src.loadRef().beginParse());
        }
    }
}

export type UpdateTonPriceMsg = {
    $$type: 'UpdateTonPriceMsg';
    price: bigint;
}

export function storeUpdateTonPriceMsg(src: UpdateTonPriceMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(219265725, 32);
        b_0.storeUint(src.price, 32);
    };
}

export function loadUpdateTonPriceMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 219265725) { throw Error('Invalid prefix'); }
    let _price = sc_0.loadUintBig(32);
    return { $$type: 'UpdateTonPriceMsg' as const, price: _price };
}

function loadTupleUpdateTonPriceMsg(source: TupleReader) {
    let _price = source.readBigNumber();
    return { $$type: 'UpdateTonPriceMsg' as const, price: _price };
}

function storeTupleUpdateTonPriceMsg(source: UpdateTonPriceMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserUpdateTonPriceMsg(): DictionaryValue<UpdateTonPriceMsg> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateTonPriceMsg(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTonPriceMsg(src.loadRef().beginParse());
        }
    }
}

 type GateKeeperContract_init_args = {
    $$type: 'GateKeeperContract_init_args';
    owner: Address;
}

function initGateKeeperContract_init_args(src: GateKeeperContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function GateKeeperContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFwEAAysAART/APSkE/S88sgLAQIBYgIDBJTQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAAY6W+kABAds8BtMf0x/TH1kQKhApECNsGo6H+kABAdHbPOJVGds8MBQVBAUCASAPEASi7aLt+3Ah10nCH5UwINcLH94Cklt/4CGCEOGxgPG6jwgx2zxsFts8f+AhghANEbq9uo6VMdMfAYIQDRG6vbry4IHTHwEx2zx/4CGCEJRqmLa6BgcICQE8yPhCAcx/AcoAVZBQqc8WVVHbPMsfWQLLH8sfye1UDgA20x8BghDhsYDxuvLggdMf0x/TH9Mf0x/TH1VQACg5OTk5OTn4QW8kW4ERTTIrxwXy9AAeM/hBbyRbgRFNMivHBfL0AriOozHTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J2zx/4AHAAI6t+QGC8AmDJsO/g8vNUBcDP6C/PZxtRhiXu6A0XFxyeMYxOtlLuo6F2zx/2zHgkTDicAoLASb4QW8kECNfA39wUAOAQgFtbds8DAAcggDgRvgjgQPooCK88vQB9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusw0AMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AAAeUFbLHxPLH8sfyx/LH8sfA2G+yUdqJoagD8MWkAAMdLfSAAgO2eA2mP6Y/pj6yIFQgUiBG2DUdD/SAAgOjtnnFtnkFBURAgFIEhMACF8DbBYDYbSQ3aiaGoA/DFpAADHS30gAIDtngNpj+mP6Y+siBUIFIgRtg1HQ/0gAIDo7Z5xbZ5AUFRYAcbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcAAc0x/TH9Mf0x/TH9MfVVAAHnBUcABTAHCCEDuaygD4IwAIEClfCQ==');
    const __system = Cell.fromBase64('te6cckECGQEAAzUAAQHAAQEFoAajAgEU/wD0pBP0vPLICwMCAWILBAIBIAkFAgFIBwYAcbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcANhtJDdqJoagD8MWkAAMdLfSAAgO2eA2mP6Y/pj6yIFQgUiBG2DUdD/SAAgOjtnnFtnkBgXCAAIEClfCQNhvslHaiaGoA/DFpAADHS30gAIDtngNpj+mP6Y+siBUIFIgRtg1HQ/0gAIDo7Z5xbZ5BgXCgAIXwNsFgSU0AHQ0wMBcbDAAZF/kXDiAfpAIlBVbwT4Ye1E0NQB+GLSAAGOlvpAAQHbPAbTH9Mf0x9ZECoQKRAjbBqOh/pAAQHR2zziVRnbPDAYFw4MATzI+EIBzH8BygBVkFCpzxZVUds8yx9ZAssfyx/J7VQNAB5QVssfE8sfyx/LH8sfyx8Eou2i7ftwIddJwh+VMCDXCx/eApJbf+AhghDhsYDxuo8IMds8bBbbPH/gIYIQDRG6vbqOlTHTHwGCEA0Rur268uCB0x8BMds8f+AhghCUapi2uhYVFA8CuI6jMdMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8nbPH/gAcAAjq35AYLwCYMmw7+Dy81QFwM/oL89nG1GGJe7oDRcXHJ4xjE62Uu6joXbPH/bMeCRMOJwERAAHIIA4Eb4I4ED6KAivPL0ASb4QW8kECNfA39wUAOAQgFtbds8EgH2yHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6zEwAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsAAB4z+EFvJFuBEU0yK8cF8vQAKDk5OTk5OfhBbyRbgRFNMivHBfL0ADbTHwGCEOGxgPG68uCB0x/TH9Mf0x/TH9MfVVAAHnBUcABTAHCCEDuaygD4IwAc0x/TH9Mf0x/TH9MfVVAcZlWK');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initGateKeeperContract_init_args({ $$type: 'GateKeeperContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const GateKeeperContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    4429: { message: `Invalid sender` },
    57414: { message: `StabilityFeeCollector/invalid-block.timestamp` },
}

export class GateKeeperContract implements Contract {
    
    static async init(owner: Address) {
        return await GateKeeperContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await GateKeeperContract_init(owner);
        const address = contractAddress(0, init);
        return new GateKeeperContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new GateKeeperContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: GateKeeperContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: PoolSettingsMsg | UpdateTonPriceMsg | 'updateDebtRate' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PoolSettingsMsg') {
            body = beginCell().store(storePoolSettingsMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTonPriceMsg') {
            body = beginCell().store(storeUpdateTonPriceMsg(message)).endCell();
        }
        if (message === 'updateDebtRate') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPoolSettings(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('poolSettings', builder.build())).stack;
        const result = loadTuplePoolSettings(source);
        return result;
    }
    
    async getTonPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tonPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}