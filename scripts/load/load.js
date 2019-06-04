let imgs = {};
function preload(){
    imgs.mario = {};
    imgs.mario.walk = Array(3);
    for(var i = 0; i<3; i++){
        imgs.mario.walk[i] = loadImage("/sprites/mario/BSMW"+(i+1)+".png")
    }
    imgs.mario.jump = loadImage("/sprites/mario/BSMW4.png");
    imgs.mario.fall = loadImage("/sprites/mario/BSMW5.png");
}
let keys = {};
keyPressed = function(){
    keys[keyCode] = true;
    keys[key] = true;
}
keyReleased = function(){
    keys[keyCode] = false;
    keys[key] = false;
}
scene = "gameLoad";
