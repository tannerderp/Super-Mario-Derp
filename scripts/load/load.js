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
    imgs.mario.death = loadImage("/sprites/mario/death.png");
    imgs.mario.duck = loadImage("/sprites/mario/duck.png");
    imgs.goomba = {};
    imgs.goomba.idle = loadImage("/sprites/goomba/Goomba.png");
    imgs.goomba.dead = loadImage("/sprites/goomba/Dead Goomba.png");
    imgs.koopa = {};
    imgs.koopa.idle = Array(2);
    for(var i = 0; i<2; i++){
        imgs.koopa.idle[i] = loadImage("/sprites/koopa/koopa"+(i+1)+".png");
    }
    imgs.koopa.shell = loadImage("/sprites/koopa/0.png");
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
    imgs.boomBoom = {};
    imgs.boomBoom.move = Array(5);
    for(var i = 0; i<5; i++){
        imgs.boomBoom.move[i] = loadImage("/sprites/boom boom/"+i+".png");
    }
    imgs.boomBoom.hurt = loadImage("/sprites/boom boom/6.png");
    imgs.boomBoom.shell = loadImage("/sprites/boom boom/5.png");
    imgs.brick = loadImage("/sprites/Brick Block.PNG");
    imgs.noteBlock = loadImage("/sprites/note block.png")
    imgs.itemBlock = {};
    imgs.itemBlock.idle = Array(4);
    for(var i = 0; i<4; i++){
        imgs.itemBlock.idle[i] = loadImage("/sprites/Item Block/Item Block"+(i+1)+".png");
    }
    imgs.itemBlock.hit = loadImage("/sprites/Item Block/Item Block Hit.png");
    imgs.bridge = Array(2);
    for(var i = 0; i<2; i++){
        imgs.bridge[i] = loadImage("/sprites/bridge/"+i+".png");
    }
    imgs.lava = {};
    imgs.lava.top = Array(5);
    for(var i = 0; i<5; i++){
        imgs.lava.top[i] = loadImage("/sprites/lava/"+i+".png");
    }
    imgs.lava.bottom = loadImage("/sprites/lava/5.png");
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
    imgs.worldMap = {};
    imgs.worldMap.mario = Array(2);
    for(var i = 0; i<2; i++){
        imgs.worldMap.mario[i] = loadImage("/sprites/world map/mario"+i+".png");
    }
    imgs.editor = {};
    imgs.editor.edit = loadImage("/sprites/editor/editor.png");
    //load sounds
    soundFormats('mp3', 'wav');
    sounds.mario = {};
    sounds.mario.jump = loadSound("/sounds/Mario_Jump.wav");
    sounds.mario.hurt = loadSound("/sounds/Mario_Hurt.wav");
    sounds.mario.death = loadSound("/sounds/music/death.wav");
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
    music.athletic = Array(2);
    for(var i = 0; i<2; i++){
        music.athletic[i] = loadSound("/sounds/music/athletic/"+i+".mp3");
    }
    music.total = 4;
    music.worldMap = loadSound("/sounds/music/world map.mp3");
    music.beatBoss = loadSound("/sounds/music/beat boss.wav");
    //load fonts
    fonts.mario = loadFont("/fonts/SuperMario256.ttf");
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
