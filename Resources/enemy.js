(function() {
    App.enemy = {};
    App.enemy.EnemyProperties = [{
        image : 'images/wasabi.png',
        width : 29,
        height : 29,
        frame : 1,
        speed : 50,
        penalty : 5,
        etype : 2
    }, {
        image : 'images/ebi.png',
        width : 63,
        height : 38,
        frame : 1,
        speed : 100,
        penalty : 0,
        etype : 1
    }, {
        image : 'images/ika.png',
        width : 53,
        height : 40,
        frame : 1,
        speed : 80,
        penalty : 0,
        etype : 5
    }, {
        image : 'images/ikura.png',
        width : 53,
        height : 58,
        frame : 1,
        speed : 120,
        penalty : 0,
        etype : 6
    }
    /*, {
     image : 'images/tamago.png',
     width : 58,
     height : 45,
     frame : 1,
     speed : 70,
     penalty : 0,
     etype : 3
     }, {
     image : 'images/kappa.png',
     width : 44,
     height : 53,
     frame : 1,
     speed : 60,
     penalty : 0,
     etype : 4
     }*/];
    App.enemy.wasabiRatio = 10;
    App.enemy.createEnemy = function(index, enemyType) {
        if(enemyType == -1) {
            enemyType = parseInt(Math.random() * App.enemy.EnemyProperties.length) % App.enemy.EnemyProperties.length;
            if(enemyType == 0) {
                enemyType = parseInt(Math.random() * App.enemy.EnemyProperties.length) % App.enemy.EnemyProperties.length;
            }
        }
        var enemy = {};
        enemy.s = quicktigame2d.createSprite(App.enemy.EnemyProperties[enemyType]);
        enemy.s.y = (Math.random() * (game.screen.height * 0.5));
        enemy.s.index = index;
        enemy.s.hide();
        enemy.t = quicktigame2d.createTransform();
        enemy.t.addEventListener('complete', function(e) {
            var sound = Ti.Media.createSound({
                url : './sound/toss.mp3'
            });
            sound.play();
            if(enemy.s.penalty == 0) {
                remain -= 500;
            }
            enemy.s.clearTransforms();
            enemy.s.hide();
            enemy.forRemove = true;
            sceneGame.remove(enemy.s);
        });
        enemy.t.index = index;
        enemy.ready = true;
        return enemy;
    };
})();
