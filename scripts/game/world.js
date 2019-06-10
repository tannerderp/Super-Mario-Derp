let world = {
    blocks: [],
    levels: [],
    objects: [],
}
$.getJSON("/scripts/game/levels.json", function(json){
    world.levels = json.levels;
})
world.run = function(){
    background(255, 255, 255);
    push();
    if(this.musicWait>this.music[0].duration() * 60){
        this.music[1].loop();
        this.musicWait = 0;
        this.musicAdd = false;
    } else if(this.musicAdd){
        this.musicWait ++;
    }
    scale(this.size);
    if(this.player.x>this.levelLength-this.screenWidth/2){
        translate(-this.levelLength+this.screenWidth, 0);
    }else if(this.player.x>this.screenWidth/2){
        translate(-this.player.x+this.screenWidth/2, 0);
    }
    this.displayBackground();
    this.player.run();
    for(var i = this.objects.length-1; i>=0; i--){
        let o = this.objects[i];
        if(abs(this.player.x-o.x)<width/2+250){ //enemies don't mess up their starting positions til you see them
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
    this.player.displayCoins(25, 25);
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
        case "=": return Pipe; break;
        case "|": return PipeBottom; break;
        case "%": return Brick; break;
        case "?": return ItemBlock; break;
        case "&": return MushroomItemBlock; break;
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
    this.size = height/(map.length*47);
    this.groundColor = level.groundColor;
    this.topGroundColor = level.topGroundColor;
    this.background = level.background;
    this.screenWidth = width/this.size;
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
}
world.displayBackground = function(){
    // for(var i = 0; i<=this.levelLength; i+= height/imgs.backgrounds[this.background].height*395){
    var s = (windowHeight+5)/400;
    for(var i = 0; i<= this.levelLength; i+= s*400){
        push();
        imageMode(LEFT);
        translate(i, 0);
        // scale(height/imgs.backgrounds[this.background].height);
        scale(s);
        image(imgs.backgrounds[this.background], 0, 0);
        pop();
    }

}
world.init = function(){
    this.load(this.levels[0]);
    scene = "game";
}
world.getMusicPath = function(num){
    switch(num){
        case 0: return music.overworld; break;
        case 1: return music.underground; break;
    }
}
