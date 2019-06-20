let openingWait = 0;
function opening(){
    background(0, 0, 0);
    push();
    fill(255, 255, 255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Sprites, music, and characters owned by Nintendo\n Please Don't Yeet Me Nintendo", 0, 0, width, height);
    pop();
    openingWait ++;
    if(openingWait > 100) scene = "home";
}
