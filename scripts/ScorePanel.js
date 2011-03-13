/**
 * @depends cake.js
 * @depends jquery.min.js
 */

NextShape = Klass(CanvasNode, { 
  width: 80,
  height: 50,
  background: '#FFFFFF',
  
  initialize: function(canvasElem) {
    CanvasNode.initialize.call(this);
    
    this.canvas = new Canvas(canvasElem);
    this.canvas.frameDuration = 40;
    this.canvas.append(this);
    
    this.container = new Rectangle(this.width, this.height, {
      fill: this.background,
      rx: 2,
      ry: 2,
      x: 0,
      y: 0
    });
    
    this.append(this.container);
  },
  
  set_shape: function(shape, color) {
    this.shape = shape;
    
    if (this.current_shape != null) {
      this.current_shape.removeSelf();
    }
    
    this.current_shape = new Shape({
      map: shape.map, 
      degree: shape.degree, 
      color: shape.color,
      x: 0,
      y: 0,
      box_size: 12
    });
    
    this.container.append(this.current_shape);
  }

});

ScorePanel = Klass(CanvasNode, {
  container_id: "#scores_number",
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
            [1,1,1]],
           [[1,1],
            [0,1],
            [0,1]],
           [[1,1,1],
            [1,0,0]],
           [[1,0],
            [1,0],
            [1,1]],
           [[0,0,1],
            [1,1,1]]]},
    {map: [[[1,1,0],
            [0,1,1]],
           [[0,1],
            [1,1],
            [1,0]],
           [[0,1,1],
            [1,1,0]],
           [[1,0],
            [1,1],
            [0,1]]]},
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

  initialize: function(parent, next_shape_panel) {
    CanvasNode.initialize.call(this);

    // Set game container as parent object for score panel.
    this.parent = parent;
    this.next_shape_panel = next_shape_panel;
  },
  
  /*
    Return random shape with random color.
  */
  next: function() {
    var step = Math.floor(this.scores / 1000);
    if (step == 0) {
      step = 1;
    } else {
      step += 0.5;
    }
    $("#level_number").html(Math.floor(this.scores / 1000) + 1);

    if (this.next_shape == null) {
      this.next_shape = this.get_shape();
    }
    
    this.current_shape = new Shape({
      map: this.next_shape.map, 
      degree: this.next_shape.degree, 
      color: this.next_shape.color,
      x: GameContainer.width / 2,
      step: step,
      y: 0,
      container: this.parent,
      id: this.parent.shapes.length + 1
    });
    
    this.next_shape = this.get_shape();
    this.next_shape_panel.set_shape(this.next_shape);
    
    return this.current_shape;
  },
  
  get_shape: function() {
    var next = Math.floor(Math.random() * this.shapes.length);
    var degree = Math.floor(Math.random() * this.shapes[next].map.length);
    
    return {
      map: this.shapes[next].map, 
      color: this.get_color(),
      degree: degree
    };
  },
  
  /*
    Return random color for the shape
  */
  get_color: function() {
    var next = Math.floor(Math.random() * this.colors.length);
    return this.colors[next];
  },
  
  update_scores: function(score) {
    this.scores += score;
    $(this.container_id).html(this.scores);
  }
});
