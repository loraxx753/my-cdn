
(async () => {
	if(customElements.get('show-tell')) return
	customElements.define('show-tell', class extends HTMLElement {
		constructor() {
			super()
			this.attachShadow({mode: 'open'}) //<show-tell>
		}
		static get observedAttributes() { return [ 'foo' ]; }

		connectedCallback() { 
			const style = document.createElement('style')
			style.textContent = `p {
				color: ${this.getAttribute('foo')?'blue':'red'};
			}`
			this.shadowRoot.appendChild(style)

			const p = document.createElement('p')
			p.textContent = `connectedCallback() has run on <${this.nodeName.toLowerCase()}>.`
			this.shadowRoot.appendChild(p)

			this.updateElement() 
		}
		attributeChangedCallback(name, oldValue, newValue) {
			if(!oldValue) return;

			console.log(`${this.nodeName.toLowerCase()}'s attribute ${name} has changed from ${oldValue}`);
			this.updateElement()
		}
		disconnectedCallback() {
			console.log(`${this.nodeName.toLowerCase()} has disconnected.`);
		}
			
		adoptedCallback() {
			console.log(`${this.nodeName.toLowerCase()} has been adopted.`);
		}
		updateElement() {
			const p = document.createElement('p')
			p.textContent = `updateElement() has run on <${this.nodeName.toLowerCase()}>.`
			
			this.shadowRoot.appendChild(p)
		}
	})
})()