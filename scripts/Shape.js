Shape = Klass(CanvasNode, {
  map: [],
  degree: 0,
  rotations: 4,
  default_angle: Math.PI / 2,
  step: 1,
  
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
    this.update_positions();
  },

  /*
    Method is always running when user try to rotate shape by any events.
    In the next version of application I will implement controls for changing
    angle of shape by keyboard or screen controls.
  */
  rotate: function() {
    this.degree = this.ensure_degree(this.degree + 1);
    this.removeAllChildren();
    this.height = this.map[this.degree][0].length;
    this.width = this.map[this.degree].length;
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
            this.append(new Block({
              x: j * Block.size, 
              y: i * Block.size,
              color: this.color
            }));
          }
        }
      }
    }
  },
  
  /*
    Move shape in the each frame iteration to the bottom of the game screen.
  */
  update_positions: function() {
    // We are using dynamic step for encreasing step when use click to the 
    // bottom of keyboard(for example pointer to bottom or 's' key).
    this.y += this.step;
  }
});
