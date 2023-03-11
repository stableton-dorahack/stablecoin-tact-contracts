import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./StablecoinJetton";
import "./UserPosition";


contract StablecoinMasterContract with Deployable, Ownable {
   
    totalSupply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address; 
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    content: Cell?;

    init(positionsManagerAddress: Address, gateKeeperAddress: Address) {
        let ctx: Context = context();
        self.owner = ctx.sender;
        self.positionsManagerAddress = positionsManagerAddress;
        self.gateKeeperAddress = gateKeeperAddress;
    }

    // -----  standard jetton master functions

    receive(msg: TokenUpdateContent) {

        // Allow changing content only by owner
        self.requireOwner();
        
        // Update content
        self.content = msg.content;
    }

    receive(msg: TokenBurnNotification) {
        
        // Check wallet
        self.requireWallet(msg.owner);

        // Update supply
        self.totalSupply = self.totalSupply - msg.amount;

        // Cashback
        if (msg.responseAddress != null) {
            send(SendParameters{
                to: msg.responseAddress!!, 
                value: 0,
                bounce: false,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: TokenExcesses{
                    queryId: msg.queryId
                }.toCell()
            });
        }
    }

    // -- extended master functions to communicate with stablecoin system

    /*
        message came from userPosition
        mint new stablecoins for to
        todo add 
    */
    receive(msg: MintMessage) {
  
        let ctx: Context = context();

        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);

        // todo check if message from userPosition

        self.mint(msg.user, msg.amount, msg.user);
    }

    /*
        message came from userPosition
        send jetton.burn
    */
    receive(msg: RepayBurnMessage) {
        // check if sender is userPosition
        let ctx: Context = context();
        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);

        let winit: StateInit = self.getJettonWalletInit(msg.user);
        let walletAddress: Address = contractAddress(winit);
        send(SendParameters{
            to: walletAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: msg.toCell()
        });
    }

    /*
        message came from jetton
        decrease totalSupply
        call userPosition.stableBurned(user, amount, fees)
    */
    receive(msg: RepayBurnNotification) {
        // how to test sender, need to rethink treasure to generate needed address
        self.requireWallet(msg.user);

        let ctx: Context = context();
        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: userPositionAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: StablecoinBurnedMessage{ 
                amount: msg.amount,
                user: msg.user,
                fees: msg.fees
            }.toCell()
        });
    }

    /*
        message came from gateKeeper
        increase totalSupply
        send transfer to jetton
    */
    receive(msg: MintFeesMessage) {
        let ctx: Context = context(); 
        require(ctx.sender == self.gateKeeperAddress, "not from gatekeeper");

        self.mint(msg.to, msg.amount, msg.to);
        
    }

    fun requireWallet(owner: Address) {
        let ctx: Context = context();
        let winit: StateInit = self.getJettonWalletInit(owner);
        require(contractAddress(winit) == ctx.sender, "Invalid sender");
    }

    fun getJettonWalletInit(address: Address): StateInit {
        return initOf StablecoinJettonContract(myAddress(), address);
    }

    fun mint(to: Address, amount: Int, responseAddress: Address?) {

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
                responseAddress: responseAddress,
                forwardTonAmount: 0,
                forwardPayload: emptySlice()
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

   
    //
    // Standard Get Methods
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

    get fun totalSupply(): Int {
        return self.totalSupply;
    }

 
}