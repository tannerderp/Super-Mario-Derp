let objectMenu = {
    blocksKey: ["#", "=", "|", "%", "?", "&", "b", "F"],
    objectsKey: ["m", "C", "P", "G", "K", "R", "p", "S", "M"],
    page: "blocks",
}
objectMenu.run = function(){
    if(releaseKeys[32]){
        scene = "leveleditor";
    }
    this.display();
}
objectMenu.blockCollide = function(){
    for(var i in this.blocks){
        var b = this.blocks[i];
        if(mouseX>b.x&&mouseX<b.x+b.w&&mouseY>b.y&&mouseY<b.y+b.h){
            cursor(HAND);
            if(clicked){
                levelEditor.placingBlock = this.blocksKey[i];
                scene = "leveleditor";
            }
        }
    }
}
objectMenu.objectCollide = function(){
    for(var i in this.objects){
        var o = this.objects[i];
        if(i === 1){
            if(mouseX>o.x&&mouseX<o.x+o.w&&mouseY>o.y&&mouseY<o.y+o.h){
                cursor(HAND); //coins aren't centered like the rest of the objects, so they have to have different collisions
                if(clicked){
                    levelEditor.placingBlock = this.objectsKey[i];
                    scene = "leveleditor";
                }
            }
        } else{
            if(mouseX>o.x-o.w/2&&mouseX<o.x+o.w/2&&mouseY>o.y-o.h/2&&mouseY<o.y+o.h/2){
                cursor(HAND);
                if(clicked){
                    levelEditor.placingBlock = this.objectsKey[i];
                    scene = "leveleditor";
                }
            }
        }
    }
}
objectMenu.display = function(){
    background(255, 255, 255);
    push();
    noStroke();
    fill(66, 116, 244);
    rect(0, 0, width, 75);
    pop();
    this.pageButton(width/2-75, 38, "blocks");
    this.pageButton(width/2+75, 38, "objects");
    if(this.page === "blocks"){
        this.blockCollide();
        for(var i in this.blocks){
            this.blocks[i].display();
            if(this.blocks[i].editorDisplay){
                this.blocks[i].editorDisplay();
            }
        }
    } else if(this.page === "objects"){
        this.objectCollide();
        for(var i in this.objects){
            this.objects[i].display();
            if(this.objects[i].editorDisplay){
                this.objects[i].editorDisplay();
            }
        }
    }
}
objectMenu.init = function(){
    this.blocks = [];
    for(var i in this.blocksKey){
        var o = world.getObject(this.blocksKey[i]);
        this.blocks.push(new (o)(100*i+10, height/2-60));
        if(this.blocks[i].x>=400){
            this.blocks[i].x = 100*i - 400;
            this.blocks[i].y = height/2+60;
        }
    }
    this.objects = [];
    for(var i in this.objectsKey){
        var x = world.getObject(this.objectsKey[i])
        if(Array.isArray(x)){
            var o = x[1];
            this.objects.push(new (o)(100 * i+30, height/2-60));
            if(this.objects[i].x>=400){
                this.objects[i].x = 100*i - 400+30;
                this.objects[i].y = height/2+60;
            }
        } else{
            this.objects.push(new Mario(30, height/2+120));
        }
    }
    scene = "objectmenu";
}
objectMenu.pageButton = function(x, y, txt){
    push();
    if(this.page === txt){
        fill(162, 187, 249);
        noStroke();
        rect(x-5-txt.length*5, y-10, txt.length*10+8, 20);
    }
    fill(0, 0, 0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(txt, x, y);
    if(mouseX>x-txt.length*5&&mouseX<x+txt.length*5&&mouseY>y-10&&mouseY<y+10){
        cursor(HAND);
        if(clicked){
            this.page = txt;
        }
    }
    pop();
}
