Block = Klass(CanvasNode, {
  backgroud: 'rgb(0, 0, 0)',
  opacity: 0.8,
  size: 20,
  
  initialize: function(options) {
    CanvasNode.initialize.call(this);
    
    this.shape = new Rectangle(this.size, this.size, {
      fill: options.color,
      stroke: 'cyan', 
      strokeWidth: 1,
      x: options.x,
      y: options.y,
      rx: 2,
      ry: 2
    });

    this.append(this.shape);
  },
  
  /*
    We are moving blocks in separate cycle just for more flexible
    controll of shapes.
  */
  move: function(way, container) {
    switch(way) {
      case GameContainer.LEFT:
        this.x -= Block.size;
        break;
      case GameContainer.RIGHT:
        this.x += Block.size;
        break;
    }
    return true;
  },
  
  revert: function(way) {
    switch(way) {
      case GameContainer.LEFT:
        this.x += Block.size;
        break;
      case GameContainer.RIGHT:
        this.x -= Block.size;
        break;
    }
  },
  
  translate_coords: function() {
    
  }
});
