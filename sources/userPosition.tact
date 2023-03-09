import "@stdlib/deploy";
import "./messages";

struct PositionState {
    collateral: Int as coins;
    debt: Int as uint64;
}


message StablecoinBurnedMessage {
    user: Address;
    amount: Int as uint64;
    fees: Int as uint64;
}

contract UserPositionContract with Deployable {

    user: Address; // who owns this position
    stablecoinMasterAddress: Address;
    positionId: Int as uint8 = 0;
    collateral: Int as coins = 0;
    debt: Int as uint64 = 0;


    init(user: Address) {
        self.user = user; 
        self.stablecoinMasterAddress = newAddress(0, 0);
        // todo call positionsManager.newPositionId(user)
    }


    /*
        message came from positionsManager
        check if position healthy
        add collateral
    */
    receive(msg: DepositCollateralMessage) {
        
    }

    /*
        message came from positionsManager
        check if positionId is not set
        set positionId
        register positionId:address in positionAddress.setPositionAddress
    */
    receive(msg: SetPositionIdMessage) {
        if (self.positionId != 0) {
            self.positionId = msg.positionId; 
        }
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
        
    }

    /*
        message came from stablecoinMaster
        call positionsManager.decreaseTotalStable(burnedAmount, fees)
        decrease position debt
    */
    receive(msg: StablecoinBurnedMessage) {
        
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
        
    }
   

    get fun getPositionUser(): Address {
        return self.user;
    }

    get fun getPositionState(): PositionState  {
        return PositionState{
            collateral: self.collateral,
            debt: self.debt
        };
    }
    
}