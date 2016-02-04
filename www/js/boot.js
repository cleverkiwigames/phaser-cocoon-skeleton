var bootState = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    },

    preload: function () {
        game.load.image('logo', 'images/logo.png');
    },

    create: function () {
        game.state.start('load');
    }
};
