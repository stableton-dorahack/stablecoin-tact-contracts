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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type PoolSettings = {
    $$type: 'PoolSettings';
    liquidationRatio: bigint;
    stabilityFeeRate: bigint;
    liquidatorIncentiveBps: bigint;
}

export function storePoolSettings(src: PoolSettings) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.liquidationRatio, 32);
        b_0.storeUint(src.stabilityFeeRate, 32);
        b_0.storeUint(src.liquidatorIncentiveBps, 32);
    };
}

export function loadPoolSettings(slice: Slice) {
    let sc_0 = slice;
    let _liquidationRatio = sc_0.loadUintBig(32);
    let _stabilityFeeRate = sc_0.loadUintBig(32);
    let _liquidatorIncentiveBps = sc_0.loadUintBig(32);
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function loadTuplePoolSettings(source: TupleReader) {
    let _liquidationRatio = source.readBigNumber();
    let _stabilityFeeRate = source.readBigNumber();
    let _liquidatorIncentiveBps = source.readBigNumber();
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function storeTuplePoolSettings(source: PoolSettings) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationRatio);
    builder.writeNumber(source.stabilityFeeRate);
    builder.writeNumber(source.liquidatorIncentiveBps);
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

export type DepositCollateralMessage = {
    $$type: 'DepositCollateralMessage';
    user: Address;
    amount: bigint;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: bigint;
}

export function storeDepositCollateralMessage(src: DepositCollateralMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3932134519, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadDepositCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3932134519) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _settings = loadPoolSettings(sc_0);
    let _rate = loadDebtRate(sc_0);
    let _tonPriceWithSafetyMargin = sc_0.loadCoins();
    return { $$type: 'DepositCollateralMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function loadTupleDepositCollateralMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _settings = loadTuplePoolSettings(source.readTuple());
    const _rate = loadTupleDebtRate(source.readTuple());
    let _tonPriceWithSafetyMargin = source.readBigNumber();
    return { $$type: 'DepositCollateralMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function storeTupleDepositCollateralMessage(source: DepositCollateralMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTuplePoolSettings(source.settings));
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeNumber(source.tonPriceWithSafetyMargin);
    return builder.build();
}

function dictValueParserDepositCollateralMessage(): DictionaryValue<DepositCollateralMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositCollateralMessage(src)).endCell());
        },
        parse: (src) => {
            return loadDepositCollateralMessage(src.loadRef().beginParse());
        }
    }
}

export type WithdrawCollateralMessage = {
    $$type: 'WithdrawCollateralMessage';
    user: Address;
    amount: bigint;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: bigint;
}

export function storeWithdrawCollateralMessage(src: WithdrawCollateralMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(433324996, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadWithdrawCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 433324996) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _settings = loadPoolSettings(sc_0);
    let _rate = loadDebtRate(sc_0);
    let _tonPriceWithSafetyMargin = sc_0.loadCoins();
    return { $$type: 'WithdrawCollateralMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function loadTupleWithdrawCollateralMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _settings = loadTuplePoolSettings(source.readTuple());
    const _rate = loadTupleDebtRate(source.readTuple());
    let _tonPriceWithSafetyMargin = source.readBigNumber();
    return { $$type: 'WithdrawCollateralMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function storeTupleWithdrawCollateralMessage(source: WithdrawCollateralMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTuplePoolSettings(source.settings));
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeNumber(source.tonPriceWithSafetyMargin);
    return builder.build();
}

function dictValueParserWithdrawCollateralMessage(): DictionaryValue<WithdrawCollateralMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawCollateralMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawCollateralMessage(src.loadRef().beginParse());
        }
    }
}

export type WithdrawStablecoinMessage = {
    $$type: 'WithdrawStablecoinMessage';
    user: Address;
    amount: bigint;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: bigint;
}

export function storeWithdrawStablecoinMessage(src: WithdrawStablecoinMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(73036137, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadWithdrawStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 73036137) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _settings = loadPoolSettings(sc_0);
    let _rate = loadDebtRate(sc_0);
    let _tonPriceWithSafetyMargin = sc_0.loadCoins();
    return { $$type: 'WithdrawStablecoinMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function loadTupleWithdrawStablecoinMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _settings = loadTuplePoolSettings(source.readTuple());
    const _rate = loadTupleDebtRate(source.readTuple());
    let _tonPriceWithSafetyMargin = source.readBigNumber();
    return { $$type: 'WithdrawStablecoinMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function storeTupleWithdrawStablecoinMessage(source: WithdrawStablecoinMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTuplePoolSettings(source.settings));
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeNumber(source.tonPriceWithSafetyMargin);
    return builder.build();
}

function dictValueParserWithdrawStablecoinMessage(): DictionaryValue<WithdrawStablecoinMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawStablecoinMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawStablecoinMessage(src.loadRef().beginParse());
        }
    }
}

export type RepayStablecoinMessage = {
    $$type: 'RepayStablecoinMessage';
    user: Address;
    amount: bigint;
    settings: PoolSettings;
    rate: DebtRate;
    tonPriceWithSafetyMargin: bigint;
}

export function storeRepayStablecoinMessage(src: RepayStablecoinMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2621043381, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadRepayStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2621043381) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _settings = loadPoolSettings(sc_0);
    let _rate = loadDebtRate(sc_0);
    let _tonPriceWithSafetyMargin = sc_0.loadCoins();
    return { $$type: 'RepayStablecoinMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function loadTupleRepayStablecoinMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _settings = loadTuplePoolSettings(source.readTuple());
    const _rate = loadTupleDebtRate(source.readTuple());
    let _tonPriceWithSafetyMargin = source.readBigNumber();
    return { $$type: 'RepayStablecoinMessage' as const, user: _user, amount: _amount, settings: _settings, rate: _rate, tonPriceWithSafetyMargin: _tonPriceWithSafetyMargin };
}

function storeTupleRepayStablecoinMessage(source: RepayStablecoinMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTuplePoolSettings(source.settings));
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeNumber(source.tonPriceWithSafetyMargin);
    return builder.build();
}

function dictValueParserRepayStablecoinMessage(): DictionaryValue<RepayStablecoinMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepayStablecoinMessage(src)).endCell());
        },
        parse: (src) => {
            return loadRepayStablecoinMessage(src.loadRef().beginParse());
        }
    }
}

export type DoWithdrawCollateralMessage = {
    $$type: 'DoWithdrawCollateralMessage';
    user: Address;
    amount: bigint;
}

export function storeDoWithdrawCollateralMessage(src: DoWithdrawCollateralMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3285005247, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadDoWithdrawCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3285005247) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    return { $$type: 'DoWithdrawCollateralMessage' as const, user: _user, amount: _amount };
}

function loadTupleDoWithdrawCollateralMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'DoWithdrawCollateralMessage' as const, user: _user, amount: _amount };
}

function storeTupleDoWithdrawCollateralMessage(source: DoWithdrawCollateralMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDoWithdrawCollateralMessage(): DictionaryValue<DoWithdrawCollateralMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDoWithdrawCollateralMessage(src)).endCell());
        },
        parse: (src) => {
            return loadDoWithdrawCollateralMessage(src.loadRef().beginParse());
        }
    }
}

export type IncreaseTotalStableMessage = {
    $$type: 'IncreaseTotalStableMessage';
    user: Address;
    amount: bigint;
}

export function storeIncreaseTotalStableMessage(src: IncreaseTotalStableMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2517198105, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadIncreaseTotalStableMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2517198105) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    return { $$type: 'IncreaseTotalStableMessage' as const, user: _user, amount: _amount };
}

function loadTupleIncreaseTotalStableMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'IncreaseTotalStableMessage' as const, user: _user, amount: _amount };
}

function storeTupleIncreaseTotalStableMessage(source: IncreaseTotalStableMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserIncreaseTotalStableMessage(): DictionaryValue<IncreaseTotalStableMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseTotalStableMessage(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseTotalStableMessage(src.loadRef().beginParse());
        }
    }
}

export type DecreaseTotalStableMessage = {
    $$type: 'DecreaseTotalStableMessage';
    user: Address;
    amount: bigint;
}

export function storeDecreaseTotalStableMessage(src: DecreaseTotalStableMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(281913388, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadDecreaseTotalStableMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 281913388) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    return { $$type: 'DecreaseTotalStableMessage' as const, user: _user, amount: _amount };
}

function loadTupleDecreaseTotalStableMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'DecreaseTotalStableMessage' as const, user: _user, amount: _amount };
}

function storeTupleDecreaseTotalStableMessage(source: DecreaseTotalStableMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDecreaseTotalStableMessage(): DictionaryValue<DecreaseTotalStableMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseTotalStableMessage(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseTotalStableMessage(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell | null;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCellOpt();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type SetUserPositionDependecyMessage = {
    $$type: 'SetUserPositionDependecyMessage';
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

export function storeSetUserPositionDependecyMessage(src: SetUserPositionDependecyMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4030201083, 32);
        b_0.storeAddress(src.stablecoinMasterAddress);
        b_0.storeAddress(src.positionsManagerAddress);
    };
}

export function loadSetUserPositionDependecyMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4030201083) { throw Error('Invalid prefix'); }
    let _stablecoinMasterAddress = sc_0.loadAddress();
    let _positionsManagerAddress = sc_0.loadAddress();
    return { $$type: 'SetUserPositionDependecyMessage' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function loadTupleSetUserPositionDependecyMessage(source: TupleReader) {
    let _stablecoinMasterAddress = source.readAddress();
    let _positionsManagerAddress = source.readAddress();
    return { $$type: 'SetUserPositionDependecyMessage' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function storeTupleSetUserPositionDependecyMessage(source: SetUserPositionDependecyMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.stablecoinMasterAddress);
    builder.writeAddress(source.positionsManagerAddress);
    return builder.build();
}

function dictValueParserSetUserPositionDependecyMessage(): DictionaryValue<SetUserPositionDependecyMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetUserPositionDependecyMessage(src)).endCell());
        },
        parse: (src) => {
            return loadSetUserPositionDependecyMessage(src.loadRef().beginParse());
        }
    }
}

export type SetPositionIdMessage = {
    $$type: 'SetPositionIdMessage';
    user: Address;
    positionId: bigint;
}

export function storeSetPositionIdMessage(src: SetPositionIdMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1245051344, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.positionId, 257);
    };
}

export function loadSetPositionIdMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1245051344) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _positionId = sc_0.loadIntBig(257);
    return { $$type: 'SetPositionIdMessage' as const, user: _user, positionId: _positionId };
}

function loadTupleSetPositionIdMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _positionId = source.readBigNumber();
    return { $$type: 'SetPositionIdMessage' as const, user: _user, positionId: _positionId };
}

function storeTupleSetPositionIdMessage(source: SetPositionIdMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.positionId);
    return builder.build();
}

function dictValueParserSetPositionIdMessage(): DictionaryValue<SetPositionIdMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetPositionIdMessage(src)).endCell());
        },
        parse: (src) => {
            return loadSetPositionIdMessage(src.loadRef().beginParse());
        }
    }
}

export type NewPositionIdMessage = {
    $$type: 'NewPositionIdMessage';
    user: Address;
}

export function storeNewPositionIdMessage(src: NewPositionIdMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(225756565, 32);
        b_0.storeAddress(src.user);
    };
}

export function loadNewPositionIdMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 225756565) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    return { $$type: 'NewPositionIdMessage' as const, user: _user };
}

function loadTupleNewPositionIdMessage(source: TupleReader) {
    let _user = source.readAddress();
    return { $$type: 'NewPositionIdMessage' as const, user: _user };
}

function storeTupleNewPositionIdMessage(source: NewPositionIdMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserNewPositionIdMessage(): DictionaryValue<NewPositionIdMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewPositionIdMessage(src)).endCell());
        },
        parse: (src) => {
            return loadNewPositionIdMessage(src.loadRef().beginParse());
        }
    }
}

export type SetPositionAddressMessage = {
    $$type: 'SetPositionAddressMessage';
    user: Address;
    position: Address;
}

export function storeSetPositionAddressMessage(src: SetPositionAddressMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1571217046, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.position);
    };
}

export function loadSetPositionAddressMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1571217046) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _position = sc_0.loadAddress();
    return { $$type: 'SetPositionAddressMessage' as const, user: _user, position: _position };
}

function loadTupleSetPositionAddressMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _position = source.readAddress();
    return { $$type: 'SetPositionAddressMessage' as const, user: _user, position: _position };
}

function storeTupleSetPositionAddressMessage(source: SetPositionAddressMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.position);
    return builder.build();
}

function dictValueParserSetPositionAddressMessage(): DictionaryValue<SetPositionAddressMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetPositionAddressMessage(src)).endCell());
        },
        parse: (src) => {
            return loadSetPositionAddressMessage(src.loadRef().beginParse());
        }
    }
}

export type MintMessage = {
    $$type: 'MintMessage';
    user: Address;
    amount: bigint;
}

export function storeMintMessage(src: MintMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2419415474, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadMintMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2419415474) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'MintMessage' as const, user: _user, amount: _amount };
}

function loadTupleMintMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'MintMessage' as const, user: _user, amount: _amount };
}

function storeTupleMintMessage(source: MintMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMintMessage(): DictionaryValue<MintMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintMessage(src.loadRef().beginParse());
        }
    }
}

export type RepayBurnMessage = {
    $$type: 'RepayBurnMessage';
    user: Address;
    amount: bigint;
    rate: DebtRate;
}

export function storeRepayBurnMessage(src: RepayBurnMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2032846846, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
    };
}

export function loadRepayBurnMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2032846846) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _rate = loadDebtRate(sc_0);
    return { $$type: 'RepayBurnMessage' as const, user: _user, amount: _amount, rate: _rate };
}

function loadTupleRepayBurnMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _rate = loadTupleDebtRate(source.readTuple());
    return { $$type: 'RepayBurnMessage' as const, user: _user, amount: _amount, rate: _rate };
}

function storeTupleRepayBurnMessage(source: RepayBurnMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleDebtRate(source.rate));
    return builder.build();
}

function dictValueParserRepayBurnMessage(): DictionaryValue<RepayBurnMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepayBurnMessage(src)).endCell());
        },
        parse: (src) => {
            return loadRepayBurnMessage(src.loadRef().beginParse());
        }
    }
}

export type RepayBurnNotification = {
    $$type: 'RepayBurnNotification';
    user: Address;
    amount: bigint;
    rate: DebtRate;
}

export function storeRepayBurnNotification(src: RepayBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3290364212, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
    };
}

export function loadRepayBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3290364212) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _rate = loadDebtRate(sc_0);
    return { $$type: 'RepayBurnNotification' as const, user: _user, amount: _amount, rate: _rate };
}

function loadTupleRepayBurnNotification(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _rate = loadTupleDebtRate(source.readTuple());
    return { $$type: 'RepayBurnNotification' as const, user: _user, amount: _amount, rate: _rate };
}

function storeTupleRepayBurnNotification(source: RepayBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleDebtRate(source.rate));
    return builder.build();
}

function dictValueParserRepayBurnNotification(): DictionaryValue<RepayBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepayBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadRepayBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type StablecoinBurnedMessage = {
    $$type: 'StablecoinBurnedMessage';
    user: Address;
    amount: bigint;
    rate: DebtRate;
}

export function storeStablecoinBurnedMessage(src: StablecoinBurnedMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3203474459, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
    };
}

export function loadStablecoinBurnedMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3203474459) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _rate = loadDebtRate(sc_0);
    return { $$type: 'StablecoinBurnedMessage' as const, user: _user, amount: _amount, rate: _rate };
}

function loadTupleStablecoinBurnedMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _rate = loadTupleDebtRate(source.readTuple());
    return { $$type: 'StablecoinBurnedMessage' as const, user: _user, amount: _amount, rate: _rate };
}

function storeTupleStablecoinBurnedMessage(source: StablecoinBurnedMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleDebtRate(source.rate));
    return builder.build();
}

function dictValueParserStablecoinBurnedMessage(): DictionaryValue<StablecoinBurnedMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStablecoinBurnedMessage(src)).endCell());
        },
        parse: (src) => {
            return loadStablecoinBurnedMessage(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    responseAddress: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.responseAddress);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.responseAddress);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell | null;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(201882270, 32);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 201882270) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCellOpt();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFeesMessage = {
    $$type: 'WithdrawFeesMessage';
    to: Address;
    amount: bigint;
}

export function storeWithdrawFeesMessage(src: WithdrawFeesMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3347752776, 32);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawFeesMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3347752776) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawFeesMessage' as const, to: _to, amount: _amount };
}

function loadTupleWithdrawFeesMessage(source: TupleReader) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawFeesMessage' as const, to: _to, amount: _amount };
}

function storeTupleWithdrawFeesMessage(source: WithdrawFeesMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawFeesMessage(): DictionaryValue<WithdrawFeesMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawFeesMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFeesMessage(src.loadRef().beginParse());
        }
    }
}

export type PositionState = {
    $$type: 'PositionState';
    collateral: bigint;
    debt: bigint;
}

export function storePositionState(src: PositionState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.collateral);
        b_0.storeUint(src.debt, 64);
    };
}

export function loadPositionState(slice: Slice) {
    let sc_0 = slice;
    let _collateral = sc_0.loadCoins();
    let _debt = sc_0.loadUintBig(64);
    return { $$type: 'PositionState' as const, collateral: _collateral, debt: _debt };
}

function loadTuplePositionState(source: TupleReader) {
    let _collateral = source.readBigNumber();
    let _debt = source.readBigNumber();
    return { $$type: 'PositionState' as const, collateral: _collateral, debt: _debt };
}

function storeTuplePositionState(source: PositionState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.collateral);
    builder.writeNumber(source.debt);
    return builder.build();
}

function dictValueParserPositionState(): DictionaryValue<PositionState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePositionState(src)).endCell());
        },
        parse: (src) => {
            return loadPositionState(src.loadRef().beginParse());
        }
    }
}

export type Message = {
    $$type: 'Message';
    timestamp: bigint;
    message: string;
}

export function storeMessage(src: Message) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.timestamp, 64);
        b_0.storeStringRefTail(src.message);
    };
}

export function loadMessage(slice: Slice) {
    let sc_0 = slice;
    let _timestamp = sc_0.loadUintBig(64);
    let _message = sc_0.loadStringRefTail();
    return { $$type: 'Message' as const, timestamp: _timestamp, message: _message };
}

function loadTupleMessage(source: TupleReader) {
    let _timestamp = source.readBigNumber();
    let _message = source.readString();
    return { $$type: 'Message' as const, timestamp: _timestamp, message: _message };
}

function storeTupleMessage(source: Message) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.timestamp);
    builder.writeString(source.message);
    return builder.build();
}

function dictValueParserMessage(): DictionaryValue<Message> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMessage(src.loadRef().beginParse());
        }
    }
}

export type PoolSettingsMsg = {
    $$type: 'PoolSettingsMsg';
    liquidationRatio: bigint;
    stabilityFeeRate: bigint;
    liquidatorIncentiveBps: bigint;
}

export function storePoolSettingsMsg(src: PoolSettingsMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(164171234, 32);
        b_0.storeUint(src.liquidationRatio, 32);
        b_0.storeUint(src.stabilityFeeRate, 64);
        b_0.storeUint(src.liquidatorIncentiveBps, 32);
    };
}

export function loadPoolSettingsMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 164171234) { throw Error('Invalid prefix'); }
    let _liquidationRatio = sc_0.loadUintBig(32);
    let _stabilityFeeRate = sc_0.loadUintBig(64);
    let _liquidatorIncentiveBps = sc_0.loadUintBig(32);
    return { $$type: 'PoolSettingsMsg' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function loadTuplePoolSettingsMsg(source: TupleReader) {
    let _liquidationRatio = source.readBigNumber();
    let _stabilityFeeRate = source.readBigNumber();
    let _liquidatorIncentiveBps = source.readBigNumber();
    return { $$type: 'PoolSettingsMsg' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function storeTuplePoolSettingsMsg(source: PoolSettingsMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationRatio);
    builder.writeNumber(source.stabilityFeeRate);
    builder.writeNumber(source.liquidatorIncentiveBps);
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

export type Deps = {
    $$type: 'Deps';
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

export function storeDeps(src: Deps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.stablecoinMasterAddress);
        b_0.storeAddress(src.positionsManagerAddress);
    };
}

export function loadDeps(slice: Slice) {
    let sc_0 = slice;
    let _stablecoinMasterAddress = sc_0.loadAddress();
    let _positionsManagerAddress = sc_0.loadAddress();
    return { $$type: 'Deps' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function loadTupleDeps(source: TupleReader) {
    let _stablecoinMasterAddress = source.readAddress();
    let _positionsManagerAddress = source.readAddress();
    return { $$type: 'Deps' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function storeTupleDeps(source: Deps) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.stablecoinMasterAddress);
    builder.writeAddress(source.positionsManagerAddress);
    return builder.build();
}

function dictValueParserDeps(): DictionaryValue<Deps> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeps(src)).endCell());
        },
        parse: (src) => {
            return loadDeps(src.loadRef().beginParse());
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

export type DepositCollateralUserMessage = {
    $$type: 'DepositCollateralUserMessage';
    user: Address;
    amount: bigint;
}

export function storeDepositCollateralUserMessage(src: DepositCollateralUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3295464374, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadDepositCollateralUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3295464374) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'DepositCollateralUserMessage' as const, user: _user, amount: _amount };
}

function loadTupleDepositCollateralUserMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'DepositCollateralUserMessage' as const, user: _user, amount: _amount };
}

function storeTupleDepositCollateralUserMessage(source: DepositCollateralUserMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDepositCollateralUserMessage(): DictionaryValue<DepositCollateralUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositCollateralUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadDepositCollateralUserMessage(src.loadRef().beginParse());
        }
    }
}

export type WithdrawStablecoinUserMessage = {
    $$type: 'WithdrawStablecoinUserMessage';
    user: Address;
    amount: bigint;
}

export function storeWithdrawStablecoinUserMessage(src: WithdrawStablecoinUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1885332798, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawStablecoinUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1885332798) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawStablecoinUserMessage' as const, user: _user, amount: _amount };
}

function loadTupleWithdrawStablecoinUserMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawStablecoinUserMessage' as const, user: _user, amount: _amount };
}

function storeTupleWithdrawStablecoinUserMessage(source: WithdrawStablecoinUserMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawStablecoinUserMessage(): DictionaryValue<WithdrawStablecoinUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawStablecoinUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawStablecoinUserMessage(src.loadRef().beginParse());
        }
    }
}

export type RepayStablecoinUserMessage = {
    $$type: 'RepayStablecoinUserMessage';
    user: Address;
    amount: bigint;
}

export function storeRepayStablecoinUserMessage(src: RepayStablecoinUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3726616898, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadRepayStablecoinUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3726616898) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'RepayStablecoinUserMessage' as const, user: _user, amount: _amount };
}

function loadTupleRepayStablecoinUserMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'RepayStablecoinUserMessage' as const, user: _user, amount: _amount };
}

function storeTupleRepayStablecoinUserMessage(source: RepayStablecoinUserMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRepayStablecoinUserMessage(): DictionaryValue<RepayStablecoinUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepayStablecoinUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadRepayStablecoinUserMessage(src.loadRef().beginParse());
        }
    }
}

export type WithdrawCollateralUserMessage = {
    $$type: 'WithdrawCollateralUserMessage';
    user: Address;
    amount: bigint;
}

export function storeWithdrawCollateralUserMessage(src: WithdrawCollateralUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3579692410, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawCollateralUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3579692410) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawCollateralUserMessage' as const, user: _user, amount: _amount };
}

function loadTupleWithdrawCollateralUserMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawCollateralUserMessage' as const, user: _user, amount: _amount };
}

function storeTupleWithdrawCollateralUserMessage(source: WithdrawCollateralUserMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawCollateralUserMessage(): DictionaryValue<WithdrawCollateralUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawCollateralUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawCollateralUserMessage(src.loadRef().beginParse());
        }
    }
}

export type SetDeps = {
    $$type: 'SetDeps';
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

export function storeSetDeps(src: SetDeps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1512759282, 32);
        b_0.storeAddress(src.stablecoinMasterAddress);
        b_0.storeAddress(src.positionsManagerAddress);
    };
}

export function loadSetDeps(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1512759282) { throw Error('Invalid prefix'); }
    let _stablecoinMasterAddress = sc_0.loadAddress();
    let _positionsManagerAddress = sc_0.loadAddress();
    return { $$type: 'SetDeps' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function loadTupleSetDeps(source: TupleReader) {
    let _stablecoinMasterAddress = source.readAddress();
    let _positionsManagerAddress = source.readAddress();
    return { $$type: 'SetDeps' as const, stablecoinMasterAddress: _stablecoinMasterAddress, positionsManagerAddress: _positionsManagerAddress };
}

function storeTupleSetDeps(source: SetDeps) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.stablecoinMasterAddress);
    builder.writeAddress(source.positionsManagerAddress);
    return builder.build();
}

function dictValueParserSetDeps(): DictionaryValue<SetDeps> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeps(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeps(src.loadRef().beginParse());
        }
    }
}

 type GateKeeperContract_init_args = {
    $$type: 'GateKeeperContract_init_args';
}

function initGateKeeperContract_init_args(src: GateKeeperContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function GateKeeperContract_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initGateKeeperContract_init_args({ $$type: 'GateKeeperContract_init_args' })(builder);
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
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    15032: { message: `not from stablecoin master` },
    23932: { message: `not enough tons sent` },
    32589: { message: `updateDebtAccumulatedRate:Invalid timestamp` },
    41207: { message: `invalid sender` },
    47204: { message: `not enough collateral on contract` },
    53160: { message: `not from positions manager` },
    60380: { message: `no fees collected` },
    61910: { message: `not from positionsManager` },
}

export class GateKeeperContract implements Contract {
    
    static async init() {
        return await GateKeeperContract_init();
    }
    
    static async fromInit() {
        const init = await GateKeeperContract_init();
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetDeps | PoolSettingsMsg | UpdateTonPriceMsg | 'updateDebtRate' | 'WithdrawFees' | DepositCollateralUserMessage | WithdrawStablecoinUserMessage | RepayStablecoinUserMessage | WithdrawCollateralUserMessage | DoWithdrawCollateralMessage | DecreaseTotalStableMessage | IncreaseTotalStableMessage | 'EmergencyExit' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeps') {
            body = beginCell().store(storeSetDeps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PoolSettingsMsg') {
            body = beginCell().store(storePoolSettingsMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTonPriceMsg') {
            body = beginCell().store(storeUpdateTonPriceMsg(message)).endCell();
        }
        if (message === 'updateDebtRate') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'WithdrawFees') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositCollateralUserMessage') {
            body = beginCell().store(storeDepositCollateralUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawStablecoinUserMessage') {
            body = beginCell().store(storeWithdrawStablecoinUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayStablecoinUserMessage') {
            body = beginCell().store(storeRepayStablecoinUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawCollateralUserMessage') {
            body = beginCell().store(storeWithdrawCollateralUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DoWithdrawCollateralMessage') {
            body = beginCell().store(storeDoWithdrawCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DecreaseTotalStableMessage') {
            body = beginCell().store(storeDecreaseTotalStableMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'IncreaseTotalStableMessage') {
            body = beginCell().store(storeIncreaseTotalStableMessage(message)).endCell();
        }
        if (message === 'EmergencyExit') {
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
    
    async getTonPriceWithSafetyMargin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tonPriceWithSafetyMargin', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDebtRate(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('debtRate', builder.build())).stack;
        const result = loadTupleDebtRate(source);
        return result;
    }
    
    async getStablecoinsIssued(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stablecoinsIssued', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTotalCollateralAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('totalCollateralAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetDeps(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getDeps', builder.build())).stack;
        const result = loadTupleDeps(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}