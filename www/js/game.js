var gameState = {
    init: function (extra) {
        this.extra = extra;
    },

    create: function () {
        game.stage.backgroundColor = '#8fc15a';

        this.bg = game.add.graphics(0, 0);

        this.fgGrp = addGroup();

        this.fg = game.add.graphics();
        this.fgGrp.add(fg);

        var t = game.add.text(GAME_INNER_WIDTH/2, 100, 'HOME', {
            font: '50px Arial',
            fill: '#ffffff'
        });
        t.anchor.setTo(0.5, 0);
        this.fgGrp.add(t);

        // INTERSTITIAL.show();

        // socialLogin(function (res) {
        //     switch (res) {
        //     case LOGIN_SUCCES:
        //         break;
        //     case LOGIN_CANCEL:
        //         break;
        //     case LOGIN_ERROR:
        //         break;
        //     }
        // });

        drawBoundBox();
    },

    update: function () {
        INTERSTITIAL.update();
    },

    paused: function () {
    },

    pauseUpdate: function () {
    },

    resumed: function () {
    },

    shutdown: function () {
    },
};
