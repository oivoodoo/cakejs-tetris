GameContainer = Klass(CanvasNode, { 
	score: new ScorePanel(),
	
	initialize: function(canvasElem) {
		CanvasNode.initialize.call(this);
		
		this.canvas = new Canvas(canvasElem);
		this.canvas.frameDuration = 30;
		this.canvas.append(this);

		// This panel will generate next shape and preview it.
		this.append(this.score);
		for(var i = 0; i < 10; i++) {
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
