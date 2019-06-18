function MapMario(x, y){
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.w = imgs.worldMap.mario[0].width*1.5;
    this.h = imgs.worldMap.mario[0].height*1.5;
    this.moving = false;
    this.xvel = 0;
}
MapMario.prototype.run = function(){
    this.display();
    if(!this.moving){
        this.control();
    } else{
        this.update();
    }
}
MapMario.prototype.update = function(){
    this.x += this.xvel;
    if(this.xvel === 3){
        if(this.x >= this.destX){
            this.x = this.destX;
            this.moving = false;
        }
    } else{
        if(this.x <= this.destX){
            this.x = this.destX;
            this.moving = false;
        }
    }
}
MapMario.prototype.control = function(){
    if(keys[RIGHT_ARROW]||keys.d){
        if(this.x+50<=(worldMap.spaces.length-1) * 75 + 75){
            this.xvel = 3;
            this.moving = true;
            this.destX = this.x+75;
        }
    }
    if(keys[LEFT_ARROW]||keys.a){
        if(this.x !== 95){
            this.xvel = -3;
            this.moving = true;
            this.destX = this.x-75;
        }
    }
    if(keys[32] && this.x !== 95){
        this.collide();
        music.worldMap.stop();
        scene = "gameLoad";
    }
}
MapMario.prototype.collide = function(){
    for(var i = 0; i<worldMap.spaces.length; i++){
        if(i !== 0){
            let x = i * 75+75;
            if(this.x+this.w/2>x&&this.x-this.w/2<x + 40){
                world.levelToLoad = i-1;
            }
        }
    }
}
MapMario.prototype.display = function(){
    this.frame += 0.05;
    if(this.frame>1){
        this.frame = 0;
    }
    this.img = imgs.worldMap.mario[round(this.frame)];
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
