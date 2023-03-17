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
        b_0.storeInt(src.liquidationRatio, 257);
        b_0.storeInt(src.stabilityFeeRate, 257);
        b_0.storeInt(src.liquidatorIncentiveBps, 257);
    };
}

export function loadPoolSettings(slice: Slice) {
    let sc_0 = slice;
    let _liquidationRatio = sc_0.loadIntBig(257);
    let _stabilityFeeRate = sc_0.loadIntBig(257);
    let _liquidatorIncentiveBps = sc_0.loadIntBig(257);
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
        b_0.storeInt(src.debtAccumulatedRate, 257);
        b_0.storeInt(src.lastAccumulationTime, 257);
    };
}

export function loadDebtRate(slice: Slice) {
    let sc_0 = slice;
    let _debtAccumulatedRate = sc_0.loadIntBig(257);
    let _lastAccumulationTime = sc_0.loadIntBig(257);
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
        b_0.storeUint(2462180005, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        let b_1 = new Builder();
        b_1.store(storePoolSettings(src.settings));
        let b_2 = new Builder();
        b_2.store(storeDebtRate(src.rate));
        b_2.storeCoins(src.tonPriceWithSafetyMargin);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDepositCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2462180005) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _settings = loadPoolSettings(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _rate = loadDebtRate(sc_2);
    let _tonPriceWithSafetyMargin = sc_2.loadCoins();
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
        b_0.storeUint(2015316053, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        let b_1 = new Builder();
        b_1.store(storePoolSettings(src.settings));
        let b_2 = new Builder();
        b_2.store(storeDebtRate(src.rate));
        b_2.storeCoins(src.tonPriceWithSafetyMargin);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWithdrawCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2015316053) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _settings = loadPoolSettings(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _rate = loadDebtRate(sc_2);
    let _tonPriceWithSafetyMargin = sc_2.loadCoins();
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
        b_0.storeUint(1345893159, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        let b_1 = new Builder();
        b_1.store(storePoolSettings(src.settings));
        let b_2 = new Builder();
        b_2.store(storeDebtRate(src.rate));
        b_2.storeCoins(src.tonPriceWithSafetyMargin);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWithdrawStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1345893159) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _settings = loadPoolSettings(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _rate = loadDebtRate(sc_2);
    let _tonPriceWithSafetyMargin = sc_2.loadCoins();
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
        b_0.storeUint(3058094568, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        let b_1 = new Builder();
        b_1.store(storePoolSettings(src.settings));
        let b_2 = new Builder();
        b_2.store(storeDebtRate(src.rate));
        b_2.storeCoins(src.tonPriceWithSafetyMargin);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRepayStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3058094568) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _settings = loadPoolSettings(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _rate = loadDebtRate(sc_2);
    let _tonPriceWithSafetyMargin = sc_2.loadCoins();
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
    userPosition: Address;
}

export function storeRepayBurnMessage(src: RepayBurnMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3969973468, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
        let b_1 = new Builder();
        b_1.storeAddress(src.userPosition);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRepayBurnMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3969973468) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _rate = loadDebtRate(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _userPosition = sc_1.loadAddress();
    return { $$type: 'RepayBurnMessage' as const, user: _user, amount: _amount, rate: _rate, userPosition: _userPosition };
}

function loadTupleRepayBurnMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _rate = loadTupleDebtRate(source.readTuple());
    let _userPosition = source.readAddress();
    return { $$type: 'RepayBurnMessage' as const, user: _user, amount: _amount, rate: _rate, userPosition: _userPosition };
}

function storeTupleRepayBurnMessage(source: RepayBurnMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeAddress(source.userPosition);
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
    userPosition: Address;
}

export function storeRepayBurnNotification(src: RepayBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2785635685, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
        let b_1 = new Builder();
        b_1.storeAddress(src.userPosition);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRepayBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2785635685) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _rate = loadDebtRate(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _userPosition = sc_1.loadAddress();
    return { $$type: 'RepayBurnNotification' as const, user: _user, amount: _amount, rate: _rate, userPosition: _userPosition };
}

function loadTupleRepayBurnNotification(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    const _rate = loadTupleDebtRate(source.readTuple());
    let _userPosition = source.readAddress();
    return { $$type: 'RepayBurnNotification' as const, user: _user, amount: _amount, rate: _rate, userPosition: _userPosition };
}

function storeTupleRepayBurnNotification(source: RepayBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleDebtRate(source.rate));
    builder.writeAddress(source.userPosition);
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
        b_0.storeUint(2304493462, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.store(storeDebtRate(src.rate));
    };
}

export function loadStablecoinBurnedMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2304493462) { throw Error('Invalid prefix'); }
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

export type SetDeps = {
    $$type: 'SetDeps';
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    stablecoinMasterAddress: Address;
}

export function storeSetDeps(src: SetDeps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3189103484, 32);
        b_0.storeAddress(src.positionsManagerAddress);
        b_0.storeAddress(src.gateKeeperAddress);
        b_0.storeAddress(src.stablecoinMasterAddress);
    };
}

export function loadSetDeps(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3189103484) { throw Error('Invalid prefix'); }
    let _positionsManagerAddress = sc_0.loadAddress();
    let _gateKeeperAddress = sc_0.loadAddress();
    let _stablecoinMasterAddress = sc_0.loadAddress();
    return { $$type: 'SetDeps' as const, positionsManagerAddress: _positionsManagerAddress, gateKeeperAddress: _gateKeeperAddress, stablecoinMasterAddress: _stablecoinMasterAddress };
}

function loadTupleSetDeps(source: TupleReader) {
    let _positionsManagerAddress = source.readAddress();
    let _gateKeeperAddress = source.readAddress();
    let _stablecoinMasterAddress = source.readAddress();
    return { $$type: 'SetDeps' as const, positionsManagerAddress: _positionsManagerAddress, gateKeeperAddress: _gateKeeperAddress, stablecoinMasterAddress: _stablecoinMasterAddress };
}

function storeTupleSetDeps(source: SetDeps) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.positionsManagerAddress);
    builder.writeAddress(source.gateKeeperAddress);
    builder.writeAddress(source.stablecoinMasterAddress);
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

export type Deps = {
    $$type: 'Deps';
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    stablecoinMasterAddress: Address;
}

export function storeDeps(src: Deps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.positionsManagerAddress);
        b_0.storeAddress(src.gateKeeperAddress);
        b_0.storeAddress(src.stablecoinMasterAddress);
    };
}

export function loadDeps(slice: Slice) {
    let sc_0 = slice;
    let _positionsManagerAddress = sc_0.loadAddress();
    let _gateKeeperAddress = sc_0.loadAddress();
    let _stablecoinMasterAddress = sc_0.loadAddress();
    return { $$type: 'Deps' as const, positionsManagerAddress: _positionsManagerAddress, gateKeeperAddress: _gateKeeperAddress, stablecoinMasterAddress: _stablecoinMasterAddress };
}

function loadTupleDeps(source: TupleReader) {
    let _positionsManagerAddress = source.readAddress();
    let _gateKeeperAddress = source.readAddress();
    let _stablecoinMasterAddress = source.readAddress();
    return { $$type: 'Deps' as const, positionsManagerAddress: _positionsManagerAddress, gateKeeperAddress: _gateKeeperAddress, stablecoinMasterAddress: _stablecoinMasterAddress };
}

function storeTupleDeps(source: Deps) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.positionsManagerAddress);
    builder.writeAddress(source.gateKeeperAddress);
    builder.writeAddress(source.stablecoinMasterAddress);
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

 type PositionsManagerContract_init_args = {
    $$type: 'PositionsManagerContract_init_args';
}

function initPositionsManagerContract_init_args(src: PositionsManagerContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function PositionsManagerContract_init() {
    const __code = Cell.fromBase64('te6ccgECQQEADmkAART/APSkE/S88sgLAQIBYgIDAgLJBAUCASAsLQTJ2AdDTAwFxsMABkX+RcOIB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJVFBTA28E+GEC+GLtRNDUAfhj0gABjoTbPGwVjo4w+CjXCwqDCbry4InbPOJVFNs8MI8PQYHAgHOCgsEaHAh10nCH5UwINcLH94Cklt/4CGCEL4V23y6jwUx2zxsE+AhghCSweKluuMCIYIQDXTFlboNDg8QASDI+EMBzH8BygBVQNs8ye1UCAHiVTFaINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZYINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxYBINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxbIUAMJAFAg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4InPFssfyQHMAV9kD0PQEMG0BggCENgGAEPQPb6Hy4IcBggCENiICgBD0F8gByPQAyQHMcAHKAFUgBIMAGnwDoegIYNoDBAHuvgMAIege30PlwQ4DBAHuvkQFACHoL5ADkegBkgOY4AOUALADAgIDngGTADaWiDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WWCDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WyQH20x8BghC+Fdt8uvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQH6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJEQM8EEcQNkV22zxsIjJQQ4uGRlcHMgc2V0jbPNs8QDR/EhMpAdQx0x8BghCSweKluvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQH6ANQB0IEBAdcAgQEB1wCBAQHXAFUgA9Qw0IEBAdcAgQEB1wBZAvoAMBBoEGcQRRA0EmwY2zx/FQSkjrMx0x8BghANdMWVuvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiTHgIYIQUDizJ7rjAiGCEJYJZRm64wIhghC2RtHouhcYGRoABEMwABD4QiLHBfLghAFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxFAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAkKBFcj4Qi3HBfL0+ENUeL3wQVzbPBBKEDlIdnCAQlB8fww4FgHiyFVwghCSweKlUAnLH1AHINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZQBfoCyFUhUCOBAQHPAIEBAc8AgQEBzwDIQDQCgQEBzwCBAQHPAFAD+gLJWMzJAczJQBZQRAUDEDYQNRA02zwqA/hVQCXbPKT4QyHwR1zbPHCAQn/4QhzIWYIQXabellADyx8BINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxYBINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxbJEDZFQBA7WRA2EDUQNNs8VQN/KDgqAdQx0x8BghBQOLMnuvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQHTP9QB0IEBAdcAgQEB1wCBAQHXAFUgA9Qw0IEBAdcAgQEB1wBZAvoAMBBoEGcQRRA0EmwY2zx/GwFwMdMfAYIQlgllGbry4IH6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkB0z9ZbBIdA/6O6jHTHwGCELZG0ei68uCB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAdM/1AHQgQEB1wCBAQHXAIEBAdcAVSAD1DDQgQEB1wCBAQHXAFkC+gAwEGgQZxBFEDQSbBjbPH/gIYIQEM2oLLrjAiGCEHgfSFW6Hh8gAkCBFcj4Qi3HBfL0EEwQO0qYJ9s8EEgQN0bccIBCUNx/DDccAeDIVXCCEFA4sydQCcsfUAcg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4InPFhXLP8hVIVAjgQEBzwCBAQHPAIEBAc8AyEA0AoEBAc8AgQEBzwBQA/oCyVjMyQHMyRBIEDdGUBRDMG1t2zwEKgKiEEYQNUZWJds8cIBCB38JyFmCEJYJZRlQA8sfASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8Wyz/JJUMUSJkUQzBtbds8VRJ/KCoCQIEVyPhCLccF8vQQTBA7Spgn2zwQSBA3RtxwgEJQ3H8MNyEBcDHTHwGCEBDNqCy68uCB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAdM/WWwSIgP+juox0x8BghB4H0hVuvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQH6ANQB0IEBAdcAgQEB1wCBAQHXAFUgA9Qw0IEBAdcAgQEB1wBZAvoAMBBoEGcQRRA0EmwY2zx/4CGCEMPNM7+64wIBghCUapi2uiMkJQHgyFVwghC2RtHoUAnLH1AHINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxYVyz/IVSFQI4EBAc8AgQEBzwCBAQHPAMhANAKBAQHPAIEBAc8AUAP6AslYzMkBzMkQSBA3RlAUQzBtbds8BCoCohBGEDVGViXbPHCAQgd/CchZghAQzagsUAPLHwEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4InPFss/ySVDFEiZFEMwbW3bPFUSfygqAkCBFcj4Qi3HBfL0EEwQO0qYJ9s8EEgQN0bccIBCUNx/DDcmAXAx0x8BghDDzTO/uvLggfpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQHTP1lsEicBTo6i0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8f+AwcCkB4shVcIIQeB9IVVAJyx9QByDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WUAX6AshVIVAjgQEBzwCBAQHPAIEBAc8AyEA0AoEBAc8AgQEBzwBQA/oCyVjMyQHMyRBIEDdGUBRDMG1t2zwEKgKiEEYQNUZWJds8cIBCB38JyFmCEMPNM79QA8sfASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8Wyz/JJUMUSJkUQzBtbds8VRJ/KCoAAjABGn/4QnBYA4BCAW1t2zwqAc7IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZQA/oCcAHKaCNusyVus7GXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAKwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBWC4vAgEgMjMDS7SjvaiaGoA/DHpAADHQm2eNgrHRxh8FGuFhUGE3XlwRO2ecW2eQPD0wA0+2I/2omhqAPwx6QAAx0JtnjYKx0cYfBRrhYVBhN15cETtnnEqgm2eQPD0xAAYUXwQBEmxR+EMB8EfbPDgCASA0NQNLu7cO1E0NQB+GPSAAGOhNs8bBWOjjD4KNcLCoMJuvLgids84ts8g8PT4DkbfcpBrpMCAhd15cEQQa4WFEEGE3RDAgn/dWPlwREGE3XlwRPaiaGoA/DHpAADHQm2eNgrHRxh8FGuFhUGE3XlwRO2ecSqCbZ5A8PTYCASA5OgEI2zxsUTcBEvhDVDFG8EHbPDgAjHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkDS7FFe1E0NQB+GPSAAGOhNs8bBWOjjD4KNcLCoMJuvLgids84ts8gPD07ALmy9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAAAlsB6PpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQH6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJQzAD1AHQPwHWcPhCUxHIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJUyLIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJUzNAAARsQQBU+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAdMfMBAlAGbIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJQDQ=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPositionsManagerContract_init_args({ $$type: 'PositionsManagerContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PositionsManagerContract_errors: { [key: number]: { message: string } } = {
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
    5576: { message: `not from gateKeeper` },
    15032: { message: `not from stablecoin master` },
    22230: { message: `Already set` },
    53160: { message: `not from positions manager` },
    61910: { message: `not from positionsManager` },
}

export class PositionsManagerContract implements Contract {
    
    static async init() {
        return await PositionsManagerContract_init();
    }
    
    static async fromInit() {
        const init = await PositionsManagerContract_init();
        const address = contractAddress(0, init);
        return new PositionsManagerContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PositionsManagerContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: PositionsManagerContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetDeps | DepositCollateralMessage | NewPositionIdMessage | WithdrawStablecoinMessage | IncreaseTotalStableMessage | RepayStablecoinMessage | DecreaseTotalStableMessage | WithdrawCollateralMessage | DoWithdrawCollateralMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeps') {
            body = beginCell().store(storeSetDeps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositCollateralMessage') {
            body = beginCell().store(storeDepositCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewPositionIdMessage') {
            body = beginCell().store(storeNewPositionIdMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawStablecoinMessage') {
            body = beginCell().store(storeWithdrawStablecoinMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'IncreaseTotalStableMessage') {
            body = beginCell().store(storeIncreaseTotalStableMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayStablecoinMessage') {
            body = beginCell().store(storeRepayStablecoinMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DecreaseTotalStableMessage') {
            body = beginCell().store(storeDecreaseTotalStableMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawCollateralMessage') {
            body = beginCell().store(storeWithdrawCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DoWithdrawCollateralMessage') {
            body = beginCell().store(storeDoWithdrawCollateralMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getLastPositionId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lastPositionId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getUserPositionAddress(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('userPositionAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getUserPositionAddressById(provider: ContractProvider, id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(id);
        let source = (await provider.get('userPositionAddressById', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDeps(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('deps', builder.build())).stack;
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