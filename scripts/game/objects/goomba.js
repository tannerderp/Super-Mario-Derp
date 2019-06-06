function Goomba(x,y){
    this.x = x;
    this.y = y;
    this.img = imgs.goomba.idle;
    this.w = 40;
    this.h = 40;
    this.speed = -2.5;
    this.yvel = 0;
    this.direction = 1;
}
Goomba.prototype.run = function(p){
    if(this.deadWait>0){
        this.deadWait ++;
        this.img = imgs.goomba.dead;
        if(this.deadWait>30){
            this.dead = true;
        }
    } else{
        this.update();
        this.collide(p);
    }
    this.display();
}
Goomba.prototype.collide = function(p){
    let xvel = abs(this.speed);
    let yvel = abs(this.yvel)
    for(var i in world.blocks){
        let w = world.blocks[i];
        if(this.x+this.w/2>w.x&&this.x-this.w/2<w.x+w.w&&this.y+this.h/2>w.y&&this.y-this.h/2<w.y+w.h){
            if(this.x+this.w/2-xvel-1>w.x&&this.x-this.w/2+xvel+1<w.x+w.w){
    			if(this.y-this.h/2<w.y){
    				this.y = w.y-this.h/2;
                    this.yvel = 0;
    			} else if(this.y+this.h/2>w.y+w.h){
    				this.y = w.y+w.h+this.h/2;
                    this.yvel *= -1;
    			}
    		}
            if(this.y+this.h/2-1-yvel>w.y&&this.y-this.h/2+1+yvel<w.y+w.h){
    			if(this.x-this.w/2<w.x||this.x+this.w/2>w.x+w.w){
    				this.speed *= -1;
    			}
    		}
        }
    }
    if(p.x+p.w/2>this.x-this.w/2&&p.x-p.w/2<this.x+this.w/2&&p.y+p.h/2>this.y-this.h/2&&p.y-p.h/2<this.y+this.h/2){
        if(p.y+p.h/2>this.y-this.h/2&&p.y+p.h/2<this.y){
            this.y += this.h/4;
            this.deadWait = 1;
            p.yvel = -8;
            p.y = this.y-this.h/2-p.h/2-1;
            sounds.enemy.squash.play();
        } else{
            if(!p.hurt){
                p.damage();
            }
        }
    }
    for(var i in world.objects){
        var o = world.objects[i];
        if(o.x !== this.x && o.y !== this.y){ //check that it's not itself
            if(this.x+this.w/2>o.x-o.w/2&&this.x-this.w/2<o.x+o.w/2&&this.y+this.h/2>o.y-o.h/2&&this.y-this.h/2<o.y+o.h/2){
                if(o.isShell&&o.speed !== 0){
                    this.dead = true;
                    sounds.kick.play();
                } else{
                    this.speed *= -1;
                }
            }
        }
    }
}
Goomba.prototype.update = function(){
    this.y += this.yvel;
    this.yvel += 0.1;
    this.yvel = constrain(this.yvel, -10, 6.5);
    this.x += this.speed;
    if(frameCount%10===0){
        if(this.direction === 1){
            this.direction = -1;
        } else{
            this.direction = 1;
        }
    }
}
Goomba.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(0.625);
    scale(this.direction, 1);
    image(this.img, 0, 0);
    pop();
}
