// sound resources... http://www.yen-soft.com/ssse/sound/hito.php
var App = {};
var quicktigame2d = require('com.googlecode.quicktigame2d');
var game = quicktigame2d.createGameView();
game.fps = 30;
game.color(0, 0, 0);
game.debug = false;

// Window and Labels...
Ti.include('ui.js');
// BGM
Ti.include('bgm.js');

// Game Values
var sceneIndex = 0;
var score = 0;
var karma = 0;
var remain = 60000;
var lastEType = -1;
var comboCount = 0;
var initGameValues = function() {
    score = 0;
    karma = 0;
    remain = 60000;
    lastEType = -1;
    comboCount = 0;
};

var sceneTitle = quicktigame2d.createScene();
var sceneGame = quicktigame2d.createScene();
var sceneScore = quicktigame2d.createScene();
Ti.include('title.js');
Ti.include('enemy.js');
Ti.include('game.js');
Ti.include('score.js');
game.pushScene(sceneTitle);

game.addEventListener('touchstart', function(e) {
    switch(sceneIndex) {
        case 0:
            App.title.onTouchStart(e);
            break;
        case 1:
            App.game.onTouchStart(e);
            break;
        case 2:
            App.score.onTouchStart(e);
            break;
        default:
            break;
    }
});
game.addEventListener('touchend', function(e) {
    if(sceneIndex == 1) {
        App.game.onTouchEnd(e);
    }
});

game.addEventListener('onload', function(e) {
    var sscale = game.height / 480;
    game.screen = {
        width : game.width / sscale,
        height : game.height / sscale
    };
    touchScale = game.screen.width / game.width;
    game.start();
});

// Add your game view
window.add(game);
Application_Run();
