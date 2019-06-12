let levelMusic = {
    init: function(){
        this.track = 0;
        this.musicPath = world.getMusicPath(this.track);
        this.music = this.musicPath[1];
        this.music.play();
        scene = "levelmusic";
    },
    run: function(){
        background(164, 194, 242);
        push();
        fill(0, 0, 0);
        textFont(fonts.mario);
        textSize(35);
        textAlign(CENTER);
        text("Choose Music", width/2, 35);
        pop();
        button(width-75, height-25, 150, 50, 2, color(216, 22, 19), "Submit", 30, function(){
            levelMusic.music.stop();
            createdLevel.music = levelMusic.track;
            scene = "leveleditor";
        });
        button(width/2-75, height/2+40, 150, 50, 2, color(216, 22, 19), "Stop", 30, function(){
            levelMusic.music.stop(); //I can't use this for whatever reason
        });
        button(width/2+75, height/2+40, 150, 50, 2,  color(9, 116, 224), "Change", 30, function(){
            levelMusic.music.stop();
            levelMusic.track ++;
            if(levelMusic.track > music.total-1){
                levelMusic.track = 0;
            }
            levelMusic.musicPath = world.getMusicPath(levelMusic.track);
            levelMusic.music = levelMusic.musicPath[1];
            levelMusic.music.play();
        });
        push();
        fill(0, 0, 0);
        textSize(40);
        textAlign(CENTER);
        text(this.track, width/2, height/2);
        pop();
    }
};
