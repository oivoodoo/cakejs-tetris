Block = Klass(CanvasNode, {
	backgroud: 'rgb(0, 0, 0)',
	opacity: 1.0,
	
	initialize: function(options) {
		CanvasNode.initialize.call(this);
		
		this.shape = new Rectangle(10, 10, {
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
