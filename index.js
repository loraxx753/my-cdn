


const [ creator, fs, chalk, yargs ] = [require(`./templates/create`), require('fs'), require('chalk'), require('yargs') ];

const { argv } = yargs
    .command('create', chalk.blue('Creates a custom-element and a story.'), {
        'css-in-js': {
            description: 'Include to use CSS-in-JS instead of a ',
            type: 'boolean',
		},
		scss: {
            description: 'Include to use a scss file instead of CSS-in-JS',
            type: 'boolean',
        }

    })
    .help()
	.alias('help', 'h')

const functionName = argv._.shift()

const commands = {
	create(args) {
		const [ elementName ] = args._;
		if(!elementName.includes('-')) throw new Error(`The components name must include a dash (-)`)
		fs.access(`${__dirname}/cdn/scripts/elements/${elementName}`, (err) => {
			if(!err) return
			fs.mkdir(`${__dirname}/cdn/scripts/elements/${elementName}`, (err) => {
				Object.entries(creator({elementName})).filter(([key, value]) => typeof value != 'function').map(([key, value]) => {
					let fileEnding = ''
					switch(key) {
						case 'element':
						case 'story':
							fileEnding = 'js'
							break;
						case 'style':
								fileEnding = 'css'
							if(argv.scss)
								fileEnding = 'scss'
							break;
						case 'docs':
							fileEnding = 'mdx'
						break;
					}
					
					fs.writeFile(`${__dirname}/cdn/scripts/elements/${elementName}/${key}.${fileEnding}`, value, 
					(err) => err ? 
						console.error(err) 
						: 
						console.log(`${chalk.cyan(`<${elementName}>`)}'s ${key} has been created`))
				})
			})
		})
	},
}


if(commands[functionName]) commands[functionName](argv)