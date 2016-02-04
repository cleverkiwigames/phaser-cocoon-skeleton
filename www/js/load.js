var loadState = {
    audioFiles: [
    ],

    init: function () {
        // We wait until both our audio has loaded and the device is ready
        // before we go to the main menu.
        this.count = 0;
    },

    preload: function () {
        game.stage.backgroundColor = '#8fc15a';
        game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
            .anchor.setTo(0.5);

        [
        ].forEach(function (name) {
            game.load.image(name, 'images/sprites' + name + '.png');
        });

        [
        ].forEach(function (name) {
            game.load.bitmapFont(name, 'fonts/'+name+'.png', 'fonts/'+name+'.fnt');
        });

        [
        ].forEach(function (name) {
            game.load.bitmapFont(name, 'fonts/'+name+'.png', 'fonts/'+name+'.fnt');
        });

        this.audioFiles.forEach(function (name) {
            game.load.audio(name, 'audio/'+name+'.wav');
        });

        drawBoundBox();
    },

    create: function () {
        var toDecode = [];

        this.audio = {};
        this.audioFiles.forEach(function (name) {
            audio[name] = game.add.audio(name);
            toDecode.push(toDecode);
        });

        game.sound.setDecodedCallback(toDecode, this.start, this);
    },

    start: function () {
        if (++this.count == 1) {
            startState('game', {audio: this.audio, progress: loadProgress()});
        }
    }
};
