import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./UserPosition";

message SetDeps {
    stablecoinMasterAddress: Address;
    gateKeeperAddress: Address;
}

contract PositionsManagerContract with Deployable, Ownable {

    const MinTonsForStorage: Int = ton("0.01");
    const GasConsumption: Int = ton("0.01");

    // deps
    stablecoinMasterAddress: Address;
    gateKeeperAddress: Address;

    owner: Address;
    lastPositionId: Int as uint32 = 0;

    init() {
        self.owner = sender();
        self.gateKeeperAddress = newAddress(0, 0);
        self.stablecoinMasterAddress = newAddress(0, 0);
    }

    receive(msg: SetDeps) {
        self.requireOwner();
        self.stablecoinMasterAddress = msg.stablecoinMasterAddress;
        self.gateKeeperAddress = msg.gateKeeperAddress;
    }

    /*
        message came from gateKeeper
        deploy new user position (if needed) 
        and call userPosition.addCollateral
    */
    receive(msg: DepositCollateralMessage) {
        require(sender() == self.gateKeeperAddress, "not from gateKeeper");

        let ctx: Context = context();

        // require(ctx.value > msg.amount + fwdFee + 2 * self.GasConsumption + self.MinTonsForStorage, "Invalid value");
        
        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        // later - need maybe send amount to separate contract with payseparategas

        send(SendParameters{
            to: userPositionAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell(),
            code: init.code,
            data: init.data
        });
    }

    /*
        message came from userPosition
        increase lastPositionId
        deploys positionAddressConrtact that stores positionId and position address
        used to get position address by id for liquidations
    */
    receive(msg: NewPositionIdMessage) {

        self.onlyUserPosition(msg.user);
        self.lastPositionId = self.lastPositionId + 1;

        let init: StateInit = initOf PositionAddressContract(self.lastPositionId);
        let positionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: positionAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: SetPositionAddressMessage{
                user: msg.user,
                position: sender()
            }.toCell(),
            code: init.code,
            data: init.data
        });
        
    }

    /*  
        message came from gateKeeper
        call userPosition.withdrawStable
    */
    receive(msg: WithdrawStablecoinMessage) {

        require(sender() == self.gateKeeperAddress, "not from gateKeeper");

        send(SendParameters{
            to: self._userPositionAddress(msg.user), 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });

    }

    /*  
        message came from userPosition
        call gateKeeper.increaseTotalStable(amount)
    */
    receive(msg: IncreaseTotalStableMessage) {

        self.onlyUserPosition(msg.user);

        send(SendParameters{
            to: self.gateKeeperAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });


    }

    /*  
        message came from gateKeeper
        call userPosition.repayStable()
    */
    receive(msg: RepayStablecoinMessage) {
        require(sender() == self.gateKeeperAddress, "not from gateKeeper");

        send(SendParameters{
            to: self._userPositionAddress(msg.user), 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });

    }

    /*  
        message came from userPosition
        call gateKeeper.decreaseTotalStable
    */
    receive(msg: DecreaseTotalStableMessage) {

        self.onlyUserPosition(msg.user);

        send(SendParameters{
            to: self.gateKeeperAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });
    }

    /*  
        message came from gateKeeper
        call userPosition.withdrawCollateral
    */
    receive(msg: WithdrawCollateralMessage) {
        require(sender() == self.gateKeeperAddress, "not from gateKeeper");

        send(SendParameters{
            to: self._userPositionAddress(msg.user), 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });

    }

    /*  
        message came from userPosition
        call gateKeeper.doWithdrawCollateral(DoWithdrawCollateralMessage)
    */
    receive(msg: DoWithdrawCollateralMessage) {

        self.onlyUserPosition(msg.user);

        send(SendParameters{
            to: self.gateKeeperAddress, 
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });
    }

    fun onlyUserPosition(user: Address) {
        // todo enable next line
        // nativeThrowUnless(132, self._userPositionAddress(user) == sender());
    }

    fun _userPositionAddress(user: Address): Address {
        let init: StateInit = initOf UserPositionContract(user, self.stablecoinMasterAddress, myAddress());
        return contractAddress(init);
    }

    get fun lastPositionId(): Int {
        return self.lastPositionId;
    }

    get fun userPositionAddress(user: Address): Address {
        return self._userPositionAddress(user);
    }

    // todo add test
    get fun userPositionAddressById(id: Int): Address {
        let init: StateInit = initOf PositionAddressContract(id);
        return contractAddress(init);
    }

}

// this contract stores positionaddress by position id
// for liquidators mostly

contract PositionAddressContract with Deployable {
   
    id: Int as uint32;
    positionAddress: Address;
    positionsManagerAddress: Address;

    init(id: Int) {
        self.id = id; 
        self.positionAddress = newAddress(0, 0);
        self.positionsManagerAddress = sender();
    }

    /*
        message came from userPosition
        set position address
        now we can determine this contract address by positionId 
        and get positionAddress by getter
    */
    receive(msg: SetPositionAddressMessage) {

        // todo enable access check below
        require(sender() == self.positionsManagerAddress, "Invalid sender");

        require(self.positionAddress == newAddress(0,0), "Already set");
        self.positionAddress = msg.position; //msg.positionAddress;

        dump("pay excess");
        // pay excess to user
        send(SendParameters{
            to: msg.user,
            bounce: false,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun getPositionAddress(): Address {
        return self.positionAddress;
    }

    
}