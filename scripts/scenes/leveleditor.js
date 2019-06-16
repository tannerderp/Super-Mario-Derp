let levelEditor = {
    scroll: 0,
    size: 0,
    placedMario: false,
}
levelEditor.run = function(){
    background(255, 255, 255);
    this.control();
    if(this.placingBlock&&clicked){
        this.placeBlock();
    }
    push();
    if(this.scroll>this.levelLength-this.screenWidth/2){
        translate((-this.levelLength+this.screenWidth)*this.size, 0);
    }else if(this.scroll>this.screenWidth/2){
        translate((-this.scroll+this.screenWidth/2)*this.size, 0);
    }
    world.background = createdLevel.background;
    world.displayBackground(this.levelLength);
    scale(this.size);
    this.displayGrid();
    for(var i in this.blocks){
        this.blocks[i].display();
        if(this.blocks[i].editorDisplay){
            this.blocks[i].editorDisplay();
        }
    }
    for(var i in this.objects){
        this.objects[i].display();
        if(this.objects[i].editorDisplay){
            this.objects[i].editorDisplay();
        }
    }
    if(this.player) this.player.display();
    pop();
    if(this.erasing){
        this.displayEraser(mouseX, mouseY);
        if(clicked){
            this.erase();
            this.erasing = false;
        }
    } else{
        this.displayEraser(width-15, 15);
        if(mouseX>width-25&&mouseX<width&&mouseY>0&&mouseY<25){
            cursor(HAND);
            if(clicked){
                this.placingBlock = undefined;
                this.erasing = true;
                this.erase();
            }
        }
    }
    if(this.placedMario){
        this.runButton(width-45, 15);
    }
}
String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
levelEditor.placeBlock = function(){
    for(var i in createdLevel.map){
        for(var j in createdLevel.map[i]){
            let x = j * 47;
            let y = i * 47;
            let scroll = 0;
            if(this.scroll>this.screenWidth/2){
                scroll = this.scroll-this.screenWidth/2;
            }
            let MouseX = (mouseX/this.size)+scroll;
            if(MouseX>x&&MouseX<x+48&&mouseY/this.size>y&&mouseY/this.size<y+48){
                if(this.placedMario&&this.placingBlock==="M") this.placingBlock = " ";
                createdLevel.map[i] = createdLevel.map[i].replaceAt(j, this.placingBlock);
                if(this.placingBlock === "M" && !this.placedMario){
                    this.placedMario = true;
                }
                if(this.placingBlock === "M") this.placingBlock = "";
                this.reload();
            }
        }
    }
}
levelEditor.erase = function(){
    for(var i in createdLevel.map){
        for(var j in createdLevel.map[i]){
            let x = j * 47;
            let y = i * 47;
            let scroll = 0;
            if(this.scroll>this.screenWidth/2){
                scroll = this.scroll-this.screenWidth/2;
            }
            let MouseX = (mouseX/this.size)+scroll;
            if(MouseX>x&&MouseX<x+48&&mouseY/this.size>y&&mouseY/this.size<y+48){
                if(createdLevel.map[i][j] === "M") this.placedMario = false;
                createdLevel.map[i] = createdLevel.map[i].replaceAt(j, " ");
                this.reload();
            }
        }
    }
}
levelEditor.displayEraser = function(x, y){
    push();
    stroke(216, 21, 21);
    strokeWeight(2);
    line(x-10, y-10, x+10, y+10);
    line(x+10, y-10, x-10, y+10);
    pop();
}
levelEditor.runButton = function(x, y){
    push();
    noStroke();
    fill(255, 255, 255);
    triangle(x-10, y-10, x+10, y, x-10, y+10);
    pop();
    if(mouseX>x-10&&mouseX<x+10&&mouseY>y-10&&mouseY<y+10){
        cursor(HAND);
        if(clicked){
            this.erase();
            world.levelToLoad = createdLevel;
            scene = "gameLoad";
        }
    }
}
levelEditor.control = function(){
    this.scroll = constrain(this.scroll, this.screenWidth/2, this.levelLength-this.screenWidth/2);
    if(keys[RIGHT_ARROW]||keys.d){
        this.scroll += 5;
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.scroll -= 5;
    }
    if(releaseKeys[32]){
        this.erasing = false;
        scene = "objectmenuinit";
    }
}
levelEditor.displayGrid = function(){
    for(var i in createdLevel.map){
        for(var j in createdLevel.map[i]){
            let x = j * 47;
            let y = i * 47;
            push();
            fill(255, 255, 255, 0);
            stroke(0, 0, 0);
            strokeWeight(0.5);
            rectMode(LEFT);
            rect(x, y, 48, 48);
            pop();
        }
    }
}
levelEditor.init = function(){
    this.size = height/(createdLevel.map.length*47);
    this.screenWidth = width/this.size;
    this.levelLength = createdLevel.map[0].length*47;
    this.erasing = false;
    this.placedMario = false;
    this.scroll = 0;
    for(var i in createdLevel.map){
        for(var j in createdLevel.map[i]){
            if(createdLevel.map[i][j]==="M") this.placedMario = true;
        }
    }
    this.reload();
    scene = "leveleditor";
}
levelEditor.reload = function(){
    this.blocks = [];
    this.objects = [];
    this.player = undefined;
    let map = createdLevel.map;
    for(var i in map){
        for(var j in map[i]){
            let c = map[i][j];
            let x = j * 47;
            let y = i * 47;
            let o = world.getObject(c);
            if(o === "player"){
                this.player = new Mario(x, y);
            } else if(Array.isArray(o)){
                this.objects.push(new (o[1])(x, y));
            }else if(o){
                this.blocks.push(new (o)(x, y));
            }
        }
    }
}
