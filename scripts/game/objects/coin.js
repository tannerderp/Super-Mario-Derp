function Coin(x, y){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 48;
}
Coin.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Coin.prototype.collide = function(p){
    if(p.x+p.w/2>this.x&&p.x-p.w/2<this.x+this.w&&p.y+p.h/2>this.y&&p.y-p.h/2<this.y+this.h){
        this.dead = true;
        p.coins ++;
        sounds.coin.play();
    }
}
Coin.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.coin, 0, 0, this.w, this.h);
    pop();
}
