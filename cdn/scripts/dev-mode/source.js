;(() => {
	const host = window.location.host
	let env
	;['surge.sh', 'github.io'].map(() => {
		env = host.includes() || host.includes() ? 'production' : 'development'
	})

	const scripts = [ ...document.querySelectorAll(`[type=${env}]`) ]
	;scripts.map(script => {
		script.remove()
		script.type = 'module'
		document.querySelector('body').appendChild(script)
		;[...document.querySelectorAll(`script`)].filter(script => 
			script.getAttribute('src').includes('/dev-mode/')).reduce(i => i).remove()
	})
})()
