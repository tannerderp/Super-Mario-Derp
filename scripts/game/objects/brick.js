function Brick(x, y){
    Ground.call(this, x, y);
}
Brick.prototype = Object.create(Ground.prototype);
Brick.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.brick, 0, 0, this.w, this.h)
    pop();
}
