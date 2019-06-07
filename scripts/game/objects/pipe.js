function Pipe(x, y){ //top part of the pipe
    Ground.call(this, x, y);
    this.w = 96;
}
Pipe.prototype = Object.create(Ground.prototype);
Pipe.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.pipe.top, 0, 0, this.w, this.h);
    pop();
}
function PipeBottom(x, y){
    Ground.call(this, x, y);
    this.w = 0.81*96;
    this.x += 96/14;
}
PipeBottom.prototype = Object.create(Ground.prototype);
PipeBottom.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.pipe.bottom, 0, 0, this.w, this.h);
    pop();
}
