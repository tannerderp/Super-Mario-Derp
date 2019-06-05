function Shell(x, y, s, img){
    this.x = x;
    this.y = y;
    this.img = img || imgs.koopa.shell;
    this.s = s || 48/this.img.width; //scale factor
    this.w = 48;
    this.h = this.s * this.img.height;
    this.speed = 0;
    this.yvel = 0;
    this.isShell = true; //so enemies can do collisions
}
Shell.prototype.run = function(p){
    this.display();
    this.update();
}
Shell.prototype.update = function(){
    this.y += this.yvel;
    this.yvel += 0.225;
}
Shell.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(this.s);
    image(this.img, 0, 0);
    pop();
}
