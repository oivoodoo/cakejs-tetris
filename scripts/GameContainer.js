GameContainer = Klass(CanvasNode, { 
  score: new ScorePanel(),
  background: '#FFFFFF',
  nwidth: 16,
  nheight: 24,
  width: Block.size * 16,
  height: Block.size * 24,
  map: [], // Contains all placement of shape parts.
  shapes: [],
  
  SCORE_STEP: 100,

  /*
    Key codes for game keyboard control.
  */
  RIGHT: 100,     // 'D'
  LEFT: 97,       // 'A'
  PAUSE: 112,     // 'P'
  SPACE: 32,      // ' '
  BOTTOM: 115,    // 'S'
  BEGIN: 98,      // 'B'
  RESTART: 114,   // 'R'
  BOTTOM_BLOCK: 998,    // move shape to the bottom with Block.size step
  ENSURE_POSITION: 999, // just ensure position
  
  initialize: function(canvasElem) {
    CanvasNode.initialize.call(this);
    
    this.setup();
    
    this.canvas = new Canvas(canvasElem);
    this.canvas.frameDuration = 40;
    this.canvas.append(this);
    
    // Draw container where we will place shape objects.
    this.container = new Rectangle(this.width, this.height, {
      fill: this.background,
      rx: 2,
      ry: 2,
      strokeWidth: 1,
      stroke: 'cyan',
      x: 0,
      y: 0
    });
    
    this.append(this.container);

    // This panel will generate next shape and preview it.
    // Score panel also contains preview for the game object
    // and scores what use have got.
    this.append(this.score);    
    
    this.addEventListener('keypress', this.move_shape_by_keyboard);
  },
  
  setup: function() {
    // Initialize map of the game container with 0, it means we haven't
    // any blocks in the game container.
    for(var i = 0; i < this.nheight; i++) {
      this.map.push([]);
      for(var j = 0; j < this.nwidth; j++) {
        this.map[i].push({id: 0, position: 0, shape: null});
      }
    }
  },
  
  move_shape_by_keyboard: function(e) {
    var shape = this.score.current_shape;
    // Shape controls.
    if (shape != null) {
      if (e.keyCode == this.RIGHT) {
        shape.move(this.RIGHT);
      } else if (e.keyCode == this.LEFT) {
        shape.move(this.LEFT);
      } else if (e.keyCode == this.SPACE) {
        shape.move(this.SPACE);
      } else if (e.keyCode == this.BOTTOM) {
        shape.move(this.BOTTOM);
      }
    }
    // Common game controls.
    if (e.keyCode == this.PAUSE) {
      this.pause();
    } else if (e.keyCode == this.BEGIN) {
      this.start();
    } else if (e.keyCode == this.RESTART) {
      this.restart();      
    } 
  },
  
  next_shape: function() {
    var shape = this.score.next();
    shape.addEventListener('keypress', this.move_shape);
    shape.addFrameListener(shape.update_onframe);
    this.shapes.push(shape);
    this.append(shape);
  },
  
  check_rows: function() {
    var i, j, k;
    var rows = [];
    for(i = 0; i < this.nheight ; i++) {
      var count = 0;
      for(j = 0; j < this.nwidth; j++) {
        if (this.map[i][j].id > 0) {
          count++;
        }
      }
      if (count == this.nwidth) {
        for(k = 0; k < this.nwidth; k++) {
          this.map[i][k].shape.remove_block(this.map[i][k]);
        }
        rows.push({p: i, c: this.map[i]});
      }
    }
    
    // We have to move rows to bottom if we remove some rows
    // after detection 'boom'!!! :)
    for(var j = 0; j < rows.length; j++) {
      for(var z = 0; z < this.shapes.length; z++) {
        var shape = this.shapes[z];
        for(var p = 0; p < shape.childNodes.length; p++) {
          var b = shape.childNodes[p];
          if (b.map.x < this.nheight 
              && (this.map[b.map.x + 1][b.map.y].id == 0
              || this.map[b.map.x + 1][b.map.y].id == shape.id)) {
            b.y += Block.size;     
          }   
          if (b.map.x + 1 == rows[j].p) {
            b.map.x += 1;
          }
        }
      }
    }
    
    for(var j = 0; j < rows.length; j++) {
      this.map.remove(rows[j].c);
      this.map.unshift([]);
      for(var z = 0; z < this.nwidth; z++) {
        this.map[0].push({id: 0});
      }
    }
    
    // Update scores
    this.score.scores += rows * this.SCORE_STEP;
  },

  start: function() {
    this.next_shape();
  },

  pause: function() {
    this.score.current_shape.removeFrameListener(Shape.update_onframe);
  },

  restart: function() {
    // TODO: implement restart methods, we have to clear game panels and
    // cleanup backup from localStorage with coordinates of game objects.
  },
  
  gameover: function() {
    // if current shapes is moved to the game container
    // TODO: we have to show message with gameover window.
    // TODO: send high scores to the server with scores, developed by rails.
  }
});
