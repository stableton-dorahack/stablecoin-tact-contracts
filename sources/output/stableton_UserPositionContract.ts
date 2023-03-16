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
    closeFactorBps: bigint;
    liquidatorIncentiveBps: bigint;
}

export function storePoolSettings(src: PoolSettings) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.liquidationRatio, 32);
        b_0.storeUint(src.stabilityFeeRate, 32);
        b_0.storeUint(src.closeFactorBps, 32);
        b_0.storeUint(src.liquidatorIncentiveBps, 32);
    };
}

export function loadPoolSettings(slice: Slice) {
    let sc_0 = slice;
    let _liquidationRatio = sc_0.loadUintBig(32);
    let _stabilityFeeRate = sc_0.loadUintBig(32);
    let _closeFactorBps = sc_0.loadUintBig(32);
    let _liquidatorIncentiveBps = sc_0.loadUintBig(32);
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function loadTuplePoolSettings(source: TupleReader) {
    let _liquidationRatio = source.readBigNumber();
    let _stabilityFeeRate = source.readBigNumber();
    let _closeFactorBps = source.readBigNumber();
    let _liquidatorIncentiveBps = source.readBigNumber();
    return { $$type: 'PoolSettings' as const, liquidationRatio: _liquidationRatio, stabilityFeeRate: _stabilityFeeRate, closeFactorBps: _closeFactorBps, liquidatorIncentiveBps: _liquidatorIncentiveBps };
}

function storeTuplePoolSettings(source: PoolSettings) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationRatio);
    builder.writeNumber(source.stabilityFeeRate);
    builder.writeNumber(source.closeFactorBps);
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
        b_0.storeUint(3723304936, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadDepositCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3723304936) { throw Error('Invalid prefix'); }
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
        b_0.storeUint(3410368520, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadWithdrawCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3410368520) { throw Error('Invalid prefix'); }
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
        b_0.storeUint(1815710139, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadWithdrawStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1815710139) { throw Error('Invalid prefix'); }
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
        b_0.storeUint(3203603975, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.store(storePoolSettings(src.settings));
        b_0.store(storeDebtRate(src.rate));
        b_0.storeCoins(src.tonPriceWithSafetyMargin);
    };
}

export function loadRepayStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3203603975) { throw Error('Invalid prefix'); }
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

 type UserPositionContract_init_args = {
    $$type: 'UserPositionContract_init_args';
    user: Address;
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
}

function initUserPositionContract_init_args(src: UserPositionContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.stablecoinMasterAddress);
        b_0.storeAddress(src.positionsManagerAddress);
    };
}

async function UserPositionContract_init(user: Address, stablecoinMasterAddress: Address, positionsManagerAddress: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initUserPositionContract_init_args({ $$type: 'UserPositionContract_init_args', user, stablecoinMasterAddress, positionsManagerAddress })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const UserPositionContract_errors: { [key: number]: { message: string } } = {
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
    15032: { message: `not from stablecoin master` },
    53160: { message: `not from positions manager` },
    61910: { message: `not from positionsManager` },
}

export class UserPositionContract implements Contract {
    
    static async init(user: Address, stablecoinMasterAddress: Address, positionsManagerAddress: Address) {
        return await UserPositionContract_init(user, stablecoinMasterAddress, positionsManagerAddress);
    }
    
    static async fromInit(user: Address, stablecoinMasterAddress: Address, positionsManagerAddress: Address) {
        const init = await UserPositionContract_init(user, stablecoinMasterAddress, positionsManagerAddress);
        const address = contractAddress(0, init);
        return new UserPositionContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new UserPositionContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: UserPositionContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DepositCollateralMessage | WithdrawStablecoinMessage | RepayStablecoinMessage | StablecoinBurnedMessage | WithdrawCollateralMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositCollateralMessage') {
            body = beginCell().store(storeDepositCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawStablecoinMessage') {
            body = beginCell().store(storeWithdrawStablecoinMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayStablecoinMessage') {
            body = beginCell().store(storeRepayStablecoinMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StablecoinBurnedMessage') {
            body = beginCell().store(storeStablecoinBurnedMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawCollateralMessage') {
            body = beginCell().store(storeWithdrawCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetPositionUser(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPositionUser', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetPositionState(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPositionState', builder.build())).stack;
        const result = loadTuplePositionState(source);
        return result;
    }
    
    async getGetMessage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getMessage', builder.build())).stack;
        const result = loadTupleMessage(source);
        return result;
    }
    
}