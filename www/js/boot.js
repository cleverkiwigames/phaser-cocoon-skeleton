var bootState = {
    init: function() {
        GAME.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        GAME.scale.pageAlignHorizontally = true;
        GAME.scale.pageAlignVertically = true;
        GAME.scale.setResizeCallback(onResize);

        GAME.scale.setUserScale(DIMS.ratio, DIMS.ratio, 0, 0);
        GAME.scale.refresh();
        GAME.scale.setGameSize(DIMS.game.outer.width, DIMS.game.outer.height);

        GAME.forceSingleUpdate = true;
    },

    preload: function () {
        GAME.load.image('logo', 'images/logo.png');
    },

    create: function () {
        GAME.state.start('load');
    }
};

function onResize() {
    var scrnDim = {width: window.innerWidth, height: window.innerHeight};
    if (DIV) {
        scrnDim = {width: DIV.clientWidth, height: DIV.clientHeight};
    }
    scrnDim.adHeight = AD_HEIGHT;

    if (scrnDim.width === DIMS.screen.width
            && scrnDim.height === DIMS.screen.height
            && scrnDim.adHeight === DIMS.screen.adHeight) {
        return;
    }

    DIMS = scale(DIMS.game.inner, scrnDim);

    GAME.scale.setUserScale(DIMS.ratio, DIMS.ratio, 0, 0);
    GAME.scale.setGameSize(DIMS.game.outer.width, DIMS.game.outer.height);
    GAME.scale.refresh();

    var state = GAME.state.getCurrentState();
    if (state.onResize) {
        state.onResize.call(state, DIMS.game.inner.left, DIMS.game.inner.top);
    }
}
