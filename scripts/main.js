let scene = "home", smallest, nameBox;
function setup(){
    smallest = min(windowWidth, windowHeight);
    let canvas = createCanvas(smallest, smallest);
    width = 400;
    height = 400;
    canvas.position((windowWidth-smallest)/2, (windowHeight-smallest)/2);
    nameBox = createInput("", "text");
    nameBox.attribute("placeholder", "name");
    nameBox.addClass("name");
    nameBox.position(-500, -500);
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
        case"levelname":levelName();break;
        case"levelbackground":levelBackground();break;
        case"levelmusic":levelMusic.run();break;
        case"levelmusicinit":levelMusic.init();break;
        case"levellength":levelLength();break;
        case"leveleditor":levelEditor.run();break;
        case"leveleditorinit":levelEditor.init();break;
    }
    pop();
    clicked = false;
}
