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

export type DepositCollateralMessage = {
    $$type: 'DepositCollateralMessage';
    user: Address;
    amount: bigint;
}

export function storeDepositCollateralMessage(src: DepositCollateralMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(299872568, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadDepositCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 299872568) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'DepositCollateralMessage' as const, user: _user, amount: _amount };
}

function loadTupleDepositCollateralMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'DepositCollateralMessage' as const, user: _user, amount: _amount };
}

function storeTupleDepositCollateralMessage(source: DepositCollateralMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
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
    debtRate: bigint;
}

export function storeWithdrawCollateralMessage(src: WithdrawCollateralMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1747572062, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.debtRate, 257);
    };
}

export function loadWithdrawCollateralMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1747572062) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _debtRate = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawCollateralMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function loadTupleWithdrawCollateralMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _debtRate = source.readBigNumber();
    return { $$type: 'WithdrawCollateralMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function storeTupleWithdrawCollateralMessage(source: WithdrawCollateralMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.debtRate);
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
    debtRate: bigint;
}

export function storeWithdrawStablecoinMessage(src: WithdrawStablecoinMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4082453719, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.storeUint(src.debtRate, 64);
    };
}

export function loadWithdrawStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4082453719) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _debtRate = sc_0.loadUintBig(64);
    return { $$type: 'WithdrawStablecoinMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function loadTupleWithdrawStablecoinMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _debtRate = source.readBigNumber();
    return { $$type: 'WithdrawStablecoinMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function storeTupleWithdrawStablecoinMessage(source: WithdrawStablecoinMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.debtRate);
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
    debtRate: bigint;
}

export function storeRepayStablecoinMessage(src: RepayStablecoinMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1854010438, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.storeUint(src.debtRate, 64);
    };
}

export function loadRepayStablecoinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1854010438) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _debtRate = sc_0.loadUintBig(64);
    return { $$type: 'RepayStablecoinMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function loadTupleRepayStablecoinMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _debtRate = source.readBigNumber();
    return { $$type: 'RepayStablecoinMessage' as const, user: _user, amount: _amount, debtRate: _debtRate };
}

function storeTupleRepayStablecoinMessage(source: RepayStablecoinMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.debtRate);
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
    fees: bigint;
}

export function storeDecreaseTotalStableMessage(src: DecreaseTotalStableMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3984666698, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.storeUint(src.fees, 64);
    };
}

export function loadDecreaseTotalStableMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3984666698) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _fees = sc_0.loadUintBig(64);
    return { $$type: 'DecreaseTotalStableMessage' as const, user: _user, amount: _amount, fees: _fees };
}

function loadTupleDecreaseTotalStableMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _fees = source.readBigNumber();
    return { $$type: 'DecreaseTotalStableMessage' as const, user: _user, amount: _amount, fees: _fees };
}

function storeTupleDecreaseTotalStableMessage(source: DecreaseTotalStableMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.fees);
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

export type MintFeesMessage = {
    $$type: 'MintFeesMessage';
    to: Address;
    amount: bigint;
}

export function storeMintFeesMessage(src: MintFeesMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2638369821, 32);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
    };
}

export function loadMintFeesMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2638369821) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'MintFeesMessage' as const, to: _to, amount: _amount };
}

function loadTupleMintFeesMessage(source: TupleReader) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'MintFeesMessage' as const, to: _to, amount: _amount };
}

function storeTupleMintFeesMessage(source: MintFeesMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMintFeesMessage(): DictionaryValue<MintFeesMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintFeesMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintFeesMessage(src.loadRef().beginParse());
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

export type SetPositionIdMessage = {
    $$type: 'SetPositionIdMessage';
    positionId: bigint;
}

export function storeSetPositionIdMessage(src: SetPositionIdMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(11782869, 32);
        b_0.storeUint(src.positionId, 8);
    };
}

export function loadSetPositionIdMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 11782869) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadUintBig(8);
    return { $$type: 'SetPositionIdMessage' as const, positionId: _positionId };
}

function loadTupleSetPositionIdMessage(source: TupleReader) {
    let _positionId = source.readBigNumber();
    return { $$type: 'SetPositionIdMessage' as const, positionId: _positionId };
}

function storeTupleSetPositionIdMessage(source: SetPositionIdMessage) {
    let builder = new TupleBuilder();
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

export type StablecoinBurnedMessage = {
    $$type: 'StablecoinBurnedMessage';
    user: Address;
    amount: bigint;
    fees: bigint;
}

export function storeStablecoinBurnedMessage(src: StablecoinBurnedMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3535686764, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 64);
        b_0.storeUint(src.fees, 64);
    };
}

export function loadStablecoinBurnedMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3535686764) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    let _fees = sc_0.loadUintBig(64);
    return { $$type: 'StablecoinBurnedMessage' as const, user: _user, amount: _amount, fees: _fees };
}

function loadTupleStablecoinBurnedMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _fees = source.readBigNumber();
    return { $$type: 'StablecoinBurnedMessage' as const, user: _user, amount: _amount, fees: _fees };
}

function storeTupleStablecoinBurnedMessage(source: StablecoinBurnedMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.fees);
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

 type PositionsManagerContract_init_args = {
    $$type: 'PositionsManagerContract_init_args';
    owner: Address;
    gateKeeperAddress: Address;
    stablecoinMasterAddress: Address;
}

function initPositionsManagerContract_init_args(src: PositionsManagerContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.gateKeeperAddress);
        b_0.storeAddress(src.stablecoinMasterAddress);
    };
}

async function PositionsManagerContract_init(owner: Address, gateKeeperAddress: Address, stablecoinMasterAddress: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPositionsManagerContract_init_args({ $$type: 'PositionsManagerContract_init_args', owner, gateKeeperAddress, stablecoinMasterAddress })(builder);
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
    5576: { message: `not from gateKeeper` },
    16059: { message: `Invalid value` },
}

export class PositionsManagerContract implements Contract {
    
    static async init(owner: Address, gateKeeperAddress: Address, stablecoinMasterAddress: Address) {
        return await PositionsManagerContract_init(owner, gateKeeperAddress, stablecoinMasterAddress);
    }
    
    static async fromInit(owner: Address, gateKeeperAddress: Address, stablecoinMasterAddress: Address) {
        const init = await PositionsManagerContract_init(owner, gateKeeperAddress, stablecoinMasterAddress);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DepositCollateralMessage | NewPositionIdMessage | WithdrawStablecoinMessage | IncreaseTotalStableMessage | RepayStablecoinMessage | DecreaseTotalStableMessage | WithdrawCollateralMessage | DoWithdrawCollateralMessage | Deploy) {
        
        let body: Cell | null = null;
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
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}