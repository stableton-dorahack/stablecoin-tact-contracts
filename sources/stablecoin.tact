import "./UserPosition";
import "./stablecoinMaster";
import "./stablecoinWallet";
import "./messages";
import "@stdlib/deploy";

message Mint {
    amount: Int;
}

contract StablecoinMaster with Jetton, Deployable {
    totalSupply: Int as coins;
    owner: Address;
    content: Cell?;
    mintable: Bool;
    deps: Deps;
    message: String;

    init(owner: Address, content: Cell?) {
        self.totalSupply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.deps = Deps{
            stablecoinMasterAddress: newAddress(0, 0),
            gateKeeperAddress: newAddress(0, 0),
            positionsManagerAddress: newAddress(0, 0)
        };
        self.message = "";
    }

    receive (msg: SetDeps) {
        self.requireOwner();
        self.deps = Deps{
            stablecoinMasterAddress: msg.stablecoinMasterAddress,
            gateKeeperAddress: msg.gateKeeperAddress,
            positionsManagerAddress: msg.positionsManagerAddress
        };
        reply("deps set".asComment());
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
      let userPositionAddress: Address = self._userPositionAddress(msg.user);
      
      // todo check if message from userPosition
      //require(sender() == userPositionAddress, "invalid sender");

      self.mint(msg.user, msg.amount, msg.user);
    }

    /*
        message came from userPosition
        send jetton.burn
    */
    receive(msg: RepayBurnMessage) {
        // bug? different address calculation than in positions manager
        // let userPositionAddress: Address =  self._userPositionAddress(msg.user);

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

        // looks like huge bug here, explain later
        // let userPositionAddress: Address =  self._userPositionAddress(msg.user);

        send(SendParameters{
            to: msg.userPosition, 
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
        require(sender() == self.deps.gateKeeperAddress, "not from gatekeeper");
        self.mint(msg.to, msg.amount, msg.to);
    }

    fun _userPositionAddress(user: Address): Address {
        let init: StateInit = initOf UserPositionContract(user, self.deps.stablecoinMasterAddress, self.deps.positionsManagerAddress);
        let userPositionAddress: Address = contractAddress(init);
        return userPositionAddress;
    }


    get fun deps(): Deps {
        return self.deps;
    }

    get fun totalSupply(): Int {
        return self.totalSupply;
    }

    get fun userPositionAddress(user: Address): Address {
        return self._userPositionAddress(user);
    }

    get fun message(): String {
        return self.message;
    }

}