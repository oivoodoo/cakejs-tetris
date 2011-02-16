/**
 * @depends cake.js
 * @depends Shape.js
 * @depends Block.js
 * @depends jquery.min.js
 */

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
  RIGHT: 68,     // 'd'
  LEFT: 65,       // 'a'
  PAUSE: 80,     // 'p'
  SPACE: 32,      // ' '
  BOTTOM: 83,    // 's'
  BEGIN: 66,      // 'b'
  RESTART: 82,   // 'r'
  RESUME: 71,    // 'g'
  RIGHT_A: 39,
  LEFT_A: 37,
  SPACE_A: 38,
  BOTTOM_A: 40,
  BOTTOM_BLOCK: 998,    // move shape to the bottom with Block.size step
  ENSURE_POSITION: 999, // just ensure position
  GAME_ON: 101,
  GAME_OFF: 102,
  GAME_PAUSE: 103,
  
  initialize: function(canvasElem, options) {
    CanvasNode.initialize.call(this);
    
    this.setup();
    
    this.game_state = this.GAME_OFF;
    
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

    var context = this; 
    $(document).keydown((function(app){
      this.context = app;
      return {
        keydown: function(e) {
          context.move_shape_by_keyboard(e, context);
        }
      };
    })(this).keydown);
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
    
    $("#scores_number").html(0);
    $("#level_number").html(0);
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
  
  move_shape_by_keyboard: function(e, context) {
    var shape = context.score.current_shape;
    // Shape controls.
    if (shape != null && context.game_state != context.GAME_PAUSE) {
      if (e.keyCode == context.RIGHT || e.keyCode == context.RIGHT_A) {
        shape.move(context.RIGHT);
      } else if (e.keyCode == context.LEFT || e.keyCode == context.LEFT_A) {
        shape.move(context.LEFT);
      } else if (e.keyCode == context.SPACE || e.keyCode == context.SPACE_A) {
        shape.move(context.SPACE);
      } else if (e.keyCode == context.BOTTOM || e.keyCode == context.BOTTOM_A) {
        shape.move(context.BOTTOM);
      }
    }
    // Common game controls.
    if (e.keyCode == context.PAUSE && context.game_state == context.GAME_ON) {
      context.pause();
    } else if (e.keyCode == context.BEGIN && context.game_state == context.GAME_OFF) {
      context.start();
    } else if (e.keyCode == context.RESTART) {
      context.restart();
    } else if (e.keyCode == context.PAUSE && context.game_state == context.GAME_PAUSE) {
      context.resume();
    }
  },
  
  next_shape: function() {
    var shape = this.score.next();
    if (!shape.check_collision(shape.x, shape.y + shape.step)) {
      this.gameover();
    } else {
      shape.addEventListener('keypress', this.move_shape);
      shape.addFrameListener(shape.update_onframe);
      this.shapes.push(shape);
      this.append(shape);
    }
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
    this.restart();
    this.game_state = this.GAME_ON;
    this.next_shape();
  },

  pause: function() {
    this.game_state = this.GAME_PAUSE;
    this.score.current_shape.removeFrameListener(Shape.update_onframe);
  },
  
  resume: function() {
    this.game_state = this.GAME_ON;
    this.score.current_shape.addFrameListener(Shape.update_onframe);
  },

  restart: function() {
    this.game_state = this.GAME_OFF;
    for(var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].removeSelf();
    }
    this.map = [];
    this.shapes = [];
    this.setup();
    
    this.create_score_panel();
  },
  
  gameover: function() {
    this.pause();
    this.game_state = this.GAME_OFF;
    $("#scores").html(this.score.scores);
    $("#game_over").fadeIn();
  }
});
