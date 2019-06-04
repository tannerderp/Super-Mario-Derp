let world = {
    blocks: [],
    levels: [],
}
$.getJSON("/scripts/game/levels.json", function(json){
    world.levels = json.levels;
})
world.run = function(){
    background(255, 255, 255);
    this.player.run();
    for(var i in this.blocks){
        this.blocks[i].run(this.player);
    }
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
        case "M": return "player"; break;
        default: return null; break;
    }
}
world.load = function(map){
    this.blocks = [];
    for(var i in map){
        for(var j in map[i]){
            let c = map[i][j];
            let x = j * 48;
            let y = i * 48;
            let o = this.getObject(c);
            if(o === "player"){
                this.player = new Mario(x, y);
            } else if(o){
                this.blocks.push(new (o)(x, y));
            }
        }
    }
}
world.init = function(){
    this.load(this.levels[0].map);
    scene = "game";
}
