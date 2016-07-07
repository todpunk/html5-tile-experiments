
var imagemaps = {
    floor: ['stonegray.png', 'stonegreen.png', 'stonered.png'],
    wall: ['wall.png'],
    player: ['pdown.png', 'pleft.png', 'pup.png', 'pright.png']
};
var preloaded_callback = function(){};

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
};

function preload() {
    // All preload actions, for now just image loading
    var keys = Object.keys(imagemaps);
    var urls = new Array();
    keys.forEach(function(listname){
        imagemaps[listname].forEach(function(url){
            urls.push(url)
        })
    })
    urls.forEach(function(item) {
        var img = new Image();
        img.src = item;
        console.log('preloading: ' + item);
    })
    preloaded_callback();
};
//addLoadEvent(preload);
preload();