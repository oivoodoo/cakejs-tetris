GameContainer = Klass(CanvasNode, { 
	shapes: [
		{
			map:  [[[1,1,0],
			 	    [1,1,0]]]
		},
		{
			map:  [[[1,1],
				    [1,0],
				    [1,0]],
				 [[1,1,1],
				  [0,0,1]],
				 [[0,1],
				  [0,1],
				  [1,1]],
				 [[1,0,0],
				  [1,1,1]]]
		},
		{
			map: [[[1,1,1],
				   [0,1,0]],
				  [[0,1],
				   [1,1],
				   [0,1]],
				  [[0,1,0],
				   [1,1,1]],
				  [[1,0],
				   [1,1],
				   [1,0]]]
		},
		{
			map:[[[1,1,1,1]]
				 [[1],
				  [1],
				  [1],
				  [1]]]
		}
	],

	initialize: function(canvasElem) {
		CanvasNode.initialize.call(this);
		
		this.canvas = new Canvas(canvasElem);
		this.canvas.frameDuration = 30;
		this.canvas.append(this);

		for(var i = 0; i < this.shapes.length; i++) {
			this.append(this.shapes[i]);
		}
	},

	start: function() {
		this.addFrameListener(function(){
				
		});	
	},

	pause: function() {
		
	},

	restart: function() {
	
	},

	stop: function() {
		  
	}
});
