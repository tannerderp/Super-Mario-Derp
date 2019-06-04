let scene = "gameLoad";
function setup(){
    createCanvas(1600, 900);
}
function draw(){
    switch(scene){
        case"game":world.run();break;
        case"gameLoad":world.init();break;
    }
}
