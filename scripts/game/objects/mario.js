function Mario(x, y){
    this.x = x;
    this.y = y;
    this.w = 35;
    this.h = 65.33;
    this.xvel = 0;
    this.yvel = 0;
    this.frame = 0;
    this.frameChange = 1;
}
Mario.prototype.run = function(){
    this.update();
    this.control();
    this.display();
    this.grounded = false;
}
Mario.prototype.update = function(){
    if(this.xvel>0.42||this.xvel<-0.42){
        if(this.frame>=4){
            this.frameChange = -0.25;
        } else if(this.frame<=0){
            this.frameChange = 0.25;
        }
        this.frame += this.frameChange;
    } else{
        this.frame = 0;
    }
    if(this.yvel>0){
        this.img = imgs.mario.fall;
    } else if(this.yvel<0){
        this.img = imgs.mario.jump;
    } else{
        this.img = imgs.mario.walk[round(this.frame/2)];
    }
    this.yvel += 0.2;
    this.y += this.yvel;
    this.yvel = constrain(this.yvel, -10, 5);
    this.xvel *= 0.9;
    this.x += this.xvel;
}
Mario.prototype.control = function(){
    if(keys[RIGHT_ARROW]||keys.d){
        this.xvel += 0.42;
        this.direction = 1;
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.xvel -= 0.42;
        this.direction = -1;
    }
    if((keys[UP_ARROW]||keys.w)&&this.grounded){
        this.y --;
        this.yvel = -8;
    }
}
Mario.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(this.direction, 1);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
