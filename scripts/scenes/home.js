function home(){
    background(164, 194, 242);
    push();
    imageMode(CENTER);
    image(imgs.logo, width/2, 50, width-10, ((width-10)/imgs.logo.width)*imgs.logo.height);
    pop();
    button(width/2, height/2-75, 150, 50, 2, color(216, 22, 19), "Story Mode", 25, function(){
        world.levelToLoad = world.levels[0];
        world.returnDest = "worldmapinit";
        scene = "worldmapinit";
    });
    button(width/2, height/2, 150, 50, 2, color(9, 116, 224), "Level Editor", 25, function(){
        if(createdLevel.created){
            scene = "createdlevel";
        } else{
            scene = "levelname";
        }
    });
    button(width/2, height/2+75, 150, 50, 2, color(216, 22, 19), "Community \nLevels", 20, function(){
        scene = "communitylevelsinit";
    });
}
