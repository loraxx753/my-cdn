export default () => {
	document.querySelector('svg-js').addEventListener('loading', function() {
		const circles = new SVG.List()

		console.log('loading')

		Array(12).fill(0).map(ran => {
			const [x, y] =  [ math.randomInt(this.minX, this.width/2), math.randomInt(this.minY, this.height/2) ]
			circles.push(this.screen.circle(10).attr({ 
				fill: `hsl(${x}, 100%,  50%)`,
				opacity: 0.8
			}).center(x, y))
		})

		this.callback = () => {
			if(circles[1]) {
				circles.scale(1.01)
			}
			// circles.each(c => console.log(c.radius()))
			window.requestAnimationFrame(this.callback)
		}
	})
}