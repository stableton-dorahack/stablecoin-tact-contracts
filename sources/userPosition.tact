import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";


struct PositionState {
    collateral: Int as coins;
    debt: Int as uint64;
}


contract UserPositionContract with Deployable, Ownable {

    owner: Address;
    user: Address; // who owns this position
    stablecoinMasterAddress: Address;
    positionsManagerAddress: Address;
    positionId: Int as uint32 = 0;
    collateral: Int as coins = 0;
    debt: Int as uint64 = 0;


    init(user: Address) {
        let ctx: Context = context();
        self.owner = ctx.sender;

        self.user = user; 
        self.stablecoinMasterAddress = newAddress(0, 0);
        self.positionsManagerAddress = newAddress(0, 0);
        // todo call positionsManager.newPositionId(user)
        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: NewPositionIdMessage{
                user: user
            }.toCell()
        });
    }

    // owner setters

    receive(msg: SetUserPositionDependecyMessage) {
        self.requireOwner();
        self.stablecoinMasterAddress = msg.stablecoinMasterAddress;
        self.positionsManagerAddress = msg.positionsManagerAddress;
    }


    /*
        message came from positionsManager
        check if position healthy
        add collateral
    */
    receive(msg: DepositCollateralMessage) {
        let ctx: Context = context();
        require(ctx.sender == self.positionsManagerAddress, "not from positionsManager");

        // todo check if position healthy

        self.collateral = self.collateral + msg.amount;
    }

    /*
        message came from positionsManager
        check if positionId is not set
        set positionId
        register positionId:address in positionAddress.setPositionAddress
    */
    receive(msg: SetPositionIdMessage) {

        let ctx: Context = context();
        require(ctx.sender == self.positionsManagerAddress, "not from positionsManager");

        self.positionId = msg.positionId; 

        let init: StateInit = initOf PositionAddressContract(self.positionId, self.positionsManagerAddress);
        let positionAddress: Address = contractAddress(init);

        // later - need maybe send amount to separate contract with payseparategas

        send(SendParameters{
            to: positionAddress, 
            value: ton("0.5"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: SetPositionAddressMessage{
                user: msg.user,
                position: myAddress()
            }.toCell(),
            code: init.code,
            data: init.data
        });
        
    }

    /*
        message came from positionsManager
        check if position healthy after withdraw
        if not - sent userStatus.message('can not withdraw stablecoin: position is not healthy')
        if healthy - make withdrawal of stablecoin
        call positionsManager.increaseTotalStablecoin
        add position debt
        call stablecoinMaster.mint(user, amount)
    */
    receive(msg: WithdrawStablecoinMessage) {
        let ctx: Context = context();
        require(ctx.sender == self.positionsManagerAddress, "not from positionsManager");

        // todo check if position healthy



        // todo calculate from debtShare
        let amountToMint: Int = msg.amount; 
        
        send(SendParameters{
            to: self.stablecoinMasterAddress, 
            value: ton("0.5"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: MintMessage{
                user: msg.user,
                amount: amountToMint
            }.toCell()
        });

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.4"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: IncreaseTotalStableMessage{
                user: msg.user,
                amount: amountToMint
            }.toCell()
        });

        self.debt = self.debt + msg.amount;
      
    }

    /*
        message came from positionsManager
        check if position debt GE than amount paid back
            call stablecoinMaster.burn(user, amount, fees)
        if position debt less than amount paid back
            calculate position debt and pay it only
            call stablecoinMaster.burn(user, amount, fees)
        send userStatus.message('stable repaid')
    */
    receive(msg: RepayStablecoinMessage) {

        let ctx: Context = context();
        require(ctx.sender == self.positionsManagerAddress, "not from positionsManager");

        require(self.debt >= msg.amount, "debt less than repay amount");

        // todo calculate from debtShare
        let amountToBurn: Int = msg.amount; 

        send(SendParameters{
            to: self.stablecoinMasterAddress, 
            value: ton("0.5"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: BurnMessage{
                user: msg.user,
                amount: amountToBurn, 
                fees: 1 // todo calculate fees 
            }.toCell()
        });

    }

    /*
        message came from stablecoinMaster
        call positionsManager.decreaseTotalStable(burnedAmount, fees)
        decrease position debt
    */
    receive(msg: StablecoinBurnedMessage) {
        let ctx: Context = context();
        require(ctx.sender == self.stablecoinMasterAddress, "not from stablecoin master");

        // require(self.debt >= msg.amount, "debt less than repay amount");


        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.4"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: DecreaseTotalStableMessage{
                user: msg.user,
                amount: msg.amount, 
                fees: msg.fees
            }.toCell()
        });

        self.debt = self.debt - msg.amount;
        
    }

    /*
        message came from positionsManager
        check if amount to withdraw <= position collateral
        if not - bounce??
        check if position remains healthy after withdrawal
        if not - userStatus.message('can not withdraw this amount of ton')
        if ok
            decrease position collateral by amount
            positionsManager.doWithdrawCollateral(user, amount)
    */
    receive(msg: WithdrawCollateralMessage) {

        let ctx: Context = context();
        require(ctx.sender == self.positionsManagerAddress, "not from positions manager");

        require(msg.amount <= self.collateral, "withdrawal amount more than position has");

        // todo calculate health

        self.collateral = self.collateral - msg.amount;

        send(SendParameters{
            to: self.positionsManagerAddress, 
            value: ton("0.1"),
            mode: SendIgnoreErrors, 
            bounce: true,
            body: DoWithdrawCollateralMessage{
                user: msg.user,
                amount: msg.amount
            }.toCell()
        });
        
    }
   

    get fun getPositionUser(): Address {
        return self.user;
    }

    get fun getPositionId(): Int {
        return self.positionId;
    }

    get fun getPositionState(): PositionState  {
        return PositionState{
            collateral: self.collateral,
            debt: self.debt
        };
    }
    
}

contract PositionAddressContract with Deployable {
   
    id: Int as uint32;
    positionAddress: Address;
    positionsManagerAddress: Address;

    init(id: Int, positionsManagerAddress: Address) {
        self.id = id; 
        self.positionAddress = newAddress(0, 0);
        self.positionsManagerAddress = positionsManagerAddress;
    }

    /*
        message came from userPosition
        set position address
        now we can determine this contract address by positionId 
        and get positionAddress by getter
    */
    receive(msg: SetPositionAddressMessage) {
        let ctx: Context = context();

        // todo enable access check below
        // let init: StateInit = initOf UserPositionContract(user, self.positionsManagerAddress);
        // require(contractAddress(init) == ctx.sender, "Invalid sender");

        require(self.positionAddress == newAddress(0,0), "Already set");
        self.positionAddress = msg.position; //msg.positionAddress;
    }



    get fun getPositionId(): Int {
        return self.id;
    }

    get fun getPositionAddress(): Address {
        return self.positionAddress;
    }
    
}