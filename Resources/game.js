(function() {
    sceneGame.addEventListener('activated', function(e) {
        initGameValues();
        App.game.updateScore();
        scoreLabel.visible = true;
        remainLabel.visible = true;
        comboLabel.visible = true;
        App.game.isRushMode = false;

        initMyShip();

        sceneGame.add(myship);
        
        createEnemies();

        cutinStart.x = 0;
        cutinRushTime.x = -320;
        sceneGame.add(cutinStart);
        cutinStart.show();

        setTimeout(function() {
            var transform = quicktigame2d.createTransform();
            transform.duration = 800;
            transform.easing = quicktigame2d.ANIMATION_CURVE_QUINT_IN_OUT;
            transform.delay = 1000;
            transform.move(320, 80);
            setTimeout(function() {
                sceneGame.remove(cutinStart);
            }, 1500);
            cutinStart.transform(transform);


            App.game.interval = setInterval(App.game.onInterval, 100);
        }, 1000);
    });
    sceneGame.addEventListener('deactivated', function(e) {
        sceneGame.remove(myship);
        enemyList.forEach(function(enemy) {
            sceneGame.remove(enemy.s);
        });
        enemyList = [];
    });

    App.game = {};

    //for swipe Ditection
    App.game.touchZ = 0;
    App.game.touchX = 0;
    App.game.touchY = 0;
    App.game.isRushMode = false;

    // Game Main Loop
    App.game.onInterval = function(e) {
        if(remain > 0) {
            // RushMode ditection
            if(App.game.isRushMode == false && remain < 20000) {
                App.game.isRushMode = true;

                sceneGame.add(cutinRushTime);
                var transform = quicktigame2d.createTransform();
                transform.duration = 500;
                transform.easing = quicktigame2d.ANIMATION_CURVE_QUINT_IN_OUT;
                transform.move(0, 80);
                setTimeout(function() {
                    cutinRushTime.clearTransforms();
                    transform.delay = 150;
                    transform.move(320, 80);
                    setTimeout(function() {
                        sceneGame.remove(cutinRushTime);
                    }, 1000);
                    cutinRushTime.transform(transform);
                }, 500);
                cutinRushTime.transform(transform);

                bgmGame2.play();
                bgmGame1.stop();
            }
            App.game.checkEnemies();
            App.game.updateScore();
            var limiter = MAX_ENEMIES;
            if(App.game.isRushMode) {
                limiter = MAX_ENEMIES * 1.5 + karma;
            }
            if(enemyList.length < limiter) {
                createEnemy();
                if(App.game.isRushMode) {
                    createEnemy();
                    createEnemy();
                }
            }
        } else {
            App.game.updateScore();
            clearInterval(App.game.interval);
            setTimeout(function() {
                bgmScore.play();
                bgmGame1.stop();
                bgmGame2.stop();
                game.replaceScene(sceneScore);
                game.startCurrentScene();
                sceneIndex = 2;
            }, 3000);
        }
    };
    App.game.updateScore = function() {
        scoreLabel.text = score;
        var x = '' + (remain / 1000);
        if(remain < 0) {
            x = '0.0';
        }
        if(x.indexOf('.') < 0) {
            x += '.0';
        }
        remainLabel.text = x;
        if(comboCount > 1) {
            comboLabel.text = comboCount + "combos!!";
        } else {
            comboLabel.text = "";
        }
        score += 10;
        remain -= 100;
    };
    App.game.checkEnemies = function() {
        checkEnemies();
    };
    App.game.onTouchStart = function(e) {
        App.game.touchZ = false;
        if(e.y > (myship.y - myship.height)) {
            myship.clearTransform(myshipMover);

            myshipMover.x = e.x * touchScale;
            myshipMover.easing = quicktigame2d.ANIMATION_CURVE_CUBIC_OUT;

            var distanceX = myship.x - myshipMover.x;
            var distanceY = 5;
            //myship.y - myshipMover.y;

            var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            myshipMover.duration = distance / 50 * 200;

            myship.frame = myship.x > myshipMover.x ? 0 : 4;
            myship.transform(myshipMover);
        } else {
            App.game.touchZ = true;
            App.game.touchX = e.x;
            App.game.touchY = e.y;
        }
    };

    App.game.onTouchEnd = function(e) {
        if(!App.game.touchZ) {
            return;
        }
        // upside swipe
        if(Math.abs(App.game.touchX - e.x) < 50 && (App.game.touchY - e.y) > 30) {
            enemyList.forEach(function(enemy, index) {
                if(enemy.ready) {
                    return;
                }
                if(enemy.s.contains(App.game.touchX, App.game.touchY)) {
                    var soundP = Ti.Media.createSound({
                        url : './sound/toss.mp3'
                    });
                    soundP.play();

                    var transform = quicktigame2d.createTransform();
                    transform.duration = 1000;
                    transform.scale(0.5, 0.5);
                    transform.move(enemy.s.x, 0);
                    transform.autoreverse = true;
                    setTimeout(function() {
                        enemy.s.speed += 100;
                        enemy.s.ready = true;
                        enemy.s.transform(enemy.t);
                    }, 1000);
                    enemy.s.clearTransforms();
                    enemy.s.transform(transform);
                    karma++;
                }
            });
        }
        // side swipe
        else if(Math.abs(App.game.touchY - e.y) < 50 && Math.abs(App.game.touchX - e.x) > 30) {
            enemyList.forEach(function(enemy, index) {
                if(enemy.ready) {
                    return;
                }
                if(enemy.s.contains(App.game.touchX, App.game.touchY)) {
                    var soundP = Ti.Media.createSound({
                        url : './sound/toss.mp3'
                    });
                    soundP.play();

                    var transform = quicktigame2d.createTransform();
                    transform.duration = 500;
                    transform.move(-enemy.s.width, enemy.s.y);
                    transform.autoreverse = false;
                    enemy.s.clearTransforms();
                    setTimeout(function() {
                        enemy.s.hide();
                        enemy.forRemove = true;
                        sceneGame.remove(enemy.s);
                        karma++;
                        karma++;
                    }, 500);
                    enemy.s.transform(transform);
                }
            });
        }
    };
})();

var cutinStart = quicktigame2d.createSprite({
    image : 'images/SushiAttackCutinStart_001.png',
    width : 320,
    height : 120,
    x : 0,
    y : 80,
    z : 100
});
var cutinRushTime = quicktigame2d.createSprite({
    image : 'images/SushiAttackCutinRushTime_001.png',
    width : 320,
    height : 120,
    x : -320,
    y : 80,
    z : 100
});

var myship = quicktigame2d.createSprite({
    image : 'images/SushiAttackShip.png',
    width : 64,
    height : 64
});
var myshipMover = quicktigame2d.createTransform();

function initMyShip() {
    myship.x = (game.screen.width * 0.5) - (myship.width * 0.5);
    myship.y = game.screen.height - (myship.height + 8);
    myship.z = 1;
}

var MAX_ENEMIES = 10;
var enemyList = [];
var enemyID = -1;
var touchScale = 1;

function createEnemy() {
    enemyID++;
    var newEnemy = App.enemy.createEnemy(enemyID, -1);
    enemyList.push(newEnemy);
    sceneGame.add(newEnemy.s);
}

function createEnemies() {
    for(var i = 0; i < MAX_ENEMIES; i++) {
        createEnemy();
    }
}

function checkEnemies() {
    enemyList.forEach(function(enemy, index) {
        if(enemy.forRemove) {
            enemyList.splice(index, 1);
            return;
        }
        if(!enemy.ready) {
            if(enemy.s.collidesWith(myship)) {
                if(enemy.s.etype == lastEType) {
                    comboCount += 1;
                } else {
                    lastEType = enemy.s.etype;
                    comboCount = 1;
                }
                if(enemy.s.penalty > 0) {
                    var soundP = Ti.Media.createSound({
                        url : './sound/koko.mp3'
                    });
                    soundP.play();
                    remain -= 3000;
                } else {
                    var soundP = Ti.Media.createSound({
                        url : './sound/paku.mp3'
                    });
                    soundP.play();
                    score += (500 + 250 * (comboCount - 1));
                }
                enemy.s.clearTransforms();
                enemy.s.hide();
                enemy.forRemove = true;
                sceneGame.remove(enemy.s);
            }
            return;
        }
        enemy.s.x = enemy.s.width + (Math.random() * (game.screen.width - enemy.s.width));
        if(enemy.s.x < 0) {
            enemy.s.x = 0;
        } else if(enemy.s.x + enemy.s.width > game.screen.width) {
            enemy.s.x = (game.screen.width - enemy.s.width);
        }
        enemy.s.y = -enemy.s.height - (Math.random() * (game.screen.height * 0.5));
        enemy.s.z = myship.z + 1;
        enemy.ready = false;
        enemy.s.show();

        enemy.t.x = Math.random() > 0.4 ? enemy.s.x : (Math.random() > 0.5 ? 0 : (game.screen.width - enemy.s.width));
        enemy.t.y = game.screen.height;

        var distanceX = enemy.s.x - enemy.t.x;
        var distanceY = enemy.s.y - enemy.t.y;
        var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        enemy.t.duration = distance / enemy.s.speed * 1000;
        if(App.game.isRushMode) {
            enemy.t.duration /= 1.25;
        }
        enemy.s.transform(enemy.t);
    });
}