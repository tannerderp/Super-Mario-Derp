let scene = "game";
function setup(){
    createCanvas(1600, 900);
}
function draw(){
    switch(scene){
        case"game":world.run();break;
    }
}
