Block = Klass(CanvasNode, {
	backgroud: 'rgb(0, 0, 0)',
	opacity: 1.0,
	size: 10,
	
	initialize: function(options) {
		CanvasNode.initialize.call(this);
		
		this.shape = new Rectangle(this.size, this.size, {
			fill: this.background,
			stroke: 'cyan', 
			strokeWidth: 1,
			centered: true,
			x: options.cx,
			y: options.cy
		});
		
		this.append(this.shape);
	}
});
