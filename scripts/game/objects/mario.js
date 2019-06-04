function Mario(x, y){
    this.x = x;
    this.y = y;
    this.w = 35;
    this.h = 65.33;
}
Mario.prototype.run = function(){
    this.display();
}
Mario.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(imgs.mario.walk[0], 0, 0, this.w, this.h);
    pop();
}
