let levelEditor = {
    scroll: 0,
    size: 0,
}
levelEditor.run = function(){
    background(255, 255, 255);
    push();
    scale(this.size);
    if(this.scroll>this.levelLength-this.screenWidth/2){
        translate(-this.levelLength+this.screenWidth, 0);
    }else if(this.scroll>this.screenWidth/2){
        translate(-this.scroll+this.screenWidth/2, 0);
    }
    world.background = createdLevel.background;
    world.displayBackground(this.levelLength);
    this.displayGrid();
    this.control();
    pop();
}
levelEditor.control = function(){
    this.scroll = constrain(this.scroll, this.screenWidth/2, this.levelLength-this.screenWidth/2);
    if(keys[RIGHT_ARROW]||keys.d){
        this.scroll += 5;
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.scroll -= 5;
    }
}
levelEditor.displayGrid = function(){
    for(var i in createdLevel.map){
        for(var j in createdLevel.map[i]){
            let x = j * 47;
            let y = i * 47;
            push();
            fill(255, 255, 255, 0);
            stroke(0, 0, 0);
            strokeWeight(0.5);
            rectMode(LEFT);
            rect(x, y, 48, 48);
            pop();
        }
    }
}
levelEditor.init = function(){
    this.size = height/(createdLevel.map.length*47);
    this.screenWidth = width/this.size;
    this.levelLength = createdLevel.map[0].length*47;
    scene = "leveleditor";
}
