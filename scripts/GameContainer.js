GameContainer = Klass(CanvasNode, { 
  score: new ScorePanel(),
  background: '#FFFFFF',
  width: 320,
  height: 480,
  /*
    Key codes for game keyboard control.
  */
  RIGHT: 100,
  LEFT: 97,
  PAUSE: 112,
  SPACE: 32,
  BOTTOM: 115,
  BEGIN: 98,
  RESTART: 114,
  
  
  initialize: function(canvasElem) {
    CanvasNode.initialize.call(this);
    
    this.canvas = new Canvas(canvasElem);
    this.canvas.frameDuration = 30;
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
    for(var i = 0; i < 1; i++) {
      var shape = this.score.next();
      shape.addEventListener('keypress', this.move_shape);
      shape.addFrameListener(shape.update_onframe);
      this.append(shape);
    }
    
    this.addEventListener('keypress', this.move_shape_by_keyboard);
  },
  
  move_shape_by_keyboard: function(e) {
    if (e.keyCode == this.RIGHT) {
      this.score.current_shape.x += Block.size;
    } else if (e.keyCode == this.LEFT) {
      this.score.current_shape.x -= Block.size;
    } else if (e.keyCode == this.SPACE) {
      this.score.current_shape.rotate();
    } else if (e.keyCode == this.PAUSE) {
      this.pause();
    } else if (e.keyCode == this.BEGIN) {
      this.start();
    } else if (e.keyCode == this.RESTART) {
      this.restart();      
    } else if (e.keyCode == this.BOTTOM) {
      this.move_to_bottom();
    }
  },

  start: function() {
    this.score.current_shape.addFrameListener(Shape.update_onframe);  
  },

  pause: function() {
    this.score.current_shape.removeFrameListener(Shape.update_onframe);
  },

  restart: function() {
    // TODO: implement restart methods, we have to clear game panels and
    // cleanup backup from localStorage with coordinates of game objects.
  },

  move_to_bottom: function() {
    this.score.current_shape.step = 10;
  }
});
