Shape = Klass(CanvasNode, {
  degree: 0,
  map: [],
  step: 1,
  blocks: [],
  MAX_STEP: 5,
  
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
      if (options.id != null) {
        this.id = options.id;
      }
    }
  },
  
  /*
    On frame we have to update position of the shape, also
    we are checking current position of the shape.
  */
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
    if (degree >= this.map.length || degree < 0) {
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
  
  /*
    Move the shape by certain way.
  */
  move: function(way) {
    var context = this;
    switch(way)
    {
      case GameContainer.LEFT:
        this.check_move(context, this.x - Block.size, this.y, false, function() {
          context.x -= Block.size;
        });
        break;
      case GameContainer.RIGHT:
        this.check_move(context, this.x + Block.size, this.y, false, function() {
          context.x += Block.size;
        });
        break;
      case GameContainer.BOTTOM:
        this.step = this.MAX_STEP;
        break;
      case GameContainer.ENSURE_POSITION:
        this.check_move(context, this.x, this.y + this.step, true, function() {
          // We are using dynamic step for encreasing step when use click to the 
          // bottom of keyboard(for example pointer to bottom or 's' key).
          context.y += context.step;
        });
        break;
      case GameContainer.SPACE:
        var degree = this.degree;
        this.rotate();
        this.check_move(context, this.x, this.y, false, null, function() {
          context.degree = degree - 1;
          context.rotate();
        });
        break;
      case GameContainer.BOTTOM_BLOCK:
        this.y += Block.size;
        break;
    }
  },
  
  /*
    Check collisions near with another shapes comparing with current selected
    shape. Also this method update map that's contains all information about 
    shapes in the game container.
  */
  check_collision: function(x, y) {
    for(var i = 0; i < this.childNodes.length; i++) {
      var c = this.get_coords(x + this.childNodes[i].x, y + this.childNodes[i].y);
      if (this.container.map[c.x][c.y].id > 0) {
        return false;
      }
    }
    return true;
  },
  
  /*
    x ~> height
    y ~> width
  */
  get_coords: function(y, x) {
    return {
      x: Math.ceil(x / Block.size), 
      y: Math.ceil(y / Block.size)
    };
  },
  
  /*
    Method for checking collisions and absolute positions of the shapes
    in the game container.
  */
  check_move: function(context, x, y, can_stop, func, fail) {
    if (context.check_borders(x, y)
        && context.check_collision(x, y)) {
      if (func != null) {
        func.call();
      }
    } else {
      if (can_stop) {
        // We have to update map this current position of the shape.
        for(var i = 0; i < context.childNodes.length; i++) {
          var c = context.get_coords(
            context.x + context.childNodes[i].x, 
            context.y + context.childNodes[i].y
          );
          context.container.map[c.x][c.y] = {
            id: context.id, 
            position: i, 
            shape: context
          };
          context.childNodes[i].set_map({x: c.x, y: c.y});
        }
        // If we are using speed up control we have ceil coordinates.
        var c = context.get_coords(context.x, context.y);
        context.x = c.y * Block.size; // 0..nwidth - 1
        context.y = c.x * Block.size; // 0..nheight - 1
        context.removeFrameListener(Shape.update_onframe);
        context.container.next_shape();
        context.container.check_rows();
      } else {
        if (fail != null) {
          fail.call();
        }
      }
    }
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
    Remove block from game container and update positions for another blocks.
  */
  remove_block: function(conf) {
    var block = this.childNodes[conf.position];
    this.container.map[block.map.x][block.map.y] = {id: 0};
    this.childNodes[conf.position].removeSelf();
    if (this.childNodes.length != 0) {
      for(var i = 0; i < this.childNodes.length; i++) {
        var b = this.childNodes[i];
        this.container.map[b.map.x][b.map.y].position -= 1;
      }
    } else {
      // Clear all references for this selected shape.
      // if we have removed all blocks before.
      this.container.shapes.remove(this);
      this.removeSelf();
    }
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
