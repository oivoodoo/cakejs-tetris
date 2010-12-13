Shape = Klass(CanvasNode, {
	map: [],
	drag: false,
	degree: 0,
	current_map: [],
	
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
			if (options.degree != null) {
				this.degree = options.degree
			}	
		}
		
		this.current_map = this.map[this.degree];

		this.addEventListener('click', function(e) {
			this.rotate();
		});
		
		this.addEventListener('drag', function(e) {
			this.x += (this.x - e.x > 0 ? -1 : 1);
			this.y += (this.y - e.y > 0 ? -1 : 1);
		});
		
		this.addFrameListener(function() {
			this.render_shape();
		});
	},

	rotate: function() {
		this.degree = this.ensure_degree(this.degree + 1);
		this.current_map = this.map[this.degree];
		this.removeAllChildren();
	},
	
	ensure_degree: function(degree) {
		if (degree >= this.map.length) {
			degree = 0;
		}
		return degree;
	},
	
	render_shape: function() {
		if (this.childNodes.length == 0) {
			for(var i = 0; i < this.current_map.length; i++) {
				for(var j = 0; j < this.current_map[i].length; j++) {
					if (this.current_map[i][j] == 1) {				
						this.append(new Block({cx: this.x + j * 10, cy: this.y + i * 10}));
					}
				}
			}
		}
	}
});
