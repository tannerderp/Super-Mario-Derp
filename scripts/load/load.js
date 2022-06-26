let imgs = {};
let fonts = {};
let sounds = {};
let music = {};
function preload(){
    //load images
    imgs.logo = loadImage("/Super-Mario-Derp/sprites/logo.png");
    imgs.mario = {};
    imgs.mario.walk = Array(3);
    for(var i = 0; i<3; i++){
        imgs.mario.walk[i] = loadImage("/Super-Mario-Derp/sprites/mario/BSMW"+(i+1)+".png")
    }
    imgs.mario.jump = loadImage("/Super-Mario-Derp/sprites/mario/BSMW4.png");
    imgs.mario.fall = loadImage("/Super-Mario-Derp/sprites/mario/BSMW5.png");
    imgs.mario.death = loadImage("/Super-Mario-Derp/sprites/mario/death.png");
    imgs.mario.duck = loadImage("/Super-Mario-Derp/sprites/mario/duck.png");
    imgs.goomba = {};
    imgs.goomba.idle = loadImage("/Super-Mario-Derp/sprites/goomba/Goomba.png");
    imgs.goomba.dead = loadImage("/Super-Mario-Derp/sprites/goomba/Dead Goomba.png");
    imgs.koopa = {};
    imgs.koopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.koopa.idle[i] = loadImage("/Super-Mario-Derp/sprites/koopa/koopa"+(i+1)+".png");
    }
    imgs.koopa.shell = loadImage("/Super-Mario-Derp/sprites/koopa/0.png");
    imgs.redKoopa = {};
    imgs.redKoopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.redKoopa.idle[i] = loadImage("/Super-Mario-Derp/sprites/koopa/red koopa "+i+".png");
    }
    imgs.redKoopa.shell = loadImage("/Super-Mario-Derp/sprites/koopa/red koopa shell.png");
    imgs.paraTroopa = {};
    imgs.paraTroopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.paraTroopa.idle[i] = loadImage("/Super-Mario-Derp/sprites/koopa/paratroopa/"+i+".png");
    }
    imgs.boomBoom = {};
    imgs.boomBoom.move = Array(5);
    for(var i = 0; i<5; i++){
        imgs.boomBoom.move[i] = loadImage("/Super-Mario-Derp/sprites/boom boom/"+i+".png");
    }
    imgs.boomBoom.hurt = loadImage("/Super-Mario-Derp/sprites/boom boom/6.png");
    imgs.boomBoom.shell = loadImage("/Super-Mario-Derp/sprites/boom boom/5.png");
    imgs.brick = loadImage("/Super-Mario-Derp/sprites/Brick Block.PNG");
    imgs.noteBlock = loadImage("/Super-Mario-Derp/sprites/note block.png")
    imgs.itemBlock = {};
    imgs.itemBlock.idle = Array(4);
    for(var i = 0; i<4; i++){
        imgs.itemBlock.idle[i] = loadImage("/Super-Mario-Derp/sprites/Item Block/Item Block"+(i+1)+".png");
    }
    imgs.itemBlock.hit = loadImage("/Super-Mario-Derp/sprites/Item Block/Item Block Hit.png");
    imgs.bridge = Array(2);
    for(var i = 0; i<2; i++){
        imgs.bridge[i] = loadImage("/Super-Mario-Derp/sprites/bridge/"+i+".png");
    }
    imgs.lava = {};
    imgs.lava.top = Array(5);
    for(var i = 0; i<5; i++){
        imgs.lava.top[i] = loadImage("/Super-Mario-Derp/sprites/lava/"+i+".png");
    }
    imgs.lava.bottom = loadImage("/Super-Mario-Derp/sprites/lava/5.png");
    imgs.mushroom = loadImage("/Super-Mario-Derp/sprites/mushroom.png");
    imgs.coin = loadImage("/Super-Mario-Derp/sprites/coin.png");
    imgs.pipe = {};
    imgs.pipe.top = loadImage("/Super-Mario-Derp/sprites/Warp Pipe/Warp Pipe Top.png");
    imgs.pipe.bottom = loadImage("/Super-Mario-Derp/sprites/Warp Pipe/Warp Pipe Bottom.png");
    imgs.pirahna = Array(2);
    for(var i = 0; i<2; i++){
        imgs.pirahna[i] = loadImage("/Super-Mario-Derp/sprites/pirahna/Pirahna"+(i+1)+".png");
    }
    imgs.flagPole = loadImage("/Super-Mario-Derp/sprites/flagpole.png");
    imgs.backgrounds = Array(4); //all backgrounds MUST be 395 x 331
    for(var i = 0; i<4; i++){
        imgs.backgrounds[i] = loadImage("/Super-Mario-Derp/sprites/Backgrounds/"+i+".png");
    }
    imgs.worldMap = {};
    imgs.worldMap.mario = Array(2);
    for(var i = 0; i<2; i++){
        imgs.worldMap.mario[i] = loadImage("/Super-Mario-Derp/sprites/world map/mario"+i+".png");
    }
    imgs.editor = {};
    imgs.editor.edit = loadImage("/Super-Mario-Derp/sprites/editor/editor.png");
    //load sounds
    soundFormats('mp3', 'wav');
    sounds.mario = {};
    sounds.mario.jump = loadSound("/Super-Mario-Derp/sounds/Mario_Jump.wav");
    sounds.mario.hurt = loadSound("/Super-Mario-Derp/sounds/Mario_Hurt.wav");
    sounds.mario.death = loadSound("/Super-Mario-Derp/sounds/music/death.wav");
    sounds.enemy = {};
    sounds.enemy.squash = loadSound("/Super-Mario-Derp/sounds/Stomp.wav");
    sounds.kick = loadSound("/Super-Mario-Derp/sounds/kick.wav");
    sounds.coin = loadSound("/Super-Mario-Derp/sounds/coin.wav");
    sounds.levelComplete = loadSound("/Super-Mario-Derp/sounds/Level_Complete.mp3");
    //load music
    music.overworld = Array(2);
    for(var i= 0; i<2; i++){
        music.overworld[i] = loadSound("/Super-Mario-Derp/sounds/music/overworld/"+i+".mp3"); //there has to be two seperate files for each track, one for the beginning, and one for the part that loops. Mario music usually has a beginning and a looping part. If it doesn't, just do what I did for the underground theme
    }
    music.underground = Array(2);
    music.underground[0] = {};
    music.underground[0].notMusic = true;
    music.underground[0].duration = function(d){
        return 0;
    }
    music.underground[1] = loadSound("/Super-Mario-Derp/sounds/music/underground/1.mp3");
    music.castle = Array(2);
    for(var i= 0; i<2; i++){
        music.castle[i] = loadSound("/Super-Mario-Derp/sounds/music/castle/"+i+".mp3");
    }
    music.athletic = Array(2);
    for(var i = 0; i<2; i++){
        music.athletic[i] = loadSound("/Super-Mario-Derp/sounds/music/athletic/"+i+".mp3");
    }
    music.total = 4;
    music.worldMap = loadSound("/Super-Mario-Derp/sounds/music/world map.mp3");
    music.beatBoss = loadSound("/Super-Mario-Derp/sounds/music/beat boss.wav");
    //load fonts
    fonts.mario = loadFont("/Super-Mario-Derp/fonts/SuperMario256.ttf");
}
let keys = {};
let releaseKeys = {};
keyPressed = function(){
    keys[keyCode] = true;
    keys[key] = true;
}
keyReleased = function(){
    keys[keyCode] = false;
    keys[key] = false;
    releaseKeys[keyCode] = true;
    releaseKeys[key] = false;
}
let clicked = false;
let holdClicked = false;
mousePressed = function(){
    holdClicked = true;
}
mouseReleased = function(){
    holdClicked = false;
    clicked = true;
}
let createdLevel = {
    map: [
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
    ],
    name: "",
    creator: "",
    background: 0,
    music: 0,
    groundColor: [175, 118, 10],
    topGroundColor: [57, 175, 14],
    created: false,
}
if(localStorage["createdLevel"] !== null && localStorage["createdLevel"] !== "nothin"){
    createdLevel = JSON.parse(localStorage["createdLevel"]);
    console.log(createdLevel)
}
scene = "gameLoad";
