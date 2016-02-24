var gameState = {
    init: function (extra) {
        this.extra = extra;
    },

    create: function () {
        game.stage.backgroundColor = '#8fc15a';

        this.bg = game.add.graphics(0, 0);

        this.fgGrp = addGroup(dims);

        this.fg = game.add.graphics(0, 0);
        this.fgGrp.add(this.fg);

        var t = game.add.text(dims.game.inner.width/2, 100, 'MAIN', {
            font: '50px Arial',
            fill: '#ffffff'
        }, this.fgGrp);
        t.anchor.setTo(0.5);

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

        drawBoundBox(dims);
    },

    x: 0,

    update: function () {
        INTERSTITIAL.update();

        this.fg.clear();

        this.fg.beginFill(0xffffff);
        this.fg.drawCircle(
            dims.game.inner.width/2+25*Math.sin(this.x*Math.PI*2),
            dims.game.inner.height*3/4+25*Math.cos(this.x*Math.PI*2),
            10
        );
        var y = this.x-0.5;
        if (y < 0) {
            y += 1;
        }
        this.fg.drawCircle(
            dims.game.inner.width/2+25*Math.sin(y*Math.PI*2),
            dims.game.inner.height*3/4+25*Math.cos(y*Math.PI*2),
            10
        );
        this.fg.endFill();

        this.x -= 0.02;
        if (this.x < 0) {
            this.x += 1;
        }
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
