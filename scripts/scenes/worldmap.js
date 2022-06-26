let worldMap = {
    levels: [],
    lives: 5,
    marioX: 20,
    levelsCleared: 0,
}
$.getJSON("/Super-Mario-Derp/scripts/game/levels.json", function(json){
    worldMap.levels = json.levels;
});
worldMap.run = function(){
    background(41, 209, 23);
    for(var i = 0; i<this.spaces.length; i++){
        if(i !== 0){
            push();
            noStroke();
            fill(31, 74, 142);
            rect(i * 75, height/2-20, 40, 40);
            fill(0, 0, 0);
            rect(i * 75, height/2-20, 15, 15);
            fill(255, 255, 255);
            textSize(10);
            textAlign(CENTER)
            text(i, i * 75 + 7.5, height/2-10);
            pop();
        }
    }
    this.player.run();
    button(30, 35, 50, 30, 2, color(9, 116, 224), "Quit", 20, function(){
        music.worldMap.stop();
        scene = "home";
    })
}
worldMap.init = function(){
    music.worldMap.loop();
    this.spaces = Array(1);
    for(var i in this.levels){
        this.spaces.push(this.levels[i]);
    }
    this.player = new MapMario(this.marioX, height/2);
    scene = "worldmap";
}
