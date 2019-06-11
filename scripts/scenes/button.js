function button(x, y, w, h, r, color, txt, txtSize, func){
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(color);
    strokeWeight(2);
    rect(x, y, w, h, r);
    fill(0, 0, 0);
    textSize(txtSize);
    text(txt, x, y);
    pop();
    if(mouseX>x-w/2&&mouseX<x+w/2&&mouseY>y-h/2&&mouseY<y+h/2){
        cursor(HAND);
        if(clicked){
            func();
        }
    }
}
