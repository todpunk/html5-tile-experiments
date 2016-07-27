var gamecanvas = document.getElementById('gamedisplay');
var context = gamecanvas.getContext('2d');
var start = null;

// Game vars
var FPS = 30;
var TileSize = 32;
var PlayerSpeed = 6; 

function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

function Tile(coordinates, tileType) {
    var me = this;
    me.position = coordinates || new Point();
    me.tileType = tileType || 0; // default to wall
    me.image = new Image();
    if (me.tileType == 1) {
        me.image.src = imagemaps.floor[Math.floor(Math.random() * 3)]
    }
    else {
        me.image.src = imagemaps.wall[0];
    }

    me.draw = function(){
        context.clearRect(me.position.y, me.position.x, TileSize, TileSize);
        context.fillStyle = "#FFFFFF";
        context.fillRect(me.position.y, me.position.x, TileSize, TileSize);
        context.drawImage(me.image, me.position.y, me.position.x, TileSize, TileSize);
    }
}


var camera = {
    position: new Point(8*TileSize, 6*TileSize) // a 16 wide by 12 tall viewport
};

function Map(){
    var me = this;
    me.data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    me.changed = [];
    me.draw = function() {
        // Draw the tiles that have changed
        me.changed.forEach(function(item){
            drawTile(item);
        })
        me.changed = [];
    };
};
var map = new Map();

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

function drawTile(coordinates){
    tile = map.data[coordinates.y][coordinates.x]
    tile.draw();
}


function Player() {
    var me = this;
    var prevx = 0;
    var prevy = 0;
    me.position = new Point(TileSize, TileSize*2),
    me.direction = new Image();
    me.speed = PlayerSpeed;
    me.direction.src = imagemaps.player[0],
    me.draw = function() {
        context.drawImage(me.direction, me.position.y, me.position.x, TileSize, TileSize);
    }
    me.moveUp = function() {
        prevx = Math.floor(me.position.x/TileSize);
        prevy = Math.floor(me.position.y/TileSize);
        var point = new Point(prevx,prevy);
        map.changed.push(point)
        me.position.x -= me.speed;
        if(prevx > 0) {
            map.changed.push(new Point(prevy,prevx-1))
        }
        if(prevx < map.data.length) {
            map.changed.push(new Point(prevy,prevx+1))
        }
    }
    me.moveDown = function() {
        prevx = Math.floor(me.position.x/TileSize);
        prevy = Math.floor(me.position.y/TileSize);
        var point = new Point(prevx,Math.floor(me.position.y/TileSize));
        map.changed.push(point)
        me.position.x += me.speed;
        if(prevx > 0) {
            map.changed.push(new Point(prevy,prevx-1))
        }
        if(prevx < map.data.length) {
            map.changed.push(new Point(prevy,prevx+1))
        }
    }
    me.moveLeft = function() {
        prevx = Math.floor(me.position.x/TileSize);
        prevy = Math.floor(me.position.y/TileSize);
        var point = new Point(prevx,prevy);
        map.changed.push(point)
        me.position.y -= me.speed;
        if(prevy > 0) {
            map.changed.push(new Point(prevy,prevx-1))
        }
        if(prevy < map.data[0].length) {
            map.changed.push(new Point(prevy,prevx+1))
        }
    }
    me.moveRight = function() {
        prevx = Math.floor(me.position.x/TileSize);
        prevy = Math.floor(me.position.y/TileSize);
        var point = new Point(prevy,prevx);
        map.changed.push(point)
        me.position.y += me.speed;
        if(prevy > 0) {
            map.changed.push(new Point(prevy,prevx-1))
        }
        if(prevy < map.data[0].length) {
            map.changed.push(new Point(prevy,prevx+1))
        }
    }
}

var player = new Player();

function update(timestamp) {
    // Request Animation Frame and run the cycle of things here

    if (!start) { 
        start = timestamp; 
    };
    var progress = timestamp - start;
    if (progress < (1000 / FPS)) {
        // Less than a frame has happened
    }
    else {
        // A full frame!
        start = timestamp;
        if (Key.isDown(Key.UP)) player.moveUp();
        if (Key.isDown(Key.LEFT)) player.moveLeft();
        if (Key.isDown(Key.DOWN)) player.moveDown();
        if (Key.isDown(Key.RIGHT)) player.moveRight();
        // TODO: Need to redraw the map tiles we've overwritten, mark them somehow
        //context.clearRect(0, 0, 512, 384);
        //context.fillStyle = "#FFFFFF";
        //context.fillRect(0, 0, 512, 384);
        map.draw();
        player.draw();
    }
    window.requestAnimationFrame(update);
}

var setup = function() {
    console.log('preload completed')
    console.log(new Date())
    // Initialize some stuff here and start the whole process running
    context.clearRect(0, 0, 512, 384);
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 512, 384);
    map.data.forEach(function(row, rowidx){
        row.forEach(function(col, colidx){
            var newTile = new Tile(new Point(rowidx*TileSize, colidx*TileSize), col);
            map.data[rowidx][colidx] = newTile;
            map.changed.push(new Point(rowidx, colidx));
        })
    })
    console.log(map);
    map.draw();
    player.draw();
    console.log('setup completed')
    console.log(new Date())
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    window.requestAnimationFrame(update);
}

console.log('preload started')
console.log(new Date())
preload(setup);