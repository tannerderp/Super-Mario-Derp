let scripts = ["/load/load", "/game/objects/blocks", "/game/objects/mario", "/game/objects/coin", "/game/objects/goomba", "/game/objects/shell", "/game/objects/koopa", "/game/objects/pirahna", "/game/objects/mushroom", "/game/objects/flagpole", "/game/world", "/scenes/button", "/scenes/home", "/scenes/levelname", "/scenes/levelbackground", "/scenes/levelmusic"];
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var body = document.querySelector("body");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    body.appendChild(script);
};
for(var i in scripts){
    loadScript("/scripts/"+scripts[i]+".js");
}
loadScript("/scripts/main.js");
