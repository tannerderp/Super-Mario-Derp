function Goomba(x,y){
    this.x = x;
    this.y = y;
    this.img = imgs.goomba.idle;
    this.w = 40;
    this.h = 40;
}
Goomba.prototype.run = function(){
    this.display();
}
Goomba.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(0.625);
    image(this.img, 0, 0);
    pop();
}
