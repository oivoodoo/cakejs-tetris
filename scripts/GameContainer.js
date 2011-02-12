GameContainer = Klass(CanvasNode, { 
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
  RIGHT: 100,     // 'd'
  LEFT: 97,       // 'a'
  PAUSE: 112,     // 'p'
  SPACE: 32,      // ' '
  BOTTOM: 115,    // 's'
  BEGIN: 98,      // 'b'
  RESTART: 114,   // 'r'
  RESUME: 103,    // 'g'
  BOTTOM_BLOCK: 998,    // move shape to the bottom with Block.size step
  ENSURE_POSITION: 999, // just ensure position
  
  initialize: function(canvasElem, options) {
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
      x: 0,
      y: 0
    });
    
    this.append(this.container);

    this.create_score_panel();
    
    this.addEventListener('keypress', this.move_shape_by_keyboard);   
  },
  
  create_score_panel: function() {
    // recreate score panel
    if (!!this.score) {
      this.score.removeSelf();
    }
    // This panel will generate next shape and preview it.
    // Score panel also contains preview for the game object
    // and scores what use have got.
    this.score = new ScorePanel();
    this.append(this.score);
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
    } else if (e.keyCode == this.RESUME) {
      this.resume();
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

    for(var j = 0; j < rows.length; j++) {
      this.map.remove(rows[j].c);
      this.map.unshift([]);
      for(var z = 0; z < this.nwidth; z++) {
        this.map[0].push({id: 0});
      }
    }
    
    for(var i = 0; i < this.map.length; i++) {
      for(var j = 0; j < this.map[i].length; j++) {
        var block = this.map[i][j];
        if (block.id > 0) {
          var oldx = block.shape.childNodes[block.position].map.x;
          block.shape.childNodes[block.position].set_map({x: i, y: j});
          if (oldx != i) {
            block.shape.childNodes[block.position].y += Block.size * (i - oldx);
          }
        }
      }
    }

    if (rows.length > 0) {
      // Update scores
      this.score.update_scores(rows.length * this.SCORE_STEP);
    }
  },

  start: function() {
    this.next_shape();
  },

  pause: function() {
    this.score.current_shape.removeFrameListener(Shape.update_onframe);
  },
  
  resume: function() {
    this.score.current_shape.addFrameListener(Shape.update_onframe);
  },

  restart: function() {
    for(var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].removeSelf();
    }
    this.map = [];
    this.shapes = [];
    this.setup();
    
    this.create_score_panel();
  },
  
  gameover: function() {
    this.restart();
    // if current shapes is moved to the game container
    // TODO: we have to show message with gameover window.
    // TODO: send high scores to the server with scores, developed by node.
  }
});
