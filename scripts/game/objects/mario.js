function Mario(x, y){
    this.x = x;
    this.y = y;
    this.w = 35;
    this.h = 65.3333333333;
    this.xvel = 0;
    this.yvel = 0;
    this.frame = 0;
    this.frameChange = 1;
    this.health = 3;
    this.show = true;
    this.hurtCooldown = 0;
    this.coins = 0;
    this.canMove = true;
    this.img = imgs.mario.walk[0];
    this.x += 24;
    this.y += 14;
    this.deathAnimation = false;
}
Mario.prototype.run = function(){
    this.update();
    if(this.canMove){
        this.control();
    }
    if(this.show){
        if(this.deathAnimation) this.img = imgs.mario.death;
        this.display();
    }
    this.grounded = false;
}
Mario.prototype.displayHealth = function(x, y){
    push();
    translate(x, y);
    scale(0.75);
    switch(this.health){
        case 3: fill(11, 49, 239); break;
        case 2: fill(242, 208, 16); break;
        case 1: fill(204, 12, 12); break;
        case 0: fill(0, 0, 0); break;
    }
    ellipse(0, 0, 75, 75);
    textFont(fonts.mario);
    fill(0, 0, 0);
    textSize(65);
    textAlign(CENTER, CENTER);
    text(this.health, 0, 0);
    pop();
}
Mario.prototype.displayCoins = function(x, y){
    push();
    translate(x, y);
    scale(0.75);
    push();
    scale(0.125);
    imageMode(CENTER);
    image(imgs.coin, 0, 0);
    pop();
    textSize(40);
    fill(0, 0, 0);
    textAlign(CENTER);
    textFont(fonts.mario);
    text(" : ", 20, 10);
    text(this.coins, 50, 15);
    pop();
}
Mario.prototype.displayLives = function(x, y){
    push();
    translate(x, y);
    scale(0.75);
    push();
    imageMode(CENTER);
    scale(0.75);
    image(imgs.mario.walk[0], 0, 0);
    pop();
    textSize(40);
    fill(0, 0, 0);
    textAlign(CENTER);
    textFont(fonts.mario);
    text(" : ", 20, 10);
    text(worldMap.lives, 50, 15);
    pop();
}
Mario.prototype.damage = function(){
    this.health --;
    sounds.mario.hurt.play();
    this.hurt = true;
}
Mario.prototype.update = function(){
    if(this.xvel>0.42||this.xvel<-0.42){
        if(this.frame>=4){
            if(this.running){
                this.frameChange = -0.3333333333;
            } else{
                this.frameChange = -0.25;
            }
        } else if(this.frame<=0){
            if(this.running){
                this.frameChange = 0.3333333333;
            } else{
                this.frameChange = 0.25;
            }
        }
        this.frame += this.frameChange;
    } else{
        this.frame = 0;
    }
    if(this.yvel>0){
        this.img = imgs.mario.fall;
    } else if(this.yvel<0){
        this.img = imgs.mario.jump;
    } else{
        this.img = imgs.mario.walk[round(this.frame/2)];
    }
    if(!this.grounded) this.yvel += 0.225;
    this.y += this.yvel;
    this.yvel = constrain(this.yvel, -10, 8);
    this.xvel *= 0.9;
    this.x += this.xvel;
    if(this.hurt){
        if(frameCount%5===0){
            if(this.show){
                this.show = false;
            } else{
                this.show = true;
            }
        }
        this.hurtCooldown ++;
        if(this.hurtCooldown>100){
            this.hurt = false;
            this.hurtCooldown = 0;
            this.show = true;
        }
    }
    if((this.health<1 || this.y-this.h/2>(world.map.length*47))&&world.deathWait === 0&&!world.levelComplete){
        this.show = true;
        this.hurt = true;
        world.death();
    }
}
Mario.prototype.control = function(){
    this.running = false;
    if(keys.z || keys[32] || keys.x){
        this.running = true;
    }
    if(keys[RIGHT_ARROW]||keys.d){
        this.xvel += 0.45;
        if(this.running) this.xvel += 0.175;
        this.direction = 1;
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.xvel -= 0.45;
        if(this.running) this.xvel -= 0.175;
        this.direction = -1;
    }
    if((keys[UP_ARROW]||keys.w)&&this.grounded){
        this.y --;
        sounds.mario.jump.play();
        this.yvel = -10;
    }
}
Mario.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(this.direction, 1);
    scale(1.166666667);
    if(this.deathAnimation) scale((imgs.mario.walk[0].width * 1.166666667)/imgs.mario.death.width)
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
}
