import { screen } from '../../element.js'
import { Circle } from '../../classes/Shapes.js'
import { randArray, chanceOfNegative, diameterFromArea, areaFromDiameter } from './utils.js'

const { pickRandom, randomInt, round } = math

const area = (radius) => multiply(2, pi)

let bool = false

export const createMatter = (x, y, size) => {
	x = chanceOfNegative ( pickRandom( randArray(10, this.width/2) ) )
	y = chanceOfNegative ( pickRandom( randArray(10, this.height/2) ) )
	size = size || randomInt(1, 5)
	return new Circle(size).center(x, y)
}

export const addMatter = (x, y, { size }) => {

	var path = screen.path([
		['M', 0, 0],
		['L', 0, 0]
	])
	// .stroke({ 
	// 	color: '#f06',
	// 	width: 1,
	// 	linecap: 'round',
	// 	linejoin: 'round'
	// })

	path.animate().plot([
		['M', x, y],
		['L', 0, 0]
	]).after(p => {
		bool=true
	})
	rock.front()
	rock.data('collided', { value: { data: false }})
	list.push({
		rock,
		path
	})
}

export default () => {
	document.querySelector('svg-js').addEventListener('loading', async function() {
		let list = []

		const protoPlanet = new Circle(10).center(0, 0).back()
		
		screen.text('This is not supposed to work yet (loading.js:51)').center(0, -50)

		Array(500).fill(0).map((_, i) => {
			

		})
		let idx = 0

		this.callback = () => {

			if(bool) {
				list.map(({rock, path}, i, copy) => {
					const {x, y} = path.pointAt(idx);
					rock.center(x,y)
					
					// if(rock.data('collided')) {
					if(protoPlanet.inside(x, y) && !rock.data('collided').value.data) {
						rock.data('collided', { value: { data: true }})
						protoPlanet.incorporate(rock)
					}
				})
				idx++
			}
			protoPlanet.front()
			window.requestAnimationFrame(this.callback)
		}
	})
}
