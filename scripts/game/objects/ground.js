function Ground(x, y){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 48;
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
