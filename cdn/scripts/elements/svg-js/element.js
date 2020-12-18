;(async () => {

	let overflow = 'visible'

	if(customElements.get('svg-js')) return
	customElements.define('svg-js', class extends HTMLElement {
		constructor() {
			super()
			this.attachShadow({mode: 'open'})
			this.callback = function() {}
		}
		static get observedAttributes() { return [ ]; }

		connectedCallback() { 
			// document.addEventListener('keypress', ({key}) =>{ 
			// 	if(key !== 'v') return
			// 	overflow = (overflow == 'visible') ? 'hidden' : 'visible'
			// 	this.updateElement()
			// })
			this.cursor = 'grab';
			this.shadowRoot.innerHTML=`<style></style><div id="drawing"></div>`
			let [ minX, minY, width, height ] = [-window.innerWidth/2,-window.innerHeight/2, window.innerWidth, window.innerHeight]

			this.screen = SVG().addTo(this.shadowRoot.querySelector('#drawing')).viewbox(minX, minY, width, height)

			this.minX = minX
			this.minY = minY
			this.width = width
			this.height = height
			
			this.updateElement()
			const evt = new CustomEvent('load', { detail: { draw: this.screen } })
			this.dispatchEvent(evt)
			console.log(this.screen.circle(100))
			document.addEventListener('mousemove', ({ metaKey, buttons, x, y, movementX, movementY }) => {
				if(buttons) {
					this.minY-=movementY
					this.minX-=movementX
	
					this.screen.viewbox(this.minX, this.minY, this.width, this.height)
				}
			})	
			if(this.animating) window.requestAnimationFrame(this.callback)
		}
		attributeChangedCallback(name, oldValue, newValue) {
			console.log(`${this.nodeName.toLowerCase()}'s attribute ${name} has changed from ${oldValue} to ${newValue}`);
			this.updateElement()
		}
		disconnectedCallback() {
			console.log(`${this.nodeName.toLowerCase()} has disconnected.`);
		}
			
		adoptedCallback() {
			console.log(`${this.nodeName.toLowerCase()} has been adopted.`);
		}
		updateElement() {
			this.shadowRoot.querySelector('style').textContent
			=`svg { 
			   overflow: ${overflow}; 
			   width: calc(100vw);
			   height: calc(100vh);
			   border: 1px solid black;
		   }`
		}

	})
})()