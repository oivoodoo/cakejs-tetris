Shape = Klass(CanvasNode, {
  degree: 0,
  map: [],
  step: 1,
  blocks: [],
  
  initialize: function(options) {
    CanvasNode.initialize.call(this);
    
    this.setup(options);

    this.addEventListener('click', function(e) {
      this.rotate();
    });

    this.render_shape();

    if (this.color != null) {
      this.set_color(this.color);
    }
  },
  
  setup: function(options) {
    if (options != null) {
      this.container = options.container;
      if (options.map != null) {
        this.map = options.map;
      }
      if (options.x != null) {
        this.x = options.x;
      }
      if (options.y != null) {
        this.y = options.y;
      }
      if (options.degree != null) {
        this.degree = options.degree
      }
      if (options.color != null) {
        this.color = options.color;
      }
    }
  },
  
  update_onframe: function() {
    this.move(GameContainer.ENSURE_POSITION);
  },

  /*
    Method is always running when user try to rotate shape by any events.
    In the next version of application I will implement controls for changing
    angle of shape by keyboard or screen controls.
  */
  rotate: function() {
    this.degree = this.ensure_degree(this.degree + 1);
    this.removeAllChildren();
    this.render_shape();
  },
  
  /*
    Initialize blocks with colors, we can change colors of all children blocks
    of shape in the working game.
  */
  set_color: function(color) {
    for(var i = 0; i < this.childNodes.length; i++) {
      this.childNodes[i].fill = color; 
    }
  },
  
  /*
    Method for ensuring rotation our shapes. We have to create containts
    to rotations.
  */
  ensure_degree: function(degree) {
    if (degree >= this.map.length) {
      degree = 0;
    }
    return degree;
  },
  
  /*
    If we have no childs in the container we have to render blocks
    from the map.
  */
  render_shape: function() {
    if (this.childNodes.length == 0) {
      for(var i = 0; i < this.map[this.degree].length; i++) {
        for(var j = 0; j < this.map[this.degree][i].length; j++) {
          if (this.map[this.degree][i][j] == 1) {        
            var block = new Block({
              x: j * Block.size, 
              y: i * Block.size,
              color: this.color
            });
            this.blocks.push(block);
            this.append(block);
          }
        }
      }
    }
  },
  
  move: function(way) {
    switch(way)
    {
      case GameContainer.LEFT:
        if (this.check_collision(this.x - Block.size, this.y) &&
            this.check_borders(this.x - Block.size, this.y)) {
          this.x -= Block.size;
        }
        break;
      case GameContainer.RIGHT:
        if (this.check_collision(this.x + Block.size, this.y) &&
            this.check_borders(this.x + Block.size, this.y)) {
          this.x += Block.size;
        }
        break;
      case GameContainer.ENSURE_POSITION:
         if (this.check_collision(this.x, this.y + this.step) &&
             this.check_borders(this.x, this.y + this.step)) {
            // We are using dynamic step for encreasing step when use click to the 
            // bottom of keyboard(for example pointer to bottom or 's' key).
            this.y += this.step;
          } else {
            this.container.next_shape();
            // Stop animation for this object.
            this.removeFrameListener(Shape.update_onframe);
          }
        break;
    }
  },
  
  check_collision: function(x, y) {
    return true;
  },
  
  /*
    Check borders for the shape (right, left and bottom borders).
  */
  check_borders: function(x, y) {
    return !(x < 0 
      || y < 0 
      || (x + this.width() > GameContainer.width)
      || (y + this.height() > GameContainer.height));
  },
  
  /*
    Return max width of the shape just for determine borders.
  */
  width: function() {
    return this.map[this.degree][0].length * Block.size;
  },
  
  /*
    Return max height of the shape just for determine borders.
  */
  height: function() {
    return this.map[this.degree].length * Block.size;
  }
});
