function Mushroom(x, y){
    this.x = x;
    this.y = y;
    this.yvel = 0;
    if(!inEditor) this.speed = world.player.direction * 2.5;
    if(inEditor) this.speed = 2.5;
    if(isNaN(this.speed)){
        this.speed = -2.5;
    }
    this.w = 48;
    this.h = 48
    this.x += 24;
    this.y += 24;
}
Mushroom.prototype.run = function(p){
    this.display();
    this.update();
    this.collide(p)
}
Mushroom.prototype.collide = function(p){
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
        if(p.health !== 3){
            p.health ++;
        }
        this.dead = true;
    }
    for(var i in world.objects){
        var o = world.objects[i];
        if(o.x !== this.x && o.y !== this.y){ //check that it's not itself
            if(this.x+this.w/2>o.x-o.w/2&&this.x-this.w/2<o.x+o.w/2&&this.y+this.h/2>o.y-o.h/2&&this.y-this.h/2<o.y+o.h/2){
                if(!o.isShell){
                    this.speed *= -1;
                }
            }
        }
    }
}
Mushroom.prototype.update = function(){
    this.y += this.yvel;
    this.yvel += 0.1;
    this.yvel = constrain(this.yvel, -10, 6.5);
    this.x += this.speed;
}
Mushroom.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(imgs.mushroom, 0, 0, this.w, this.h);
    pop();
}
