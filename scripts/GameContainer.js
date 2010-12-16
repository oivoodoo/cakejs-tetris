GameContainer = Klass(CanvasNode, { 
	score: new ScorePanel(),
	background: '#FFFFFF',
	width: 300,
	height: 480,
	
	initialize: function(canvasElem) {
		CanvasNode.initialize.call(this);
		
		this.canvas = new Canvas(canvasElem);
		this.canvas.frameDuration = 30;
		this.canvas.append(this);
		
		// Draw container where we will place shape objects.
		this.container = new Rectangle(this.width, this.height, {
		  fill: this.background,
		  rx: 2,
		  ry: 2,
		  strokeWidth: 1,
		  stroke: 'cyan',
		  x: 0,
		  y: 0
		});
		
		this.append(this.container);

		// This panel will generate next shape and preview it.
		// Score panel also contains preview for the game object
		// and scores what use have got.
		this.append(this.score);
		for(var i = 0; i < 1; i++) {
			this.append(this.score.next());
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
