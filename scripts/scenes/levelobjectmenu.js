let objectMenu = {
    blocksKey: ["#", "=", "|", "%", "?", "&", "F"],
}
objectMenu.run = function(){
    if(releaseKeys[32]){
        scene = "leveleditor";
    }
    this.display();
    this.blockCollide();
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
objectMenu.display = function(){
    background(255, 255, 255);
    for(var i in this.blocks){
        this.blocks[i].display();
        if(this.blocks[i].editorDisplay){
            this.blocks[i].editorDisplay();
        }
    }
}
objectMenu.init = function(){
    this.blocks = [];
    for(var i in this.blocksKey){
        var o = world.getObject(this.blocksKey[i]);
        this.blocks.push(new (o)(100*i, height/2));
        if(this.blocks[i].x>=400){
            this.blocks[i].x = 100*i - 400;
            this.blocks[i].y = height/2+60;
        }
    }
    scene = "objectmenu";
}
