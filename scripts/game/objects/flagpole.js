function FlagPole(x, y){
    this.x = x;
    this.y = y;
    this.w = 64;
    this.h = 431;
    this.y -= 380;
    this.complete = false;
    this.wait = 0;
    this.x -= 24;
    this.y -= 2;
}
FlagPole.prototype.run = function(p){
    this.display();
    if(!this.complete){
        this.collide(p);
    } else{
        this.wait ++;
        if(this.wait > 180){
            p.direction = -1;
        }
        if(this.wait>sounds.levelComplete.duration() * 60){
            scene = "worldmapinit";
            if(world.returnDest === "worldmapinit") worldMap.levelsCleared ++;
            if(world.levelToLoad === createdLevel) scene = "createdlevel";
            if(world.returnDest === "communitylevels") scene = "communitylevels";
        }
    }
}
FlagPole.prototype.collide = function(p){
    if(p.x+p.w/2>this.x&&p.x-p.w/2<this.x+this.w&&p.y+p.h/2>this.y&&p.y-p.h/2<this.y+this.h){
        sounds.levelComplete.play();
        p.canMove = false;
        p.xvel = 12;
        stopMusic();
        world.levelComplete = true;
        this.complete = true;
    }
}
FlagPole.prototype.display = function(){
    push();
    imageMode(LEFT);
    translate(this.x+this.w, this.y);
    scale(-1, 1);
    image(imgs.flagPole, 0, 0, this.w, this.h);
    pop();
}
