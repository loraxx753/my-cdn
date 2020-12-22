import { screen } from '../element.js'
import { areaFromDiameter, diameterFromArea } from '../games/universe/utils.js'

const { log } = console

export function Circle(diameter) {
	const circle = screen.circle(diameter)
	circle.area = areaFromDiameter(diameter)
	circle.incorporate = (c) => {

		log(circle.area + areaFromDiameter(c.width()))
		const d = diameterFromArea(circle.area + areaFromDiameter(c.width()))
		circle.width(d)
		circle.area = areaFromDiameter(d)
		c.remove()
	}

	return circle
}
