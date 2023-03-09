import "@stdlib/deploy";
import "./UserPosition";

message SetPositionAddressMessage { 
    user: Address;
}

contract PositionAddressContract with Deployable {
   
    id: Int as uint32;
    positionAddress: Address;

    init(id: Int) {
        self.id = id; 
        self.positionAddress = newAddress(0, 0);
    }

    /*
        message came from userPosition
        set position address
        now we can determine this contract address by positionId 
        and get positionAddress by getter
    */
    receive(msg: SetPositionAddressMessage) {
        let ctx: Context = context();
        // self.requireUserPositionContract(msg.user);
        // check if position address is not set
        // require(self.positionAddress == newAddress(0,0), "Already set");
        self.positionAddress = ctx.sender; //msg.positionAddress;
    }

    fun requireUserPositionContract(user: Address) {
        let ctx: Context = context();
        let winit: StateInit = initOf UserPositionContract(user);
        require(contractAddress(winit) == ctx.sender, "Invalid sender");
    }


    get fun getPositionId(): Int {
        return self.id;
    }

    get fun getPositionAddress(): Address {
        return self.positionAddress;
    }
    
}