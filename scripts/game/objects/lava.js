function Lava(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.lava.top[0];
    this.w = 48;
    this.h = 48;
    this.frame = 0;
}
Lava.prototype.run = function(p){
    this.display();
    this.collide(p);
    this.update();
}
Lava.prototype.collide = function(p){
    if(p.x+p.w/2>this.x&&p.x-p.w/2<this.x+this.w&&p.y+p.h/2>this.y&&p.y-p.h/2<this.y+this.h){
        p.health = 0;
    }
}
Lava.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
Lava.prototype.update = function(){
    this.frame += 0.1;
    if(this.frame > 4) this.frame = 0;
    this.img = imgs.lava.top[round(this.frame)];
}
function LavaBottom(x, y){
    Lava.call(this, x, y);
    this.img = imgs.lava.bottom;
}
LavaBottom.prototype = Object.create(Lava.prototype);
LavaBottom.prototype.update = function(){
    this.img = imgs.lava.bottom;
}
