(function() {
    sceneScore.add(quicktigame2d.createSprite({
        image : 'images/SushiAttackScore.png',
        width : 320,
        height : 480,
        x : 0,
        y : 0
    }));
    sceneScore.addEventListener('activated', function(e) {
        scoreLabel.visible = false;
        remainLabel.visible = false;
        comboLabel.visible = false;
        setTimeout(function() {
            finishScoreLabel.text = "";
            finishScoreLabel.visible = true;
            finishScoreLabel.text = score;
        }, 150);
    });
    sceneScore.addEventListener('deactivated', function(e) {
        bgmScore.stop();
        finishScoreLabel.visible = false;
    });
    App.score = {};
    App.score.onTouchStart = function(e){
        bgmTitle.play();
        bgmScore.stop();
        game.replaceScene(sceneTitle);
        game.startCurrentScene();
        sceneIndex = 0;
    };
})();
