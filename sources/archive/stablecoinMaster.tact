import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./StablecoinJetton";
import "./UserPosition";


// tmp message for initial dev mint to owner
// should be removed
message Mint {
    amount: Int;
}

message SetDeps {
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
}

contract StablecoinMasterContract with Deployable, Ownable {
   
    totalSupply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address; 
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
    content: Cell?;

    init(owner: Address, content: Cell) {
        self.owner = owner;
        self.positionsManagerAddress = newAddress(0, 0);
        self.gateKeeperAddress = newAddress(0, 0);
        self.content = content;
    }

    receive (msg: SetDeps) {
        nativeReserve(ton("0.1"), 0);
        self.requireOwner();
        self.positionsManagerAddress = msg.positionsManagerAddress;
        self.gateKeeperAddress = msg.gateKeeperAddress;
    }

    // -----  standard jetton master functions

    receive(msg: TokenUpdateContent) {
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
        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);
       
        // todo check if message from userPosition
        // require(sender() == self.userPositionAddress, "invalid sender");

        self.mint(msg.user, msg.amount, msg.user);
    }

    /*
        message came from userPosition
        send jetton.burn
    */
    receive(msg: RepayBurnMessage) {

        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);
        // todo enable this line
        //require(sender() == userPositionAddress, "invalid sender");

        let winit: StateInit = self.getJettonWalletInit(msg.user);
        let walletAddress: Address = contractAddress(winit);

        send(SendParameters{
            to: walletAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: msg.toCell()
        });
    }

    /*
        message came from jetton
        decrease totalSupply
        call userPosition.stableBurned(user, amount, fees)
    */
    receive(msg: RepayBurnNotification) {
        self.requireWallet(msg.user);

        let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: userPositionAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: StablecoinBurnedMessage{ 
                amount: msg.amount,
                user: msg.user,
                rate: msg.rate
            }.toCell()
        });
    }

    /*
        message came from gateKeeper
        increase totalSupply
        send transfer to jetton
    */
    receive(msg: WithdrawFeesMessage) {
        require(sender() == self.gateKeeperAddress, "not from gatekeeper");
        self.mint(msg.to, msg.amount, msg.to);
    }

    receive(msg: Mint) {
        require(sender() == self.owner, "invalid sender");
        self.mint(sender(), msg.amount, sender());
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