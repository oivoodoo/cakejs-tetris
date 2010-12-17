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
  }  
});
