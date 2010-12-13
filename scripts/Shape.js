Shape = Klass(CanvasNode, {
	map: [],
	degree: 0,
	
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

		this.addEventListener('click', function(e) {
			this.rotate();
		});
		
		this.addEventListener('drag', function(e) {
			this.x += (this.x - e.x > 0 ? -1 : 1);
			this.y += (this.y - e.y > 0 ? -1 : 1);
		});
		
		this.render_shape();
	},

	rotate: function() {
		this.rotation = Math.random() * 10 * 90;
	},
	
	ensure_degree: function(degree) {
		if (degree >= 4) {
			degree = 0;
		}
		return degree;
	},
	
	render_shape: function() {
		if (this.childNodes.length == 0) {
			for(var i = 0; i < this.map.length; i++) {
				for(var j = 0; j < this.map[i].length; j++) {
					if (this.map[i][j] == 1) {				
						this.append(new Block({cx: this.x + j * 10, cy: this.y + i * 10}));
					}
				}
			}
		}
	}
});