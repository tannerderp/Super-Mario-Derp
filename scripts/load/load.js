let imgs = {};
let fonts = {};
let sounds = {};
let music = {};
function preload(){
    //load images
    imgs.logo = loadImage("/sprites/logo.png");
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
    imgs.redKoopa = {};
    imgs.redKoopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.redKoopa.idle[i] = loadImage("/sprites/koopa/red koopa "+i+".png");
    }
    imgs.redKoopa.shell = loadImage("/sprites/koopa/red koopa shell.png");
    imgs.paraTroopa = {};
    imgs.paraTroopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.paraTroopa.idle[i] = loadImage("/sprites/koopa/paratroopa/"+i+".png");
    }
    imgs.brick = loadImage("/sprites/Brick Block.PNG");
    imgs.itemBlock = {};
    imgs.itemBlock.idle = Array(4);
    for(var i = 0; i<4; i++){
        imgs.itemBlock.idle[i] = loadImage("/sprites/Item Block/Item Block"+(i+1)+".png");
    }
    imgs.itemBlock.hit = loadImage("/sprites/Item Block/Item Block Hit.png");
    imgs.mushroom = loadImage("/sprites/mushroom.png");
    imgs.coin = loadImage("/sprites/coin.png");
    imgs.pipe = {};
    imgs.pipe.top = loadImage("/sprites/Warp Pipe/Warp Pipe Top.png");
    imgs.pipe.bottom = loadImage("/sprites/Warp Pipe/Warp Pipe Bottom.png");
    imgs.pirahna = Array(2);
    for(var i = 0; i<2; i++){
        imgs.pirahna[i] = loadImage("/sprites/pirahna/Pirahna"+(i+1)+".png");
    }
    imgs.flagPole = loadImage("/sprites/flagpole.png");
    imgs.backgrounds = Array(4); //all backgrounds MUST be 395 x 331
    for(var i = 0; i<4; i++){
        imgs.backgrounds[i] = loadImage("/sprites/Backgrounds/"+i+".png");
    }
    //load sounds
    soundFormats('mp3', 'wav');
    sounds.mario = {};
    sounds.mario.jump = loadSound("/sounds/Mario_Jump.wav");
    sounds.mario.hurt = loadSound("/sounds/Mario_Hurt.wav");
    sounds.enemy = {};
    sounds.enemy.squash = loadSound("/sounds/Stomp.wav");
    sounds.kick = loadSound("/sounds/kick.wav");
    sounds.coin = loadSound("/sounds/coin.wav");
    sounds.levelComplete = loadSound("/sounds/Level_Complete.mp3");
    //load music
    music.overworld = Array(2);
    for(var i= 0; i<2; i++){
        music.overworld[i] = loadSound("/sounds/music/overworld/"+i+".mp3"); //there has to be two seperate files for each track, one for the beginning, and one for the part that loops. Mario music usually has a beginning and a looping part. If it doesn't, just do what I did for the underground theme
    }
    music.underground = Array(2);
    music.underground[0] = {};
    music.underground[0].notMusic = true;
    music.underground[0].duration = function(d){
        return 0;
    }
    music.underground[1] = loadSound("/sounds/music/underground/1.mp3");
    music.castle = Array(2);
    for(var i= 0; i<2; i++){
        music.castle[i] = loadSound("/sounds/music/castle/"+i+".mp3");
    }
    music.total = 3;
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
let clicked = false;
mouseReleased = function(){
    clicked = true;
}
let createdLevel = {
    map: [],
    name: "",
    background: 0,
    music: 0,
    groundColor: [175, 118, 10],
    topGroundColor: [57, 175, 14],
}
scene = "gameLoad";
