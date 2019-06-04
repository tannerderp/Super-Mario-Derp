function Ground(x, y){
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 32;
}
Ground.prototype.run = function(){
    this.display();
}
Ground.prototype.display = function(){
    push();
    fill(175, 118, 10);
    rect(this.x, this.y, this.w, this.h);
    pop();
}
