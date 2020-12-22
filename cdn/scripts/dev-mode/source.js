;(() => {
	const host = window.location.host
	let env = host.includes('surge.sh') || host.includes('github.io') ? 'production' : 'development'
	const scripts = [ ...document.querySelectorAll(`[type=${env}]`) ]
	;scripts.map(script => {
		script.remove()
		script.type = 'module'
		document.querySelector('body').appendChild(script)
	})
})()
