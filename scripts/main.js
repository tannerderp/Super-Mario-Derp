let scene = "home", smallest;
function setup(){
    smallest = min(windowWidth, windowHeight);
    let canvas = createCanvas(smallest, smallest);
    width = 400;
    height = 400;
    canvas.position((windowWidth-smallest)/2, (windowHeight-smallest)/2);
}
function draw(){
    cursor("default");
    push();
    mouseX = pmouseX * width / smallest
 	mouseY = pmouseY * height / smallest
    scale(smallest/width);
    switch(scene){
        case"game":world.run();break;
        case"gameLoad":world.init();break;
        case"home":home();break;
    }
    pop();
    clicked = false;
}
