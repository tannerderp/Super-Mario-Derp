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
    if(this.player.x>this.levelLength-width/2){
        translate(-this.levelLength+width, 0);
    }else if(this.player.x>width/2){
        translate(-this.player.x+width/2, 0);
    }
    this.player.run();
    for(var i = this.objects.length-1; i>=0; i--){
        this.objects[i].run(this.player);
        if(this.objects[i].dead){
            this.objects.splice(i, 1);
        }
    }
    for(var i in this.blocks){
        this.blocks[i].run(this.player);
    }
    pop();
    this.player.displayHealth(width-55, 55);
    this.player.displayCoins(25, 55);
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
        case "%": return Brick; break;
        case "?": return ItemBlock; break;
        case "&": return MushroomItemBlock; break;
        case "M": return "player"; break;
        case "m": return ["item", Mushroom]; break;
        case "C": return ["item", Coin]; break;
        case "G": return ["enemy", Goomba]; break;
        case "K": return ["enemy", Koopa]; break;
        case "S": return ["enemy", Shell]; break;
        default: return null; break;
    }
}
world.load = function(map){
    this.blocks = [];
    this.objects = [];
    for(var i in map){
        for(var j in map[i]){
            let c = map[i][j];
            let x = j * 48;
            let y = i * 48;
            let o = this.getObject(c);
            if(o === "player"){
                this.player = new Mario(x, y);
            } else if(Array.isArray(o)){
                this.objects.push(new (o[1])(x, y));
            }else if(o){
                this.blocks.push(new (o)(x, y));
            }
            this.levelLength = map[i].length*48;
        }
    }
}
world.init = function(){
    this.load(this.levels[0].map);
    scene = "game";
}
