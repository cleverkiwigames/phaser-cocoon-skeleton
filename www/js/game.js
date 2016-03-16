var gameState = {
    init: function (extra) {
        this.extra = extra;
    },

    create: function () {
        GAME.stage.backgroundColor = '#8fc15a';

        this.bg = GAME.add.graphics(0, 0);

        this.fgGrp = addGroup(DIMS);

        this.fg = GAME.add.graphics(0, 0);
        this.fgGrp.add(this.fg);

        var t = GAME.add.text(DIMS.game.inner.width/2, 100, 'MAIN', {
            font: '50px Arial',
            fill: '#ffffff'
        }, this.fgGrp);
        t.anchor.setTo(0.5);

        if (IS_MOBILE) {
            var rmAdsText = GAME.add.text(DIMS.game.inner.width/2, 775, 'REMOVE ADS', {
                font: '50px Arial',
                fill: '#ffffff'
            }, this.fgGrp);
            rmAdsText.anchor.setTo(0.5);
            rmAdsText.inputEnabled = true;
            rmAdsText.events.onInputDown.add(function () {
                API.ads.remove();
                rmAdsText.visible = false;
            }, this);

            var showAdText = GAME.add.text(DIMS.game.inner.width/2, 850, 'SHOW INTERSTITIAL', {
                font: '50px Arial',
                fill: '#ffffff'
            }, this.fgGrp);
            showAdText.anchor.setTo(0.5);
            showAdText.inputEnabled = true;
            showAdText.events.onInputDown.add(function () {
                API.interst.show();
            }, this);
        }

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

        this.x = 0;

        API.ads.init();
    },

    update: function () {
        API.ads.update();

        this.fg.clear();

        this.fg.beginFill(0xffffff);
        this.fg.drawCircle(
            DIMS.game.inner.width/2+25*Math.sin(this.x*Math.PI*2),
            DIMS.game.inner.height/2+25*Math.cos(this.x*Math.PI*2),
            10
        );
        var y = this.x-0.5;
        if (y < 0) {
            y += 1;
        }
        this.fg.drawCircle(
            DIMS.game.inner.width/2+25*Math.sin(y*Math.PI*2),
            DIMS.game.inner.height/2+25*Math.cos(y*Math.PI*2),
            10
        );
        this.fg.endFill();

        this.x -= 0.02;
        if (this.x < 0) {
            this.x += 1;
        }

        drawBoundBox(this.fg, DIMS);
    },

    paused: function () {
    },

    pauseUpdate: function () {
    },

    resumed: function () {
    },

    shutdown: function () {
    },

    onResize: function (left, top) {
        API.ads.refresh();
        this.fgGrp.x = left;
        this.fgGrp.y = top;
    }
};
