export let screen = null

export default (async () => {
		let overflow = 'visible'
	
		if(customElements.get('svg-js')) return
		customElements.define('svg-js', class extends HTMLElement {
			constructor() {
				super()
				this.attachShadow({mode: 'open'})
				this.callback = function() {}
				this.minX = this.oMinX = -window.innerWidth/2
				this.minY = this.oMinY =-window.innerHeight/2
				this.width = this.oWidth = window.innerWidth
				this.height = this.oHeight = window.innerHeight

				;['groups', 'events', 'listeners', 'games'].map(n => this[n] = {})
				this.animationFrame = null
			}
			static get observedAttributes() { return [ 'game' ]; }
	
			connectedCallback() { 
				const evt = new CustomEvent('load', { detail: { draw: this.screen } })
				
				this.style.cursor = 'grab'
				this.cursor = 'grab';
				this.shadowRoot.innerHTML=`<style>
					svg[moveable] {
						cursor: grab;
					}
				</style><div id="drawing"></div>`
	
				screen = this.screen = SVG().addTo(this.shadowRoot.querySelector('#drawing')).viewbox(
					this.minX,
					this.minY,
					this.width,
					this.height
				)

				
				// ;['hud', 'crosshair'].map(name => this.groups[name] = this.screen.group())

				this.dispatchEvent(evt)
				this.loadGame(this.getAttribute('game'))

				this.updateElement()
			}
			async attributeChangedCallback(name, oldValue, newValue) {
				if(oldValue == null) return
				switch (name) {
					case 'game':
						this.screen.clear()
						this.loadGame(newValue)
						break;
				
					default:
						break;
				}
				console.log(`${this.nodeName.toLowerCase()}'s attribute ${name} has changed from ${oldValue} to ${newValue}`);
			}
			disconnectedCallback() {
				console.log(`${this.nodeName.toLowerCase()} has disconnected.`);
			}
				
			adoptedCallback() {
				console.log(`${this.nodeName.toLowerCase()} has been adopted.`);
			}
			updateElement() {
				this.shadowRoot.querySelector('style').textContent =`svg { 
			   overflow: ${overflow}; 
			   width: calc(100vw);
			   height: calc(100vh);
			}`
			}

			async loadGame(chosenGame) {
				this.screen.clear()
				this.screen.viewbox(this.oMinX, this.oMinY, this.oWidth, this.oHeight)

				this.events.loading = new CustomEvent('loading')
				window.cancelAnimationFrame(this.animationFrame)
				const start = this.screen.text('start').center(0,0).attr({
					color: '#000',
				}) //.click(async e => {
					// Object.entries(this.groups).map(n => this.groups[n[0]].clear())
					this.screen.clear()

					if(this.hasAttribute('moveable')) {
						this.shadowRoot.querySelector('svg') // .addAttribute('moveable', true)
						document.addEventListener('mousemove', ({ metaKey, buttons, x, y, movementX, movementY }) => {
							if(buttons) {
								let {x, y, width, height} = this.screen.viewbox()
								x-=movementX
								y-=movementY
								this.screen.viewbox(x, y, width, height)
							}
							else {
							
							}
						})
					}
	



					this.games[chosenGame] = (await import(`/scripts/elements/svg-js/games/${chosenGame}/loading.js`)).default
					// console.log(this.games)

					this.games[chosenGame]()
					this.dispatchEvent(this.events.loading)
					this.animationFrame = window.requestAnimationFrame(this.callback)
				//})
			}

			get center() {
				if(!this.screen) {
					return { x:0, y:0}
				} else {
					const {x, y, width, height} = this.screen.viewbox()
					return { x:x + width/2, y: y + height/2}	
				}
			}
		})
	})()

