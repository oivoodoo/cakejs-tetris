ScorePanel = Klass(CanvasNode, {

  shapes: [
    {map: [[1,1],[1,1]]},
    {map: [[1,1],[1,0],[1,0]]},
    {map: [[1,1,1],[0,1,0]]},
    {map: [[1,1,1,1]]}
  ],
  
  colors: ["#FF0000", "#338000", "#005544", "#00AAD4", "#D400AA"],

  initialize: function() {
    CanvasNode.initialize.call(this);
  },
  
  /*
    Return random shape with random color.
  */
  next: function() {
    var next = Math.floor(Math.random() * this.shapes.length);
    var degree = Math.floor(Math.random() * 4);
    return new Shape({
      map: this.shapes[next].map, 
      degree: degree, 
      color: this.get_color(),
      x: GameContainer.width / 6,
      y: 0
    });
  },
  
  /*
    Return random color for the shape
  */
  get_color: function() {
    var next = Math.floor(Math.random() * this.colors.length);
    return this.colors[next];
  }
});
