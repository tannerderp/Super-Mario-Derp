let world = {
    blocks: [],
}
world.run = function(){
    background(255, 255, 255);
}
world.getObject = function(character){
    switch(character){
        case "#": return Ground; break;
    }
}
world.load = function(map){
    this.blocks = [];
    for(var i in map){
        for(var j in map[i]){
            let c = map[i][j];
            let x = j * 32;
            let y = i * 32;
            let o = this.getObject(c);
            if(o){
                this.blocks.push(new (o)(x, y));
            }
        }
    }
}
