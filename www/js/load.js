var loadState = {
    audioFiles: [
    ],

    init: function () {
        // We wait until both our audio has loaded and the device is ready
        // before we go to the main menu.
        this.count = 0;
    },

    preload: function () {
        GAME.stage.backgroundColor = '#94c048';
        GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, 'logo')
            .anchor.setTo(0.5);

        [
        ].forEach(function (name) {
            GAME.load.image(name, 'images/sprites/' + name + '.png');
        });

        [
        ].forEach(function (name) {
            GAME.load.bitmapFont(name, 'fonts/'+name+'.png', 'fonts/'+name+'.fnt');
        });

        this.audioFiles.forEach(function (name) {
            GAME.load.audio(name, 'audio/'+name+'.wav');
        });
    },

    create: function () {
        var toDecode = [];

        this.audio = {};
        this.audioFiles.forEach(function (name) {
            audio[name] = GAME.add.audio(name);
            toDecode.push(toDecode);
        });

        GAME.sound.setDecodedCallback(toDecode, this.start, this);
    },

    start: function () {
        if (++this.count == 1) {
            startState('game', {audio: this.audio, progress: loadProgress()});
        }
    }
};
