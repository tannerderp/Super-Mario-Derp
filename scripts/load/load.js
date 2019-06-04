let imgs = {};
function preload(){
    imgs.mario = {};
    imgs.mario.walk = Array(5);
    console.log(imgs.mario.walk)
    for(var i = 0; i<5; i++){
        imgs.mario.walk[i] = loadImage("/sprites/mario/BSMW"+(i+1)+".png")
    }
}
scene = "gameLoad";
