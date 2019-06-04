let imgs = {};
function preload(){
    imgs.mario = {};
    imgs.mario.walk = Array(3);
    for(var i = 0; i<3; i++){
        imgs.mario.walk[i] = loadImage("/sprites/mario/BSMW"+(i+1)+".png")
    }
    imgs.mario.jump = loadImage("/sprites/mario/BSMW4.png");
    imgs.mario.fall = loadImage("/sprites/mario/BSMW5.png");
    imgs.goomba = {};
    imgs.goomba.idle = loadImage("/sprites/goomba/Goomba.png");
    imgs.goomba.dead = loadImage("/sprites/goomba/Dead Goomba.png");
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
