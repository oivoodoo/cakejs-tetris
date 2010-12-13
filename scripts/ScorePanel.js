ScorePanel = Klass(CanvasNode, {

	shapes: [
		{map: [[[1,1],[1,1]]]},
		{map: [[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]],[[1,0,0],[1,1,1]]]},
		{map: [[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]],[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]]]},
		{map: [[[1,1,1,1]],[[1],[1],[1],[1]]]}
	],

	initialize: function() {
		CanvasNode.initialize.call(this);
	},
	
	next: function() {
		var next = Math.floor(Math.random() * this.shapes.length);
		var degree = Math.floor(Math.random() * this.shapes[next].map.length);
		return new Shape({map: this.shapes[next].map, degree: degree});
	}
});