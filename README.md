# Stableton dorahack hackatonx project

This project has ready to use TACT compiler, typescript + jest with [ton-emulator](https://github.com/ton-community/ton-emulator), example how to do tests.

```bash
yarn test # To test contract
yarn build # To build contract
yarn test --testPathPattern .integration.  --updateSnapshot # To run integration test
```

## Licence

MIT

## Contracts deployed

StablecoinMaster EQBB1pLrZ7joVC8OYGF4_b2O-33MVa2uemI0LFarD2MRrfN8

PositionsManager EQDGTxG-VaiAq5YGHuf8nASYU8_AiOm4k6Wvv23YxzrGn--k

GateKeeper EQArRm3cFDU5K4XiU067vMKEleHF6mHhfEI8uk8dHlCiR1GY

## How it works

Stableton mechanics is adapted version of time-tested MakerDao's DAI.

Due to the lack of time and human power, we've simplified key concepts to fit hackaton deadline.

### Key differences

1. Single collateral. This is what DAI begun from, known as SAI.
2. Single position per user. E.g. you can not open few positions yet.
3. Collateral ratio = Liquidation ratio (120% at the moment). It means that you can borrow $100 in stablecoins, if you have at least $120 of Ton deposited as collateral. But this is very dangerous, because if Ton price drops a little, your position became unhealty and will be liquidated. So it's much better to have some more healthy debt/collateral ratio.
4. Due to the lack of decentralized oracles in Ton ecosystem, we use our centralized oracle, hence we get Ton price from few sources and submit it ourselves.
5. Liquidation is instant and covers full position. Anybody who has enough stablecoins, can call liquidation of unhealthy position, get stables paid (burned) and get collateral from this position.

### Architecture. Contracts.

#### UserPosition

Stores state of user position

-   debt
-   collateral

Calculates if position healthy, allowing or denying deposits/withdrawals of collateral and mint/burn of stables.

This contract, similar to Jetton architecture, are deployed for each user personally. Hence, we have scalable unlimited positions in the system available.

Also stores system messages, related to what's going on when user do some actions.

#### PositionsManager

Deploys new user positions contracts.
Works as proxy between GateKeeper and positions.
Know how to calculate user position contract address by user address.

Also deploys PositionAddress contracts, additional to user positions. These contracts goal is to store user position address by incremented lastPositionId of PositionsManager.

Hence, external actors, such as liquidators, can read lastPositionId (or total positions in system), get PositionAddress contract by position id, and read user position address from PositionAddress.

This is how we solved the problem of storage infinite "arrays" of userAddress/PositionAddress values.

#### GateKeeper

GateKeeper is main entry point for external actors (users, liquidators, admins).

Main methods of GateKeeper:

-   Users
    -   Deposit collateral
    -   Borrow stablecoin
    -   Pay stables back
    -   Withdraw collateral
-   Liquidators
    -   Liquidate position
-   Admins
    -   Set system settings
    -   Update ton price
    -   Update contract dependencies
    -   Collect fees and update accumulated debt

GateKeeper stores main settings, used for calculation of positions health:

-   Ton price
-   Liquidation ratio
-   Accumulated debt

All this data "attached" to the internal system messages and GateKeeper is central source of truth for the system.

#### Stablecoin

Stablecoin is augmented version of Jetton.
It has additional methods, related to burn/mint stables for user and fees for system stakeholders.
