function BoomBoom(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.boomBoom.move[0];
    this.w = 96;
    this.h = (this.w/imgs.boomBoom.move[0].width)*imgs.boomBoom.move[0].height;
    this.x += 48;
    this.yvel = 0;
    this.speed = 0;
    this.frame = 0;
    this.direction = 1;
    this.health = 3;
}
BoomBoom.prototype.run = function(p){
    this.display();
    this.update(p);
    this.collide(p);
}
BoomBoom.prototype.collide = function(p){
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
                    if(this.x-this.w/2<w.x) this.x = w.x-this.w/2-3;
                    if(this.x+this.w/2>w.x+w.w) this.x = w.x+w.w+this.w/2+3;
    			}
    		}
        }
    }
    if(p.x+p.w/2>this.x-this.w/2&&p.x-p.w/2<this.x+this.w/2&&p.y+p.h/2>this.y-this.h/2&&p.y-p.h/2<this.y+this.h/2){
        if(p.y+p.h/2>this.y-this.h/2&&p.y+p.h/2<this.y&&!this.hurt){
            this.hurt = true;
            this.hurtWait = 0;
            this.direction = 1;
            this.health --;
            p.yvel = -8;
            p.y = this.y-this.h/2-p.h/2-1;
            sounds.enemy.squash.play();
        } else{
            if(!p.hurt){
                p.damage();
            }
        }
    }
}
BoomBoom.prototype.update = function(p){
    this.y += this.yvel;
    this.yvel += 0.1;
    this.yvel = constrain(this.yvel, -10, 6.5);
    this.x += this.speed;
    if(this.hurt){
        this.speed = 0;
        this.hurtWait ++;
        if(this.hurtWait>30){
            this.img = imgs.boomBoom.shell;
            if(this.health<1){
                this.dead = true;
                world.beatBoss();
            }
        } else{
            this.img = imgs.boomBoom.hurt;
        }
        if(this.hurtWait>100) this.hurt = false;
    } else{
        this.img = imgs.boomBoom.move[round(this.frame)];
        this.frame += 0.25;
        if(this.frame>imgs.boomBoom.move.length-1){
            this.frame = 0;
            this.direction *= -1;
        }
        if(p.x>this.x){
            this.speed = 3;
        } else{
            this.speed = -3;
        }
    }
}
BoomBoom.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.direction, 1);
    scale(this.w/imgs.boomBoom.move[0].width);
    image(this.img, 0, 0);
    pop();
}
