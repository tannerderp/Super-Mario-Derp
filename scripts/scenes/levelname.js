function levelName(){
    background(164, 194, 242);
    push();
    fill(0,0,0);
    textFont(fonts.mario);
    textSize(30);
    textAlign(CENTER);
    text("Level Name and \nCreator", width/2, 50);
    pop();
    nameBox.position(windowWidth/2-200, windowHeight/2-25-75);
    creatorBox.position(windowWidth/2-200, windowHeight/2-25+75)
    if(nameBox.value() !== "" && creatorBox.value() !== ""){
        button(width-100, height-55, 150, 50, 2, color(216, 22, 19), "Submit", 30, function(){
            createdLevel.name = nameBox.value();
            createdLevel.creator = creatorBox.value();
            nameBox.position(-500, -500);
            creatorBox.position(-500, -500);
            world.background = 0;
            scene = "levelbackground";
        })
    }
}
