function Ground(x, y){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 48;
}
Ground.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Ground.prototype.collide = function(p){
    let xvel = abs(p.xvel);
    let yvel = abs(p.yvel);
    if(p.x+p.w/2>this.x&&p.x-p.w/2<this.x+this.w&&p.y+p.h/2>this.y&&p.y-p.h/2<this.y+this.h){
        if(p.y+p.h/2-1-yvel>this.y&&p.y-p.h/2+1+yvel<this.y+this.h){
			if(p.x-p.w/2<this.x){
				p.x = this.x-p.w/2;
			} else if(p.x+p.w/2>this.x+this.w){
				p.x = this.x+this.w+p.w/2;
                p.xvel = max(p.xvel, 0);
			}
		}
        if(p.x+p.w/2-xvel-1>this.x&&p.x-p.w/2+xvel+1<this.x+this.w){
			if(p.y-p.h/2<this.y){
				p.y = this.y-p.h/2;
                p.yvel = 0;
                p.grounded = true;
			} else if(p.y+p.h/2>this.y+this.h){
				p.y = this.y+this.h+p.h/2;
                p.yvel *= -1;
			}
		}
    }
}
Ground.prototype.display = function(){
    push();
    fill(175, 118, 10);
    rect(this.x, this.y, this.w, this.h);
    pop();
}
