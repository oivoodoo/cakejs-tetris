ScorePanel = Klass(CanvasNode, {

  scores: 0,
  shapes: [
    {map: [[[1,1],[1,1]]]},
    {map: [[[1,1],
            [1,0],
            [1,0]],
           [[1,1,1],
            [0,0,1]],
           [[0,1],
            [0,1],
            [1,1]],
           [[1,0,0],
            [1,1,1]]]},
    {map: [[[1,1,1],
            [0,1,0]],
           [[0,1],
            [1,1],
            [0,1]],
           [[0,1,0],
            [1,1,1]],
           [[1,0],
            [1,1],
            [1,0]]]},
    {map: [[[1,1,1,1]], [[1],[1],[1],[1]]]}
  ],
  
  colors: ["#FF0000", "#338000", "#005544", "#00AAD4", "#D400AA"],

  initialize: function(parent) {
    CanvasNode.initialize.call(this);
    
    // Set game container as parent object for score panel.
    this.parent = parent;
  },
  
  /*
    Return random shape with random color.
  */
  next: function() {
    var next = Math.floor(Math.random() * this.shapes.length);
    var degree = Math.floor(Math.random() * this.shapes[next].map.length);
    this.current_shape = new Shape({
      map: this.shapes[next].map, 
      degree: degree, 
      color: this.get_color(),
      x: GameContainer.width / 2,
      y: 0,
      container: this.parent,
      id: this.parent.shapes.length + 1
    });
    return this.current_shape;
  },
  
  /*
    Return random color for the shape
  */
  get_color: function() {
    var next = Math.floor(Math.random() * this.colors.length);
    return this.colors[next];
  }
});
