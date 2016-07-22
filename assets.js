
var imagemaps = {
    floor: ['stonegray.png', 'stonegreen.png', 'stonered.png'],
    wall: ['wall.png'],
    player: ['pdown.png', 'pleft.png', 'pup.png', 'pright.png']
};

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

function preloadimages(arr){
    var newimages=[], loadedimages=0
    var postaction=function(){}
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //return blank object with done() method
        done:function(f){
            postaction=f || postaction //remember user defined callback functions to be called when images load
        }
    }
};
 
function preload(preloaded_callback) {
    // All preload actions, for now just image loading
    var keys = Object.keys(imagemaps);
    var urls = new Array();
    keys.forEach(function(listname){
        imagemaps[listname].forEach(function(url){
            urls.push(url)
        })
    })
    preloadimages(urls).done(function(images){
        //call back codes, for example:
        console.log(images.length)
        console.log(images[0].src+" "+images[0].width)
        preloaded_callback();
    })
};


