const { randomInt, multiply, chain, pi, add } = math

const { log } = console

const { random } = Math
export const randomBool = () => random() < 0.5;
// const multiply = (a, b) => a * b
// const randomInt = (maximum, minimum) => floor( multiply(random(), maximum) ) + minimum

export const randArray = (maxLength=5, maxValue=3, minLength=1, minValue=1) => 
	Array( randomInt(minLength, maxLength) ).fill(0).map(_ => randomInt(minValue, maxValue))

export const chanceOfNegative = (randValue) => multiply(randValue, randomBool( ) ? 1 : -1)

export const diameterFromArea = (area) => chain(area/pi).sqrt().multiply(2).done()

export const areaFromDiameter = (diameter) => chain(diameter/2).pow(2).multiply(pi).done()