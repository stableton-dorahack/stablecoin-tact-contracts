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

        todo later
        deploy userStatus contract  (if needed)
        and send userStatus.message('adding collateral')
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
        send lastPositionId back to userPosition.setPositionId
    */
    receive(msg: NewPositionIdMessage) {

        self.lastPositionId = self.lastPositionId + 1;

        let ctx: Context = context();

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        // todo check if message from userPosition

        send(SendParameters{
            to: ctx.sender, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: SetPositionIdMessage{
                positionId: self.lastPositionId,
                user: msg.user
            }.toCell()
        });

    }

    /*  
        message came from gateKeeper
        call userPosition.withdrawStable
    */
    receive(msg: WithdrawStablecoinMessage) {

        let ctx: Context = context();
        require(ctx.sender == self.gateKeeperAddress, "not from gateKeeper");

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: userPositionAddress, 
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

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);
        // todo check if message from userPosition
        // require(sender() == userPositionAddress, "invalid sender");

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

        let ctx: Context = context();
        require(ctx.sender == self.gateKeeperAddress, "not from gateKeeper");

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: userPositionAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });

    }

    /*  
        message came from userPosition
        call gateKeeper.decreaseTotalStable
    */
    receive(msg: DecreaseTotalStableMessage) {

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        // todo check if message from userPosition

        send(SendParameters{
            to: self.gateKeeperAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });
    }

    /*  
        message came from gateKeeper
        call userPosition.withdrawCollateral
    */
    receive(msg: WithdrawCollateralMessage) {

        let ctx: Context = context();
        require(ctx.sender == self.gateKeeperAddress, "not from gateKeeper");

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        send(SendParameters{
            to: userPositionAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });

    }

    /*  
        message came from userPosition
        call gateKeeper.doWithdrawCollateral(DoWithdrawCollateralMessage)
    */
    receive(msg: DoWithdrawCollateralMessage) {

        let init: StateInit = initOf UserPositionContract(msg.user, self.stablecoinMasterAddress, myAddress());
        let userPositionAddress: Address = contractAddress(init);

        // todo check if message from userPosition

        send(SendParameters{
            to: self.gateKeeperAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: msg.toCell()
        });


    }
   

    get fun lastPositionId(): Int {
        return self.lastPositionId;
    }

    get fun balance(): Int {
        return myBalance();
    }

}