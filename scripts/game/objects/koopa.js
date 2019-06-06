function Koopa(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.koopa.idle[0];
    this.w = 40;
    this.h = 0.81632653061*imgs.koopa.idle[0].height;
    this.speed = 2.5;
    this.yvel = 0;
    this.frame = 0;
    this.direction = -1;
}
Koopa.prototype.run = function(p){
    this.display();
    this.update();
    this.collide(p);
}
Koopa.prototype.collide = function(p){
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
                    this.direction *= -1;
    			}
    		}
        }
    }
    if(p.x+p.w/2>this.x-this.w/2&&p.x-p.w/2<this.x+this.w/2&&p.y+p.h/2>this.y-this.h/2&&p.y-p.h/2<this.y+this.h/2){
        if(p.y+p.h/2>this.y-this.h/2&&p.y+p.h/2<this.y){
            this.dead = true;
            p.yvel = -8;
            p.y = this.y-this.h/2-p.h/2-1;
            sounds.enemy.squash.play();
            world.objects.push(new Shell(this.x, this.y, Koopa));
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
                    this.direction *= -1;
                }
            }
        }
    }
}
Koopa.prototype.update = function(){
    this.y += this.yvel;
    this.yvel += 0.1;
    this.yvel = constrain(this.yvel, -10, 6.5);
    this.x += this.speed;
    if(frameCount%15===0){
        if(this.frame === 1){
            this.frame = 0;
        } else{
            this.frame = 1;
        }
    }
    this.img = imgs.koopa.idle[this.frame];
}
Koopa.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(0.81632653061);
    scale(this.direction, 1);
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
}
