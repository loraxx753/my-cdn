import './element';

	export default {
	  title: 'Elements/<svg-js>',
	  argTypes: {
		foo: { control: 'boolean' },
		bar: { control: { type: 'select', options: ['biz', 'baz'] } },
	  },
	};
	
	const Template = ({ foo, ...args }) => {
		return `<svg-js></svg-js>`
	};
	
	export const SvgJs = Template.bind({});
	SvgJs.args = {
	  foo: true,
	};
	
	export const SvgJsAlt = Template.bind({});
	SvgJsAlt.args = {
		foo: true,
	};