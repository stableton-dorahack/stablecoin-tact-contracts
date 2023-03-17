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

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(33240155, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 33240155) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Mint' as const, amount: _amount };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Mint' as const, amount: _amount };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

 type StablecoinMaster_init_args = {
    $$type: 'StablecoinMaster_init_args';
    owner: Address;
    content: Cell | null;
}

function initStablecoinMaster_init_args(src: StablecoinMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

async function StablecoinMaster_init(owner: Address, content: Cell | null) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initStablecoinMaster_init_args({ $$type: 'StablecoinMaster_init_args', owner, content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StablecoinMaster_errors: { [key: number]: { message: string } } = {
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
    13650: { message: `Invalid bounced message` },
    15032: { message: `not from stablecoin master` },
    16059: { message: `Invalid value` },
    33545: { message: `not from gatekeeper` },
    53160: { message: `not from positions manager` },
    61910: { message: `not from positionsManager` },
    62972: { message: `Invalid balance` },
}

export class StablecoinMaster implements Contract {
    
    static async init(owner: Address, content: Cell | null) {
        return await StablecoinMaster_init(owner, content);
    }
    
    static async fromInit(owner: Address, content: Cell | null) {
        const init = await StablecoinMaster_init(owner, content);
        const address = contractAddress(0, init);
        return new StablecoinMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new StablecoinMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: StablecoinMaster_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetDeps | Mint | MintMessage | RepayBurnMessage | RepayBurnNotification | WithdrawFeesMessage | TokenUpdateContent | TokenBurnNotification | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeps') {
            body = beginCell().store(storeSetDeps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintMessage') {
            body = beginCell().store(storeMintMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayBurnMessage') {
            body = beginCell().store(storeRepayBurnMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayBurnNotification') {
            body = beginCell().store(storeRepayBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawFeesMessage') {
            body = beginCell().store(storeWithdrawFeesMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
            body = beginCell().store(storeTokenUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
            body = beginCell().store(storeTokenBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getDeps(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('deps', builder.build())).stack;
        const result = loadTupleDeps(source);
        return result;
    }
    
    async getTotalSupply(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('totalSupply', builder.build())).stack;
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
    
    async getMessage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('message', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadTupleJettonData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}