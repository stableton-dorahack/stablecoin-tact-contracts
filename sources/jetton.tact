import "./master";
import "./wallet";
import "./messages";
import "@stdlib/deploy";
import "./UserPosition";



message Mint {
    amount: Int;
}

message SetDeps {
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;
}

contract StablecoinMaster with Jetton, Deployable {

    totalSupply: Int as coins;
    owner: Address;
    content: Cell?;
    mintable: Bool;
    positionsManagerAddress: Address;
    gateKeeperAddress: Address;

    init(owner: Address, content: Cell?) {
        self.totalSupply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.positionsManagerAddress = newAddress(0, 0);
        self.gateKeeperAddress = newAddress(0, 0);
    }

    receive (msg: SetDeps) {
        self.requireOwner();
        self.positionsManagerAddress = msg.positionsManagerAddress;
        self.gateKeeperAddress = msg.gateKeeperAddress;
    }

    receive(msg: Mint) {
        self.requireOwner();
        self.mint(sender(), msg.amount, sender());
    }

    // stablecoin handlers

    /*
        message came from userPosition
        mint new stablecoins for to
        todo add 
    */
    receive(msg: MintMessage) {
      let init: StateInit = initOf UserPositionContract(msg.user, myAddress(), self.positionsManagerAddress);
      let userPositionAddress: Address = contractAddress(init);
      
      // todo check if message from userPosition
      require(sender() == userPositionAddress, "invalid sender");

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





    get fun totalSupply(): Int {
        return self.totalSupply;
    }

}