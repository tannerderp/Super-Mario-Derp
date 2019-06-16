function CreatedLevel(){
    background(164, 194, 242);
    push();
    fill(0, 0, 0);
    textFont(fonts.mario);
    textSize(35);
    textAlign(CENTER);
    text("Created Level", width/2, 35);
    pop();
    button(width/2, height/2-75, 150, 50, 2, color(9, 116, 224), "Play", 30, function(){
        world.levelToLoad = createdLevel;
        scene = "gameLoad";
    });
    button(width/2, height/2, 150, 50, 2, color(9, 116, 224), "Edit", 30, function(){
        scene = "leveleditorinit";
    });
    button(width/2, height/2+75, 150, 50, 2, color(9, 116, 224), "Delete", 30, function(){
        createdLevel = {
            map: [
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
            ],
            name: "",
            background: 0,
            music: 0,
            groundColor: [175, 118, 10],
            topGroundColor: [57, 175, 14],
            created: false,
        };
        scene = "home";
    });
    button(75, height-25, 150, 50, 2, color(216, 22, 19), "Home", 30, function(){
        scene = "home";
    });
}
