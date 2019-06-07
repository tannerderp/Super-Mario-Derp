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
