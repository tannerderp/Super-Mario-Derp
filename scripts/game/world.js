let world = {
    blocks: [],
    levels: [],
}
$.getJSON("/scripts/game/levels.json", function(json){
    world.levels = json.levels;
})
world.run = function(){
    background(255, 255, 255);
    for(var i in this.blocks){
        this.blocks[i].run();
    }
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
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
            if(o){
                this.blocks.push(new (o)(x, y));
            }
        }
    }
}
world.init = function(){
    if(load.done){
        this.load(this.levels[0].map);
        scene = "game";
    }
}
