import './element';

	export default {
	  title: 'Elements/<show-tell>',
	  argTypes: {
		foo: { control: 'boolean' },
		bar: { control: { type: 'select', options: ['biz', 'baz'] } },
	  },
	};
	
	const Template = ({ foo, ...args }) => {
		return `<show-tell ${foo?'foo':''}></show-tell>`
	};
	
	export const ShowTell = Template.bind({});
	ShowTell.args = {
	  foo: true,
	};
	
	export const ShowTellAlt = Template.bind({});
	ShowTellAlt.args = {
		foo: false,
	};