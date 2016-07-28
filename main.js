var gamecanvas = document.getElementById('gamedisplay');
var context = gamecanvas.getContext('2d');
var start = null;

// Game vars
var FPS = 60;
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
        me.image.src = imagemaps.floor[Math.floor(Math.random() * 3)];
    }
    else {
        me.image.src = imagemaps.wall[0];
    }

    me.draw = function(){
        var offset = camera.getOffset();
        context.clearRect(me.position.x - offset.x, me.position.y - offset.y, TileSize, TileSize);
        context.fillStyle = "#FFFFFF";
        context.fillRect(me.position.x - offset.x, me.position.y - offset.y, TileSize, TileSize);
        context.drawImage(me.image, me.position.x - offset.x, me.position.y - offset.y, TileSize, TileSize);
    }
}


var camera = {
    position: new Point(8*TileSize, 6*TileSize), // a 16 wide by 12 tall viewport
    getOffset: function() {
        var offset = new Point(this.position.x - (8*TileSize), this.position.y - (6*TileSize));
        return offset;
    }
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
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
    me.draw = function() {
        // As map size grows, we'll definitely want to iterate over the viewable tiles instead of ALL tiles
        map.data.forEach(function(row, rowidx){
            row.forEach(function(col, colidx){
                tile = map.data[rowidx][colidx];
                if (
                    (tile.position.x > (camera.position.x - (9*TileSize)) || tile.position.x < (camera.position.x + (9*TileSize))) &&
                    (tile.position.y > (camera.position.y - (7*TileSize)) || tile.position.y < (camera.position.y + (7*TileSize)))
                ){
                    tile.draw();
                }
            })
        })
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


function Player() {
    var me = this;
    me.position = new Point(TileSize*2, TileSize),
    me.direction = new Image();
    me.speed = PlayerSpeed;
    me.direction.src = imagemaps.player[0],
    me.draw = function() {
        var offset = camera.getOffset();
        context.drawImage(me.direction, me.position.x - offset.x, me.position.y - offset.y, TileSize, TileSize);
    }
    me.moveUp = function() {
        me.position.y -= me.speed;
        if (me.position.y < camera.position.y && camera.position.y > (6*TileSize)) {
            camera.position.y = Math.max(me.position.y, (6*TileSize));
        }
    }
    me.moveDown = function() {
        me.position.y += me.speed;
        if (me.position.y > camera.position.y && (camera.position.y + (6*TileSize)) < map.data.length*TileSize) {
            camera.position.y = Math.min(me.position.y, map.data.length*TileSize - (6*TileSize));
        }
    }
    me.moveLeft = function() {
        me.position.x -= me.speed;
        if (me.position.x < camera.position.x && camera.position.x > (8*TileSize)) {
            camera.position.x = Math.max(me.position.x, (8*TileSize));
        }
    }
    me.moveRight = function() {
        me.position.x += me.speed;
        if (me.position.x > camera.position.x && (camera.position.x + (8*TileSize)) < map.data[0].length*TileSize) {
            camera.position.x = Math.min(me.position.x, map.data[0].length*TileSize - (8*TileSize));
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
        map.draw();
        player.draw();
    }
    window.requestAnimationFrame(update);
}

var setup = function() {
    // Initialize some stuff here and start the whole process running
    context.clearRect(0, 0, 512, 384);
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 512, 384);
    map.data.forEach(function(row, rowidx){
        row.forEach(function(col, colidx){
            var newTile = new Tile(new Point(colidx*TileSize, rowidx*TileSize), col);
            (map.data[rowidx])[colidx] = newTile;
        })
    })
    map.draw();
    player.draw();
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    window.requestAnimationFrame(update);
}

preload(setup);