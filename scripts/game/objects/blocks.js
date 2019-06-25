//in order for object inheritance to work 100% of the time, these all have to be in the same script
//ground
{
function Ground(x, y){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 48;
    this.showTop = true;
    this.isGround = true;
}
Ground.prototype.run = function(p){
    this.showTop = true;
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
                p.xvel = min(p.xvel, 0);
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
                if(this.topCollide) this.topCollide(p);
			} else if(p.y+p.h/2>this.y+this.h){
				p.y = this.y+this.h+p.h/2;
                p.yvel *= -1;
                if(this.bottomCollide){
                    this.bottomCollide();
                }
			}
		}
    }
}
Ground.prototype.display = function(){
    let l;
    if(!inEditor) l = world;
    if(inEditor) l = levelEditor;
    this.showTop = true;
    for(var i in l.blocks){
        var w = l.blocks[i];
        if(w.isGround){ //cant use instanceof because of object inheritance
            if(this.x === w.x&&this.y+this.h>w.y+w.h-3&&this.y-2<w.y+w.h&&this.y !== w.y){
                this.showTop = false;
            }
        }
    }
    push();
    translate(this.x, this.y);
    if(inEditor){
        fill(createdLevel.groundColor);
    } else{
        fill(world.groundColor);
    }
    noStroke();
    rect(0, 0, this.w, this.h);
    if(this.showTop){
        if(inEditor){
            fill(createdLevel.topGroundColor);
        } else{
            fill(world.topGroundColor);
        }
        rect(0, 0, this.w, 10);
    }
    pop();
}
}
//Brick
{
function Brick(x, y){
    Ground.call(this, x, y);
    this.isGround = false;
}
Brick.prototype = Object.create(Ground.prototype);
Brick.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.brick, 0, 0, this.w, this.h)
    pop();
}
}
//item block
{
function ItemBlock(x, y){
    Ground.call(this, x, y);
    this.frame = 0;
    this.hit = false;
    this.isGround = false;
}
ItemBlock.prototype = Object.create(Ground.prototype);
ItemBlock.prototype.display = function(){
    if(!this.hit){
        this.img = imgs.itemBlock.idle[round(this.frame)];
        this.frame += 0.125;
        if(this.frame > 3){
            this.frame = 0;
        }
    } else{
        this.img = imgs.itemBlock.hit;
    }
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
ItemBlock.prototype.bottomCollide = function(){
    if(!this.hit){
        world.player.coins ++;
        sounds.coin.play();
    }
    this.hit = true;
}
function MushroomItemBlock(x, y){
    ItemBlock.call(this, x, y);
    this.isGround = false;
}
MushroomItemBlock.prototype = Object.create(ItemBlock.prototype);
MushroomItemBlock.prototype.bottomCollide = function(){
    if(!this.hit){
        world.objects.push(new Mushroom(this.x+this.w/2, this.y-this.h/2));
    }
    this.hit = true;
}
MushroomItemBlock.prototype.editorDisplay = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.mushroom, 10, 10, this.w-20, this.h-20);
    pop();
}
}
//Pipe
{
function Pipe(x, y){ //top part of the pipe
    Ground.call(this, x, y);
    this.w = 96;
    this.isGround = false;
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
    this.h = 48;
    this.x += 96/14;
    this.isGround = false;
}
PipeBottom.prototype = Object.create(Ground.prototype);
PipeBottom.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.pipe.bottom, 0, 0, this.w, this.h);
    pop();
}
}
//note block
{
function NoteBlock(x, y){
    Brick.call(this, x, y);
}
NoteBlock.prototype = Object.create(Brick.prototype);
NoteBlock.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.noteBlock, 0, 0, this.w, this.h)
    pop();
}
NoteBlock.prototype.topCollide = function(p){
    p.grounded = false;
    p.y --;
    p.yvel = -14;
}
}
//platform
{
function Platform(x, y){
    Ground.call(this, x, y);
    this.h = (48/imgs.bridge[0].width)*imgs.bridge[0].height;
}
Platform.prototype = Object.create(Ground.prototype);
Platform.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x, this.y);
    image(imgs.bridge[0], 0, 0, this.w, this.h);
    push();
    translate(0, -this.h);
    scale(48/imgs.bridge[0].width);
    image(imgs.bridge[1], 0, 0);
    pop();
    pop();
}
Platform.prototype.collide = function(p){
    let xvel = abs(p.xvel);
    let yvel = abs(p.yvel);
    if(p.x+p.w/2>this.x&&p.x-p.w/2<this.x+this.w&&p.y+p.h/2>this.y&&p.y-p.h/2<this.y+1+yvel&&p.yvel>0){
        if(p.x+p.w/2-xvel-1>this.x&&p.x-p.w/2+xvel+1<this.x+this.w){
			if(p.y-p.h/2<this.y&&p.y+p.h/2<this.y+this.h){
				p.y = this.y-p.h/2;
                p.yvel = 0;
                p.grounded = true;
                if(this.topCollide) this.topCollide(p);
			}
		}
    }
}
}
