Shape = Klass(CanvasNode, {
	map : [ [0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]],
	drag: false,
	
	initialize: function(options) {
		CanvasNode.initialize.call(this);
		
		if (options != null) {
			if (options.map != null) {
				this.map = options.map;
			}
			if (options.cx != null) {
				this.cx = options.x;
			}
			if (options.cy != null) {
				this.cy = options.y;
			}
		}
		
		this.addEventListener('drag', function(e) {
			this.x += (this.x - e.x > 0 ? -1 : 1);
			this.y += (this.y - e.y > 0 ? -1 : 1);
		});
		
		this.render_shape();
	},
	
	render_shape: function() {
		for(var i = 0; i < this.map.length; i++) {
			for(var j = 0; j < this.map[i].length; j++) {
				if (this.map[i][j] == 1) {
					this.append(new Block({cx: this.x + j * 10, cy: this.y + i * 10}));
				}
			}
		}
	}
});
