function editLevel(){ //change the levels name, creator, or size
    background(164, 194, 242);
    push();
    fill(0, 0, 0);
    textFont(fonts.mario);
    textSize(35);
    textAlign(CENTER);
    text("Edit Level", width/2, 35);
    pop();
    nameBox.position(windowWidth/2-200, windowHeight/2-25-75-150);
    creatorBox.position(windowWidth/2-200, windowHeight/2-25-150);

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
        for(var i in createdLevel.map){
            createdLevel.map[i] += " ";
        }
    });
    button(width/2+100, height/2-10, 50, 50, 2, color(216, 22, 19), "down", 20, function(){
        for(var i in createdLevel.map){
            createdLevel.map[i] = createdLevel.map[i].replaceAt(createdLevel.map[i].length-1, "");
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

    button(width-75, height-25, 150, 50, 2, color(216, 22, 19), "Apply", 30, function(){
        localStorage["createdLevel"] = JSON.stringify(createdLevel);
        createdLevel.name = nameBox.value();
        createdLevel.creator = creatorBox.value();
        nameBox.position(-500, -500);
        creatorBox.position(-500, -500);
        scene = "leveleditorinit";
    });
}
