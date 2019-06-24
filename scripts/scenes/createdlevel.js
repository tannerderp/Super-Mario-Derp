function CreatedLevel(){
    background(164, 194, 242);
    push();
    fill(0, 0, 0);
    textFont(fonts.mario);
    textSize(35);
    textAlign(CENTER);
    text("Created Level", width/2, 35);
    pop();
    button(width/2, height/2-90, 150, 50, 2, color(9, 116, 224), "Play", 30, function(){
        world.levelToLoad = createdLevel;
        scene = "gameLoad";
    });
    button(width/2, height/2-30, 150, 50, 2, color(9, 116, 224), "Edit", 30, function(){
        scene = "leveleditorinit";
    });
    button(width/2, height/2+30, 150, 50, 2, color(9, 116, 224), "Delete", 30, function(){
        createdLevel = {
            map: [
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
                "                                                ",
            ],
            name: "",
            creator: "",
            background: 0,
            music: 0,
            groundColor: [175, 118, 10],
            topGroundColor: [57, 175, 14],
            created: false,
        };
        scene = "home";
    });
    button(width/2, height/2+90, 150, 50, 2, color(9, 116, 224), "Upload to \nCommunity", 20, function(){
        $.post("https://super-mario-derp.herokuapp.com/newlevel", createdLevel, function(data){
            console.log(data);
            scene = "home";
        }).catch(function(e, t ,n){
            console.log("level upload error");
            console.log(t);
            console.log(n);
        });
    });
    button(75, height-25, 150, 50, 2, color(216, 22, 19), "Home", 30, function(){
        scene = "home";
    });
}
