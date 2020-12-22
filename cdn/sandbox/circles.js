function Circle({size, x, y, color, stroke = 1 }, screen) {
	const circle = screen.circle(size).center(x, y).fill(color).stroke({width:stroke, color:'#000'})
		circle.on(['mousemove'], (e) => {
			e.stopPropagation()
			const { metaKey, buttons, x, y, movementX, movementY } = e
			if(buttons) {
				circle.dx(movementX)
				circle.dy(movementY)
			}
		})

	return circle
}
;(() => {
	document.querySelector('svg-js').addEventListener('load', function() {
		var group = this.screen.group()
		const toggleGridlines = ({interval = 30, length = 1, axis = 'y', colors = ['#000', '#999'], size = '10px'} = {}) => {
			const axisSize = axis == 'x' ? window.innerWidth/2/interval : window.innerHeight/2/interval
			Array(Math.round(axisSize)).fill(0).map((_, i) => {
				let [movement1, movement2, x, y, positive, negative, display, offset] = [0, 0, 0, 0, Array(), Array()]
				switch(axis) {
					case 'x':
						x = interval * i // current axis
						y = length // length of gridline
						movement1 = [x, y+10]
						movement2 = [-x, y+10]
						positive = [x, y, x, -y]
						negative = [-x, y, -x, -y]
						break;

					case 'y':
						x = length	// length of gridline
						y = interval * i // current axis
						movement1 = [x+10, y]
						movement2 = [x+10, -y]
						positive = [x, y, -x, y]
						negative = [x, -y, -x, -y]
						break;
				}
				if(i > 0) {
					group.add(this.screen.text(`${interval * i}`).move(...movement1).font({ size, fill: colors[0], family: 'sans-serif' }))
					group.add(this.screen.text(`-${interval * i}`).move(...movement2).font({ size, fill: colors[1], family: 'sans-serif' }))
				}
				group.add(this.screen.line(...positive).stroke({ color: colors[0], linecap: 'round' }))
				group.add(this.screen.line(...negative).stroke({ color: colors[1], linecap: 'round' }))

			})

		};
		this.text = new SVG.Text()
		this.text = this.screen
			.text(`minX:${this.minX} minY:${this.minY} width:${this.width} height:${this.height}.`)
			.fill('#000')
			.move(this.minX,this.minY).clear()

		toggleGridlines({ axis: 'x'});
		toggleGridlines({ axis: 'y'})

		// const circle1 = new Circle({
		// 	size: 100,
		// 	x: 300,
		// 	y: 0,
		// }, this.screen)

		// const circle2 = new Circle({
		// 	size: 100,
		// 	x: -300,
		// 	y: 0,
		// }, this.screen)
		var group = Array()
		Array(6**3).fill(1)
		// .map((_, i) => math.isPrime(i+_) ? i+_ : false)
		// .map((_, i) => i+_%2 == 0 ? i+_ : false)
		.map((_, i) => math.phi**i)
		// .map((_, i) => math.sqrt(2)**(i+_))
		// .map((_, i) => math.sqrt(3)**(i+_))
		// .map((_, i) => math.sqrt(5)**(i+_))
		// .map((_, i) => math.sqrt(7)**(i+_))
		// .map((_, i) => math.sqrt(11)**(i+_))
			.filter(e=>e)
			.reverse()
			.map((size, i) => {
				group.push(new Circle({
					size,
					x: Math.random()*this.width-this.width/2,
					y: Math.random()*this.width-this.width/2,
					stroke: 0,
					// color: 'transparent',
					color: new SVG.Color({ h: size*.8, s: 100, l: 50 }),
				}, this.screen))
			})

		this.callback = () => {
			this.text.text(`minX:${this.minX} minY:${this.minY} width:${this.width} height:${this.height}.`)
				.fill('#000')
				.move(this.minX,this.minY)
			group.map(g =>g.animate().scale(.999))

			window.requestAnimationFrame(this.callback)
		}

		document.addEventListener('keypress', ({ key }) => {
			switch(key) {
				case 't':
					group.visible() ? group.hide() : group.show()
			}
		})
	})
})()