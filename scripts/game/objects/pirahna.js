function Pirahna(x, y){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 72;
    this.frame = 0;
    this.y += 16;
    this.yvel = 0;
    this.wait  = 0;
    this.maxY = this.y;
    this.minY = this.y+this.h+1;
    this.pipeH = (this.y+this.h/2)-height;
}
Pirahna.prototype.run = function(p){
    this.update();
    this.touchingPipe = false;
    this.collide(p);
    this.display();
}
Pirahna.prototype.collide = function(p){
    if(p.x+p.w/2>this.x-this.w/2&&p.x-p.w/2<this.x+this.w/2&&p.y+p.h/2>this.y-this.h/2&&p.y-p.h/2<this.y+this.h/2){
        if(!p.hurt){
            p.damage();
        }
    }
    let x = this.x-this.w; //x and y of the pipe
    let y = this.y+this.h/2
    let w = 96; //width and height of pipe
    let h = y-height;
    if(p.x+p.w/2>x-1&&p.x-p.w/2<x+w+1&&((y-10)-p.y+p.h/2>=132||p.y+p.h/2>this.y-2)&&p.y-p.h/2<y+this.pipeH){
        this.touchingPipe = true;
    }
}
Pirahna.prototype.update = function(){
    this.img = imgs.pirahna[round(this.frame)];
    this.frame += 0.0625;
    if(this.frame>1){
        this.frame = 0;
    }
    this.y += this.yvel;
    if(this.y <= this.maxY){
        this.wait ++;
        if(this.wait > 60){
            this.yvel = 2;
            while(this.y <= this.maxY){
                this.y ++;
            }
            this.wait = 0;
        } else {
            this.yvel = 0;
        }
    }
    if(this.y >= this.minY){
        this.yvel = 0;
        if(!this.touchingPipe){
            this.wait ++;
        } else{
            this.wait = 0;
        }
        if(this.wait > 60){
            this.yvel = -2;
            while(this.y >= this.minY){
                this.y --;
            }
            this.wait = 0;
        } else{
            this.yvel = 0;
        }
    }
}
Pirahna.prototype.display = function(){
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
