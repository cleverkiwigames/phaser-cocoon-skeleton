var DEBUGGING = true;

// Abstracted from http://stackoverflow.com/a/17243070/497142
function hsvToRgb(hsv) {
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Abstracted from http://stackoverflow.com/a/17243070/497142
function rgbToHsv(rgb) {
    var r = rgb.r, g = rgb.g, b = rgb.b;
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {h: h, s: s, v: v};
}

function rgbToInt(rgb) {
    return rgb.r * 65536 + rgb.g * 256 + rgb.b;
}

function intToRgb(x) {
    return {
        r: (x & 0xff0000) >> 0x10,
        g: (x & 0x00ff00) >> 0x08,
        b: (x & 0x0000ff) >> 0x00,
    };
}

function inArray(x, xs) {
    for (var i = 0; i < xs.length; i++) {
        if (xs[i] === x) {
            return true;
        }
    }
    return false;
}

var COLOURS = [
    0xe2c987,
    0x49623d,
    0xfef6e3,
    0x002c25,
    0x191615
];

var COL_BG = 0;
var COL_TEXT = 1;
var COL_PRIM = 2;
var COL_SEC = 3;

var DIFF = 0.1;
for (var i = 0; i < COLOURS.length; i++) {
    var hsv = rgbToHsv(intToRgb(COLOURS[i]));
    var mod = function(v) {
        return rgbToInt(hsvToRgb({
            h: hsv.h,
            s: hsv.s,
            v: v >= 0 ? Math.min(hsv.v + v, 1) : Math.max(hsv.v + v, 0)
        }));
    }
    COLOURS[i] = {
        light: mod(DIFF),
        plain: COLOURS[i],
        dark: mod(-DIFF)
    };
}

// TODO What if bitmap text?
function addText(x, y, text, size, colour) {
    var t = game.add.text(x, y, text, {
        font: size + 'px Arial',
        fill: colour || COL_TEXT
    });
    t.anchor.setTo(0.5, 0.5);
    t.setShadow(0, 2, 'rgba(255,252,243,1)', 3);
    return t;
}

function saveProgress(p) {
    window.localStorage.setItem('progress', JSON.stringify(p));
}

function loadProgress() {
    var progress = window.localStorage.getItem('progress');
    if (progress === null) {
        return {unlockedModes: [0], completedModes: [], completedLevels: [[0, 2, 5], [], []]};
    }
    return JSON.parse(progress);
}

function startState(state, extra) {
    game.state.start(state, true, false, extra);
}

function drawBoundBox() {
    if (DEBUGGING) {
        var border = game.add.graphics(GAME_HPAD/2, GAME_VPAD/2);
        border.lineStyle(10, 0, 10);
        border.drawRect(0, 0, GAME_INNER_WIDTH, GAME_INNER_HEIGHT);
        border.endFill();
        game.world.bringToTop(border);
    }
}

function addGroup() {
    var g = game.add.group();
    g.x = GAME_HPAD/2;
    g.y = GAME_VPAD/2;
    return g;
}