module.exports = ({elementName}) => ({
		titleCase() {
			return elementName.split('-').map(i => i[0].toUpperCase() + i.slice(1)).join('')
		},
		hyphenCase() {
			return elementName
		},
		spaceCase() {
			return elementName.split("-").map(i => i[0].toUpperCase() + i.slice(1)).join(' ')
		},
		get element() { return `
(async () => {
	if(customElements.get('${elementName}')) return
	customElements.define('${elementName}', class extends HTMLElement {
		constructor() {
			super()
			this.attachShadow({mode: 'open'})
		}
		static get observedAttributes() { return []; }

		connectedCallback() { 
			const style = document.createElement('style')
			style.textContent = \`p {
				color: \${this.getAttribute('foo')?'blue':'red'};
			}\`
			this.shadowRoot.appendChild(style)

			const p = document.createElement('p')
			p.textContent = \`connectedCallback() has run on <\${this.nodeName.toLowerCase()}>.\`
			this.shadowRoot.appendChild(p)

			this.updateElement() 
		}
		attributeChangedCallback(name, oldValue, newValue) {
			if(!oldValue) return;
			console.log(\`\${this.nodeName.toLowerCase()}'s attribute \${name} has changed from \${oldValue}\`);
			this.updateElement()
		}
		disconnectedCallback() {
			console.log(\`\${this.nodeName.toLowerCase()} has disconnected.\`);
		}
			
		adoptedCallback() {
			console.log(\`\${this.nodeName.toLowerCase()} has been adopted.\`);
		}
		updateElement() {
			const p = document.createElement('p')
			p.textContent = \`updateElement() has run on <\${this.nodeName.toLowerCase()}>.\`
			
			this.shadowRoot.appendChild(p)
		}
	})
})()`},
	get story() { return `import './element';

	export default {
	  title: 'Elements/<${this.hyphenCase()}>',
	  argTypes: {
		foo: { control: 'boolean' },
		bar: { control: { type: 'select', options: ['biz', 'baz'] } },
	  },
	};
	
	const Template = ({ foo, ...args }) => {
		return \`<${elementName} \${foo?'foo':''}></${elementName}>\`
	};
	
	export const ${this.titleCase()} = Template.bind({});
	${this.titleCase()}.args = {
	  foo: true,
	};
	
	export const ${this.titleCase() + 'Alt'} = Template.bind({});
	${this.titleCase()+ 'Alt'}.args = {
		foo: false,
	};`},
	get style() { return  `/* styles for ${elementName} */` },
// 	get docs() { return `# Welcome to The Framework
// Get fucking ready. [Documentation on .mdx files](https://storybook.js.org/docs/react/api/mdx)`
// 	}	
})