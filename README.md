README
======

About
-----

This project skeleton contains a basic skeleton for state-based Phaser projects
and also includes some useful Cocoon.io integrations.

Features
--------

* Project is setup with standard Phaser states, as well as with a file for
  common functions.
* It includes a `Makefile` for zipping project which includes:
    * Bumping project version in `config.xml`.
    * Turning off debug mode when building `www.zip`.
* If the project is running on mobile then it waits assumes Cordova is running
  and waits for the `deviceready` event before entering the game state. This
  ensures that Cocoon plugins are loaded when the game starts.
* There is a script for scaling icons to their proper dimensions.
* Automatically scales Phaser to fullscreen without borders, and stores how much
  padding is between the screen and the "viewport" (main game area) in global
  variables.

Usage
-----

### Loading Assets

To add a sprite called `X`, create the file `www/images/sprites/X.png` and add
the string `'X'` to the appropriate section in `www/js/load.js`. Likewise for
bitmap fonts (`www/fonts/X.png` and `www/fonts/X.fnt` per bitmap font) and audio
(`audio/X.wav`). All audio will be decoded during startup, and so will be
available as soon as the game begins.

### Saving/Loading Progress

Use `saveProgress(x)` to save an object `x` to local storage. It is
automatically loaded to `this.extra.progress` in the `game` state when the game
is loaded.

### Using the Layout

This template automatically fills the screen with the game, without borders. The
globals `dims.game.inner.width` and `dims.game.inner.height` contain the
dimensions of your game, and are the width and height of an "inner" rectangle
that fills the screen either horizontally or vertically. In order to center this
rectangle, it is padded by `dims.game.pad.horz` and `dims.game.pad.vert`. The
dimensions of the screen, in relation to the game world, is defined by
`dims.game.outer.width` and `dims.game.outer.height`.

For example, we have a game with `dims.game.inner.width = 600` and
`dims.game.inner.height = 800`. The screen has width `1200` and height `2400` so
the game is scaled to the maximum horizontally, but not vertically - it has
`dims.game.pad.horz = 0` and `dims.game.pad.vert = 400` (that is, `400`
"in-game" pixels). The `dims.game.outer.width = 600` and `dims.game.outer.height
= 1200`.

In the `game` state, there is a `this.fgGrp` group - as long as you add your
assets to this group and keep them within `dims.game.inner.width` and
`dims.game.inner.height` of its origin then those assets will be centered and
fully visible within the screen. `this.bg` is a graphics layer that exists
behind `this.fgGrp` and can be used to define the background of the game, using
`dims.game.outer.width` and `dims.game.outer.height` as limits. Add
`drawBoundBox(dims)` to your state's `create` method to act as a guide.

### Using Interstitials

The `INTERSTITIAL` global can be used to make Cocoon interstitial ads a bit
easier to use - add `INTERSTITIAL.udpate()` to the start of the `update`
function of any state that will be showing an interstitial, and use
`INTERSTITIAL.show()` to show a new interstitial. This will give a fading effect
before the interstitial shows so that the ad doesn't pop up suddenly. It will
also automatically start loading the following ad.

### Building

The project uses `make` to build a `www.zip` of the `www` directory. Building
this will also bump the code version in `config.xml`, and turn off debug mode
(changes the `DEBUGGING` global to false).
