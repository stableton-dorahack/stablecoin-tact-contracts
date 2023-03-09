import "@stdlib/deploy";
import "./messages";
import "./StablecoinJetton";

message MintMessage {
    to: Address;
    amount: Int as coins;
}

message BurnMessage {
    address: Address;
    amount: Int as coins;
    fees: Int as coins;
}

message RepayBurnNotification {
    user: Address;
    amount: Int as coins;

}


contract StablecoinMasterContract with Deployable {
   
    totalSupply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address; 
    content: Cell?;

    init(owner: Address, content: Cell) {
        self.owner = owner;
        self.content = content;
    }


    /*
        message came from userPosition
        mint new stablecoins for to
        todo add 
    */
    receive(msg: MintMessage) {
        // todo check if sender is userPosition
        // question - do we need responseAddress? notifications?
        self.mint(msg.to, msg.amount);
    }

    /*
        message came from userPosition
        send jetton.burn
    */
    receive(msg: BurnMessage) {
        // check if sender is userPosition
    }

    /*
        message came from jetton
        decrease totalSupply
        call userPosition.stableBurned(user, amount, fees)
    */
    receive(msg: RepayBurnNotification) {
        
    }

    /*
        message came from gateKeeper
        increase totalSupply
        send transfer to jetton
    */
    receive(msg: MintFeesMessage) {
        
    }

    fun requireWallet(owner: Address) {
        let ctx: Context = context();
        let winit: StateInit = self.getJettonWalletInit(owner);
        require(contractAddress(winit) == ctx.sender, "Invalid sender");
    }

    fun getJettonWalletInit(address: Address): StateInit {
        return initOf StablecoinJetton(myAddress(), address);
    }

    fun mint(to: Address, amount: Int) { //todo add responseAddress

        // Update total supply
        self.totalSupply = self.totalSupply + amount;

        // Create message
        let winit: StateInit = self.getJettonWalletInit(to);
        let walletAddress: Address = contractAddress(winit);
        send(SendParameters{
            to: walletAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: TokenTransferInternal{ 
                amount: amount,
                queryId: 0,
                from: myAddress(),
                // responseAddress: responseAddress,
                responseAddress: myAddress(), // ??
                // todo
                forwardTonAmount: 0,
                forwardPayload: emptySlice()
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

    fun burn() {
        // send jetton.burn()
    
    }
   
    //
    // Get Methods
    //

    get fun get_wallet_address(owner: Address): Address {
        let winit: StateInit = self.getJettonWalletInit(owner);
        return contractAddress(winit);
    }

    get fun get_jetton_data(): JettonData {
        let code: Cell = self.getJettonWalletInit(myAddress()).code;
        return JettonData{ 
            totalSupply: self.totalSupply, 
            mintable: self.mintable, 
            owner: self.owner, 
            content: self.content, 
            walletCode: code
        };
    }
}