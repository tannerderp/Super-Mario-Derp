function home(){
    background(164, 194, 242);
    push();
    imageMode(CENTER);
    image(imgs.logo, width/2, 50, width-10, ((width-10)/imgs.logo.width)*imgs.logo.height);
    pop();
    button(width/2, height/2, 150, 50, 2, color(216, 22, 19), "Play", 30, function(){
        scene = "gameLoad";
    });
}
