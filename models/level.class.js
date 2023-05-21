class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    speed;
    level_end_x = 2800

    constructor(enemies, clouds, backgroundObjects, coins, bottles, ) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    initLevel() {
        
        this.enemies = [
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
        ];

        this.coins = [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ];

        this.bottles = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ];
    }


}

  