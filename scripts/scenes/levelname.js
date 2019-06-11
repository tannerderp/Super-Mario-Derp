function levelName(){
    background(164, 194, 242);
    push();
    fill(0,0,0);
    textFont(fonts.mario);
    textSize(50);
    textAlign(CENTER);
    text("Name Level", width/2, 50);
    pop();
    nameBox.position(windowWidth/2-200, windowHeight/2-25);
    button(width-100, height-55, 150, 50, 2, color(216, 22, 19), "Submit", 30, function(){
        createdLevel.name = nameBox.value();
        nameBox.position(-500, -500);
        world.background = 0;
        scene = "levelbackground";
    })
}
