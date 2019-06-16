function levelLength(){
    background(164, 194, 242);
    push();
    fill(0, 0, 0);
    textFont(fonts.mario);
    textSize(35);
    textAlign(CENTER);
    text("Level Length", width/2, 35);
    pop();
    button(width-75, height-25, 150, 50, 2, color(216, 22, 19), "Submit", 30, function(){
        createdLevel.created = true;
        scene = "leveleditorinit";
    });
    push();
    fill(0, 0, 0);
    textSize(30);
    textAlign(CENTER);
    text("Width", width/2, height/2-50);
    text(createdLevel.map[0].length+" blocks", width/2, height/2);
    text("Height", width/2, height/2+50);
    text(createdLevel.map.length+" blocks", width/2, height/2+100);
    pop();
    button(width/2-100, height/2-10, 50, 50, 2, color(216, 22, 19), "up", 30, function(){
        var originalWidth = createdLevel.map[0].length;
        for(var i = 0; i<createdLevel.map.length; i++){
            createdLevel.map[i] = "";
            for(var j = 0; j<originalWidth+1; j++){
                createdLevel.map[i] += " ";
            }
        }
    });
    button(width/2+100, height/2-10, 50, 50, 2, color(216, 22, 19), "down", 20, function(){
        var originalWidth = createdLevel.map[0].length;
        for(var i = 0; i<createdLevel.map.length; i++){
            createdLevel.map[i] = "";
            for(var j = 0; j<originalWidth-1; j++){
                createdLevel.map[i] += " ";
            }
        }
    });
    button(width/2-100, height/2+90, 50, 50, 2, color(216, 22, 19), "up", 25, function(){
        var originalWidth = createdLevel.map[0].length;
        var newLine = "";
        for(var i = 0; i<originalWidth; i++){
            newLine += " ";
        }
        createdLevel.map.push(newLine);
    });
    button(width/2+100, height/2+90, 50, 50, 2, color(216, 22, 19), "down", 20, function(){
        createdLevel.map.splice(createdLevel.map.length-1, 1);
    });
    createdLevel.map.length = constrain(createdLevel.map.length, 8, createdLevel.map[0].length);
    for(var i in createdLevel.map){
        createdLevel.map[i].length = constrain(createdLevel.map[i].length, 10, 2000);
    }
}
