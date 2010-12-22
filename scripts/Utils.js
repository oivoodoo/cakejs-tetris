Utils = Klass(CanvasNode, {
  initialize: function() {
    CanvasNode.initialize.call(this);
  },
  
  translate_coords: function(shape) {
    return {x: Math.floor(shape.x / Block.size), y: Math.floor(shape.y / Block.size)};
  }
});