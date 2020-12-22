export default () => {
	document.querySelector('svg-js').addEventListener('loading', function() {	
		const mousemovement = (e) => {
			const { metaKey, buttons, x, y, movementX, movementY } = e
			// e.stopPropagation()
			if(buttons) {
				// const size = '10px', colors = ['#000', '#999']
				this.minY-=movementY
				this.minX-=movementX

				this.screen.viewbox(this.minX, this.minY, this.width, this.height)
			}
		}

		
		this.removeEventListener('mousemove', mousemovement)
		this.removeEventListener('loading', this.events.loading);

		this.groups.crosshair = this.screen.group()
		
		this.addEventListener('mousedown', () => this.style.cursor = 'grabbing')
		this.addEventListener('mouseup', () => this.style.cursor = 'grab')
		this.addEventListener('mousemove', mousemovement)


		this.groups.crosshair.add(this.screen.circle(15).center(0,0).fill('none').stroke({ width: 1, color: '#000'}))
		this.groups.crosshair.add(this.screen.line(-10, 0, 10, 0)).stroke({ width: 1, color: '#000' })
		this.groups.crosshair.add(this.screen.line(0, -10, 0, 10)).stroke({ width: 1, color: '#000' })
		
		this.groups.crosshair.hud = this.screen.group()
		this.groups.crosshair.hud.add(this.screen.plain(`{0, 0}`).move(this.minX + this.width/2, this.minY + this.height/2 + 7).font({ size: '10px', fill: '#000', family: 'sans-serif' }))
		this.groups.crosshair.front()
		// this.groups.hud.add()
		
		const tanks = Array(0).fill('hsl(120, 100%, 25%)').map((fill, idx) => {
			const x = (Math.random() * this.width) + this.minX
			const y = ((Math.random() * this.height) + this.minY)
			

			// this.screen.rect(80, 50).center(x, y).attr({
			// 	fill
			// }).back()
			// this.screen.rect(80, 100).center(x, y).attr({
			// 	fill
			// }).back()
			// this.screen.rect(80, 100).center(x, y).attr({
			// 	fill
			// }).back()
			this.screen.circle(100/math.phi).center(x, y).attr({
				fill,
			}).stroke({width: 1, color: '#000'}).back()
			this.screen.rect(10, 75*math.phi).center(x, y - 40).attr({
				fill
			}).stroke({width: 1, color: '#000'}).back().radius(3)

			this.screen.rect(100, 100*math.phi).center(x, y).attr({
				fill,
			}).stroke({width: 1, color: '#000'}).back().radius(5)
			
			this.screen.rect(100/math.phi/2, (200/math.phi)).center(x-40, y).attr({
				fill: '#000',
			}).back().radius(math.phi**2)

			this.screen.rect(100/math.phi/2, (200/math.phi)).center(x+40, y).attr({
				fill: '#000',
			}).back().radius(math.phi**2)
		})
		
		console.log('here1')			


		this.callback = () => {		
			console.log('here')			
			const {x, y, width, height} = this.screen.viewbox()
			// this.screen.viewbox(x, y-1, width, height)
			this.groups.crosshair.hud.clear()
			this.groups.crosshair.hud.add(this.screen.plain(`{${this.center.x}, ${this.center.y}}`).move(this.minX + this.width/2, this.minY + this.height/2 + 7).font({ size: '10px', fill: '#000', family: 'sans-serif' }))
			this.groups.crosshair.center(this.center.x, this.center.y)

			this.animationFrame = window.requestAnimationFrame(this.callback)
		}

	})
}
