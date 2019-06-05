let scene = "gameLoad";
function setup(){
    createCanvas(windowWidth, windowHeight);
}
function draw(){
    switch(scene){
        case"game":world.run();break;
        case"gameLoad":world.init();break;
    }
}
