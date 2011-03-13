/**
 * @depends cake.js
 */
 
Block = Klass(CanvasNode, {
  backgroud: 'rgb(0, 0, 0)',
  opacity: 0.8,
  size: 20,
  map: {x: 0, y: 0},
  
  initialize: function(options) {
    CanvasNode.initialize.call(this);
    
    if (options.size != null) {
      this.size = options.size;
    }
    
    this.shape = new Rectangle(this.size, this.size, {
      fill: options.color,
      stroke: 'cyan', 
      strokeWidth: 1,
      rx: 2,
      ry: 2
    });
    
    this.x = options.x;
    this.y = options.y;

    this.append(this.shape);
  },
  
  set_map: function(map) {
    this.map = map;
  }
});
