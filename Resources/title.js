(function() {
    var title = quicktigame2d.createSprite({
        image : 'images/SushiAttackTitle.png',
        width : 320,
        height : 480,
        x : 0,
        y : 0
    });
    sceneTitle.add(title);
    sceneTitle.addEventListener('activated', function(e) {
        bgmTitle.play();
        finishScoreLabel.visible = false;
        scoreLabel.visible = false;
        remainLabel.visible = false;
        comboLabel.visible = false;
    });
    App.title = {};
    App.title.onTouchStart = function(e) {
        bgmGame1.play();
        bgmTitle.stop();
        game.replaceScene(sceneGame);
        game.startCurrentScene();
        sceneIndex = 1;
    };
})();
