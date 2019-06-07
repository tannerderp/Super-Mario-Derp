let imgs = {};
let fonts = {};
let sounds = {};
function preload(){
    //load images
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
    imgs.koopa = {};
    imgs.koopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.koopa.idle[i] = loadImage("/sprites/koopa/koopa"+(i+1)+".png");
    }
    imgs.koopa.shell = loadImage("/sprites/koopa/koopa shell.png");
    imgs.brick = loadImage("/sprites/Brick Block.PNG");
    imgs.itemBlock = {};
    imgs.itemBlock.idle = Array(4);
    for(var i = 0; i<4; i++){
        imgs.itemBlock.idle[i] = loadImage("/sprites/Item Block/Item Block"+(i+1)+".png");
    }
    imgs.itemBlock.hit = loadImage("/sprites/Item Block/Item Block Hit.png");
    imgs.mushroom = loadImage("/sprites/mushroom.png");
    //load sounds
    soundFormats('mp3', 'wav');
    sounds.mario = {};
    sounds.mario.jump = loadSound("/sounds/Mario_Jump.wav");
    sounds.mario.hurt = loadSound("/sounds/Mario_Hurt.wav");
    sounds.enemy = {};
    sounds.enemy.squash = loadSound("/sounds/Stomp.wav");
    sounds.kick = loadSound("/sounds/kick.wav");
    //load fonts
    fonts.mario = loadFont("/fonts/SuperMario256.ttf");
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
