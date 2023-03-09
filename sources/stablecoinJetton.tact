import "@stdlib/deploy";


message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}


message(0x178d4519) TokenTransferInternal {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    responseAddress: Address?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0x595f07bc) TokenBurn {
    queryId: Int as uint64;
    amount: Int as coins;
    owner: Address;
    responseAddress: Address?;
}

message RepayBurnMessage {
    amount: Int as coins;
    fees: Int as coins;
}

message(0x7bdd97de) TokenBurnNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    owner: Address;
    responseAddress: Address?;
}


message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
}

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining;
}


contract StablecoinJetton with Deployable {

    const minTonsForStorage: Int = ton("0.01");
    const gasConsumption: Int = ton("0.01");
   
    balance: Int as coins;
    owner: Address;
    master: Address;

    init(master: Address, owner: Address) {
        self.balance = 0;
        self.owner = owner;
        self.master = master;
    }

    receive(msg: TokenTransfer) {

        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");

        // Update balance
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid balance");

        // Gas checks
        let fwdFee: Int = ctx.readForwardFee();
        let fwdCount: Int = 1;
        if (msg.forwardTonAmount > 0) {
            fwdCount = 2;
        }
        require(ctx.value > fwdCount * fwdFee + 2 * self.gasConsumption + self.minTonsForStorage, "Invalid value");
  
        // Send tokens
        let init: StateInit = initOf StablecoinJetton(self.master, msg.destination);
        // let walletAddress: Address = contractAddress(init);
        // send(SendParameters{
        //     to: walletAddress, 
        //     value: 0,
        //     mode: SendRemainingValue, 
        //     bounce: true,
        //     body: TokenTransferInternal{
        //         amount: msg.amount,
        //         queryId: msg.queryId,
        //         from: self.owner,
        //         responseAddress: self.owner,
        //         forwardTonAmount: msg.forwardTonAmount,
        //         forwardPayload: msg.forwardPayload
        //     }.toCell(),
        //     code: init.code,
        //     data: init.data
        // });
    }

    receive(msg: TokenTransferInternal) {
        // Check sender
        let ctx: Context = context();
        if (ctx.sender != self.master) {
            let sinit: StateInit = initOf StablecoinJetton(self.master, msg.from);
            require(contractAddress(sinit) == ctx.sender, "Invalid sender");
        }

        // Update balance
        self.balance = self.balance + msg.amount;
        require(self.balance >= 0, "Invalid balance");

        // Adjust value for gas
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        msgValue = msgValue - (storageFee + self.gasConsumption);

        // Forward ton
        if (msg.forwardTonAmount > 0) {
            let fwdFee: Int = ctx.readForwardFee();
            msgValue = msgValue - (msg.forwardTonAmount + fwdFee);
            send(SendParameters{
                to: self.owner,
                value: msg.forwardTonAmount,
                bounce: false,
                body: TokenNotification{
                    queryId: msg.queryId,
                    amount: msg.amount,
                    from: msg.from,
                    forwardPayload: msg.forwardPayload
                }.toCell()
            });
        }

        // Cashback
        if (msg.responseAddress != null && msgValue > 0) {
            send(SendParameters{
                to: msg.responseAddress!!,
                value: msgValue,
                bounce: false,
                body: TokenExcesses{
                    queryId: msg.queryId
                }.toCell()
            });
        }
    }


    receive(msg: TokenBurn) {
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");

        // Update balance
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid balance");

        // Gas checks
        let fwdFee: Int = ctx.readForwardFee();
        require(ctx.value > fwdFee + 2 * self.gasConsumption + self.minTonsForStorage, "Invalid value");

        // Burn tokens
        send(SendParameters{
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: TokenBurnNotification{
                queryId: msg.queryId,
                amount: msg.amount,
                owner: self.owner,
                responseAddress: self.owner
            }.toCell()
        });
    }

    receive(msg: RepayBurnMessage) {
        /* check if called by master
        if balance >= amount
        decrease balance
        master.repayBurnNotification(amount, fees)

        if balance < amount - error, userStatus.message(error)
        */
    }
    
}