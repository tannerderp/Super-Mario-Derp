let world = {
    blocks: [],
    levels: [],
    objects: [],
}
$.getJSON("/Super-Mario-Derp/scripts/game/levels.json", function(json){
    world.levels = json.levels;
})
world.run = function(){
    background(255, 255, 255);
    push();
    if(this.deathWait<1&&!this.levelComplete){
        if(this.musicWait>this.music[0].duration() * 60){
            this.music[1].loop();
            this.musicWait = 0;
            this.musicAdd = false;
        } else if(this.musicAdd){
            this.musicWait ++;
        }
    }
    if(this.deathWait>0){
        this.deathWait ++;
        if(this.deathWait>sounds.mario.death.duration() * 60){
            scene = this.returnDest;
        }
    }
    if(this.beatBossWait>0){
        this.beatBossWait ++;
        if(this.beatBossWait>music.beatBoss.duration() * 60){
            scene = this.returnDest;
            if(this.returnDest === "worldmapinit") worldMap.levelsCleared ++;
        }
    }
    if(this.player.x>this.levelLength-this.screenWidth/2){
        translate((-this.levelLength+this.screenWidth)*this.size, 0);
    }else if(this.player.x>this.screenWidth/2){
        translate((-this.player.x+this.screenWidth/2)*this.size, 0);
    }
    if(height/(this.map.length*47)<this.size){
        if(this.player.y>this.map.length*47-this.screenHeight/2){
            translate(0, (-(this.map.length*47)+this.screenHeight)*this.size);
        } else if(this.player.y>this.screenHeight/2){
            translate(0, (-this.player.y+this.screenHeight/2)*this.size);
        }
    }
    this.displayBackground(this.levelLength, this.map.length*47, this.size);
    scale(this.size);
    this.player.run();
    for(var i = this.objects.length-1; i>=0; i--){
        let o = this.objects[i];
        if(abs(this.player.x-o.x)<width+250){ //enemies don't mess up their starting positions til you see them
            o.run(this.player);
        }
        if(o.dead){
            this.objects.splice(i, 1);
        }
    }
    for(var i in this.blocks){
        this.blocks[i].run(this.player);
    }
    pop();
    this.player.displayHealth(width-35, 35);
    if(this.levelToLoad !== createdLevel&&this.returnDest !== "communitylevels") this.player.displayLives(25, 15);
    this.player.displayCoins(25, 40);
    if(this.levelToLoad === createdLevel){
        button(width-100, 35, 50, 30, 2, color(9, 116, 224), "Quit", 20, function(){
            stopMusic();
            scene = "createdlevel";
        })
    }
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
        case "_": return Platform; break;
        case "=": return Pipe; break;
        case "|": return PipeBottom; break;
        case "%": return Brick; break;
        case "?": return ItemBlock; break;
        case "&": return MushroomItemBlock; break;
        case "b": return NoteBlock; break;
        case "+": return Lava; break;
        case "*": return LavaBottom; break;
        case "F": return FlagPole; break; //f in the chat
        case "M": return "player"; break;
        case "m": return ["item", Mushroom]; break;
        case "C": return ["item", Coin]; break;
        case "P": return ["enemy", Pirahna]; break;
        case "G": return ["enemy", Goomba]; break;
        case "K": return ["enemy", Koopa]; break;
        case "R": return ["enemy", RedKoopa]; break;
        case "p": return ["enemy", ParaTroopa]; break;
        case "S": return ["enemy", Shell]; break;
        case "B": return ["enemy", BoomBoom]; break;
        default: return null; break;
    }
}
world.load = function(level){
    this.blocks = [];
    this.objects = [];
    let map = level.map;
    for(var i in map){
        for(var j in map[i]){
            let c = map[i][j];
            let x = j * 47;
            let y = i * 47;
            let o = this.getObject(c);
            if(o === "player"){
                this.player = new Mario(x, y);
            } else if(Array.isArray(o)){
                this.objects.push(new (o[1])(x, y));
            }else if(o){
                this.blocks.push(new (o)(x, y));
            }
            this.levelLength = map[i].length*47;
        }
    }
    this.size = max(height/(map.length*47), height/(13*47));
    this.groundColor = level.groundColor;
    this.topGroundColor = level.topGroundColor;
    this.background = level.background;
    this.screenWidth = width/this.size;
    this.screenHeight = height/this.size;
    this.music = Array(2);
    this.musicPath = this.getMusicPath(level.music);
    for(var i = 0; i<2; i++){
        this.music[i] = this.musicPath[i];
    }
    this.musicWait = 0;
    this.musicAdd = true;
    if(!this.music[0].notMusic){
        this.music[0].play();
    } else{
        this.musicWait = 61;
    }
    this.map = map;
}
world.displayBackground = function(levelLength, levelHeight, size){
    for(var i = 0; i<= levelLength; i+= levelHeight*size){
        push();
        imageMode(LEFT);
        translate(i, 0);
        image(imgs.backgrounds[this.background], 0, 0, levelHeight*size, levelHeight*size);
        pop();
    }
}
world.init = function(){
    this.deathWait = 0;
    this.beatBossWait = 0;
    this.levelComplete = false;
    this.load(this.levelToLoad);
    scene = "game";
}
world.death = function(){
    if(this.beatBossWait === 0){
        if(this.levelToLoad !== createdLevel&&this.returnDest !== "communitylevels") worldMap.lives --;
        this.deathWait = 1;
        this.player.canMove = false;
        stopMusic();
        if(this.player.y-this.player.h/2<(this.map.length*47)){
            this.player.deathAnimation = true;
            this.player.yvel = -12;
        }
        sounds.mario.death.play();
    }
}
world.getMusicPath = function(num){
    switch(num){
        case 0: return music.overworld; break;
        case 1: return music.underground; break;
        case 2: return music.castle; break;
        case 3: return music.athletic; break;
    }
}
function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
function stopMusic(){
    if(world.music[0].duration() !== 0){
        if(isFunction(world.music[0].stop())) world.music[0].stop();
    }
    world.music[1].stop(); //for some reason I can't stop the music inside of the world object. weird piss
}
world.beatBoss = function(){
    this.player.canMove = false;
    this.beatBossWait = 1;
    stopMusic();
    music.beatBoss.play();
}
