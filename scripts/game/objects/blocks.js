//in order for object inheritance to work, these all have to be in the same script
//ground
{
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
                if(this.bottomCollide){
                    this.bottomCollide();
                }
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
}
//Brick
{
function Brick(x, y){
    Ground.call(this, x, y);
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
}
MushroomItemBlock.prototype = Object.create(ItemBlock.prototype);
MushroomItemBlock.prototype.bottomCollide = function(){
    if(!this.hit){
        world.objects.push(new Mushroom(this.x+this.w/2, this.y-this.h/2));
    }
    this.hit = true;
}
}
//Pipe
{
function Pipe(x, y){ //top part of the pipe
    Ground.call(this, x, y);
    this.w = 96;
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
    this.x += 96/14;
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
