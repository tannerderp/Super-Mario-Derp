function Shell(x, y, type, img, s){
    this.x = x;
    this.y = y;
    this.type = type || false;
    this.img = img || imgs.koopa.shell;
    this.s = s || 48/this.img.width; //scale factor
    this.w = 48;
    this.h = this.s * this.img.height;
    this.speed = 0;
    this.yvel = 0;
    this.isShell = true; //so enemies can do collisions
    this.wait = 0;
}
Shell.prototype.run = function(p){
    this.display();
    this.update();
    this.collide(p);
}
Shell.prototype.collide = function(p){
    let xvel = abs(this.speed);
    let yvel = abs(this.yvel);
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
            if(this.speed !== 0){
                this.wait = 0;
            }
            this.speed = 0;
            p.y = this.y-this.h/2-p.h/2-1;
            p.yvel = -8;
        } else{
            if(this.speed === 0){
                sounds.kick.play();
                if(p.x<this.x){
                    this.speed = 5;
                    this.x = p.x+p.w/2+this.w/2+1;
                } else{
                    this.speed = -5;
                    this.x = p.x-p.w/2-this.w/2-1;
                }
            } else{
                if(!p.hurt){
                    p.damage();
                }
            }
        }
    }
}
Shell.prototype.update = function(){
    this.y += this.yvel;
    this.yvel += 0.225;
    this.x += this.speed;
    if(this.speed === 0 && this.type){
        this.wait ++;
    }
    if(this.wait > 600){
        this.dead = true;
        world.objects.push(new (this.type)(this.x, this.y));
    }
}
Shell.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(this.s);
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
}
