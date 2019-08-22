let communityLevels = {
    levels: undefined,
}
communityLevels.run = function(){
    background(164, 194, 242);
    push();
    fill(0,0,0);
    textFont(fonts.mario);
    textSize(30);
    textAlign(CENTER);
    text("Community Levels", width/2, 50);
    pop();
    button(75, height-25, 150, 50, 2, color(216, 22, 19), "Home", 30, function(){
        scene = "home";
    });
    let x = 75, y = 100;
    for(var i in this.levels){
        communityLevelButton(x, y, this.levels[i]);
        x += 125;
        if(x > width-50){
            x = 75;
            y += 75;
        }
    }
    if(this.levels === undefined){
        push();
        fill(0, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Loading...", width/2, height/2);
        pop();
    }
}
communityLevels.init = function(){
    getCommunityLevels();
    scene = "communitylevels";
}
function getCommunityLevels(){
    $.getJSON("https://super-mario-derp.herokuapp.com/levels", function(json){
        communityLevels.levels = json;
        console.log(communityLevels.levels);
    }).catch(function(){
        console.log("Failed to get Levels");
    });
}
//getCommunityLevels();
function communityLevelButton(x, y, level){
    push();
    rectMode(CENTER);
    fill(216, 22, 19);
    strokeWeight(2);
    rect(x, y, 100, 50, 2);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(level.name, x, y, 100, 50);
    textSize(10);
    text("By "+level.creator, x, y+20, 100, 50);
    pop();
    if(mouseX>x-50&&mouseX<x+50&&mouseY>y-25&&mouseY<y+25){
        cursor(HAND);
        if(clicked){
            world.levelToLoad = level;
            world.returnDest = "communitylevels";
            scene = "gameLoad";
        }
    }
}
