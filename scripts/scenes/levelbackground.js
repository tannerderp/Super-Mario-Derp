function levelBackground(){
    background(164, 194, 242);
    push();
    fill(0, 0, 0);
    textFont(fonts.mario);
    textSize(35);
    textAlign(CENTER);
    text("Choose Background", width/2, 35);
    pop();
    push();
    imageMode(CENTER);
    translate(width/2, height/2-30);
    scale(0.5);
    image(imgs.backgrounds[world.background], 0, 0);
    pop();
    button(width/2, height/2+115, 150, 50, 2, color(9, 116, 224), "Change", 30, function(){
        world.background ++;
        if(world.background>imgs.backgrounds.length-1){
            world.background = 0;
        }
    });
    button(width-75, height-25, 150, 50, 2, color(216, 22, 19), "Submit", 30, function(){
        setGroundColor();
        scene = "levelmusic";
    });
}
function setGroundColor(){
    var b = world.background;
    if(b === 0 || b === 1){
        createdLevel.topGroundColor = [57, 175, 14];
        createdLevel.groundColor = [175, 118, 10];
    } else if(b === 2){
        createdLevel.topGroundColor = [83, 148, 252];
        createdLevel.groundColor = [48, 99, 181];
    }
}
