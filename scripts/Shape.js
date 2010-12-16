Shape = Klass(CanvasNode, {
  map: [],
  degree: 0,
  rotations: 4,
  default_angle: Math.PI / 2,
  
  initialize: function(options) {
    CanvasNode.initialize.call(this);
    
    this.setup(options);

    this.addEventListener('click', function(e) {
      this.rotate();
    });
    
    this.addEventListener('drag', function(e) {
      this.x += (this.x - e.x > 0 ? -1 : 1);
      this.y += (this.y - e.y > 0 ? -1 : 1);
    });
    
    this.addFrameListener(function(){
      // this.y += 1;
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

  /*
    Method is always running when user try to rotate shape by any events.
    In the next version of application I will implement controls for changing
    angle of shape by keyboard or screen controls.
  */
  rotate: function() {
    this.rotation = this.ensure_degree(this.rotation + this.default_angle);
  },
  
  /*
    Initialize blocks with colors, we can change colors of all children blocks
    of shape in the working game.
  */
  set_color: function(color) {
    $.each(this.childNodes, function(i, block){
      block.fill = color; 
    });
  },
  
  /*
    Method for ensuring rotation our shapes. We have to create containts
    to rotations.
  */
  ensure_degree: function(rotation) {
    if (rotation >= this.rotations * this.default_angle) {
      rotation = 0;
    }
    return rotation;
  },
  
  /*
    If we have no childs in the container we have to render blocks
    from the map.
  */
  render_shape: function() {
    if (this.childNodes.length == 0) {
      for(var i = 0; i < this.map.length; i++) {
        for(var j = 0; j < this.map[i].length; j++) {
          if (this.map[i][j] == 1) {        
            this.append(new Block({
              x: j * Block.size, 
              y: i * Block.size
            }));
          }
        }
      }
    }
  }
});
