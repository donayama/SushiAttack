var window = Ti.UI.createWindow({
    backgroundColor : 'black'
});
var finishScoreLabel = Ti.UI.createLabel({
    text : '99999',
    color : '#000',
    font : {
        fontSize : 48
    },
    height : 40,
    width : 200,
    top : 36,
    left : 32,
    textAlign : 'right',
    visible : false    
});
var scoreLabel = Ti.UI.createLabel({
    text : '0',
    color : '#fff',
    font : {
        fontSize : 20,
        fontFamily : 'DBLCDTempBlack'
    },
    height : 40,
    width : 200,
    top : 0,
    left : 0,
    textAlign : 'right',
    visible : false
});
var remainLabel = Ti.UI.createLabel({
    text : '60.0',
    color : '#fff',
    font : {
        fontSize : 20,
        fontFamily : 'DBLCDTempBlack'
    },
    height : 40,
    width : 80,
    top : 0,
    left : 240,
    textAlign : 'right',
    visible : false
});
var comboLabel = Ti.UI.createLabel({
    text : '',
    color : '#ff0',
    font : {
        fontSize : 20
    },
    height : 40,
    width : 120,
    top : 40,
    left : 200,
    textAlign : 'right',
    visible : false
});

function Application_Run() {
    window.add(finishScoreLabel);
    window.add(scoreLabel);
    window.add(remainLabel);
    window.add(comboLabel);
    window.open({
        fullscreen : true,
        navBarHidden : true
    });
}
