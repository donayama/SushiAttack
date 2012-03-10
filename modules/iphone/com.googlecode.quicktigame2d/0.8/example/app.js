var window = Ti.UI.createWindow({backgroundColor:'black'});

// Obtain game module
var quicktigame2d = require('com.googlecode.quicktigame2d');

// Create view for your game.
// Note that game.screen.width and height are not yet set until the game is loaded
var game = quicktigame2d.createGameView();

// Frame rate can be changed (fps can not be changed after the game is loaded)
game.fps = 30;

// set initial background color to black
game.color(0, 0, 0);

game.debug = true;

// Create game scene
var scene = quicktigame2d.createScene();

// create new 64x64 shape
var shape = quicktigame2d.createSprite({width:64, height:64});

// color(red, green, blue) takes values from 0 to 1
shape.color(1, 0, 0);

// add your shape to the scene
scene.add(shape);

// add your scene to game view
game.pushScene(scene);

// Onload event is called when the game is loaded.
// The game.screen.width and game.screen.height are not yet set until this onload event.
game.addEventListener('onload', function(e) {
    // Your game screen size is set here if you did not specifiy game width and height using screen property.
    // Note that Ti.UI.View returns non-retina values (320x480) as view size,
    // on the other hand the game screen property returns retina values (based on 640x960) on retina devices.
    Ti.API.info("view size: " + game.width + "x" + game.height);
    Ti.API.info("game screen size: " + game.screen.width + "x" + game.screen.height);
    
    // Move your shape to center of the screen
    shape.x = (game.screen.width  * 0.5) - (shape.width  * 0.5);
    shape.y = (game.screen.height * 0.25) - (shape.height * 0.5);
    
    // Start the game
    game.start();
});

/*
game.addEventListener('enterframe', function(e) {
	
    // Move your shape
    shape.x = shape.x + 2;
    
    // Rotate your shape
    shape.rotate(shape.angle + 6);
    
    // If the shape moves outside of the screen,
    // then the shape appears from the other side of the screen
    if (shape.x + shape.width > game.screen.width) {
        shape.x = -shape.width;
    }
});
*/

var transform = quicktigame2d.createTransform();

game.addEventListener('touchstart', function(e) {
                      transform.addEventListener('start', function(e) {
                                                 Ti.API.info("transform start");
                                                 });
                      transform.addEventListener('complete', function(e) {
                                                 Ti.API.info("transform complete");
                                                 });
                      transform.x = game.screen.width  - shape.width;
                      transform.y = game.screen.height - shape.height;
                      transform.duration = 1000;
                      transform.scale(1, 2);
                      
                      shape.transform(transform);
    /*
    // We should calculate the view scale because Ti.UI.View returns non-retina values.
    // This scale should be 2 on retina devices.
    var scale = game.screen.width  / game.width;
    
    // Move your shape to center of the event position
    shape.x = (e.x * scale) - (shape.width * 0.5);
    shape.y = (e.y * scale) - (shape.width * 0.5);
    */
});

// Add your game view
window.add(game);

var centerLabel = Titanium.UI.createLabel({
    color:'black',
    backgroundColor:'white',
    text:'touch screen to move rectangle',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto',
    height:'auto'
});

var debugjs_frameCount = 0;
var debugjs_now = +new Date();

game.debug = true;

//
// prints out fps(frame per second)
//
var debugjs_printfps = function(e) {
    
    debugjs_frameCount++;
    if (+new Date() - debugjs_now > 5000) {
        var debugjs_fps = debugjs_frameCount / 5.0;
        Ti.API.info(debugjs_fps + " fps");

        debugjs_frameCount = 0;
        debugjs_now = +new Date();
    }
};

game.addEventListener('enterframe', debugjs_printfps);

quicktigame2d.addEventListener('onlowmemory', function(e) {
    Ti.API.warn("Low Memory");
});

// add label to the window
window.add(centerLabel);

window.open({fullscreen:true, navBarHidden:true});

