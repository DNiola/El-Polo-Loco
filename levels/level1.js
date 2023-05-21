
// ich weiß nicht genau warum ich dieses leere Array übergeben muss, aber wenn ich es nicht mache, dann kommt ein Fehler.
const level1 = new Level(createBlankArray(), createLevelClouds(), createLevelBackgrounds())


function createBlankArray() {
    return []
}


function createLevelClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
}


function createLevelBackgrounds() {
    return [
        new BackgroundObject("img/5_background/layers/air.png", -719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

        new BackgroundObject("img/5_background/layers/air.png", 719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),

        new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

        new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),

    ]
}


