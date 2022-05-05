import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import '../style.scss';

registerBlockType('create-block/text-input', {
	title: __('Text Input', 'banner-block'),
	description: __('A text input block', 'banner-block'),
	icon: 'format-quote',
	parent: ['create-block/banner-block'],
	supports: {
		html: false,
		color: {
			gradients: true,
		},
		spacing: true,
	},
	styles: [
		{
			name: 'squared',
			label: 'Squared',
			isDefault: true,
		},
		{
			name: 'rounded',
			label: 'Rounded',
		},
	],
	attributes: {
		text: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
		shadow: {
			type: 'boolean',
			default: false,
		},
		shadowOpacity: {
			type: 'number',
			default: 30,
		},
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		style: {
			type: 'object',
			default: {
				spacing: {
					padding: {
						right: '50px',
						top: '50px',
						left: '50px',
						bottom: '50px',
					},
				},
			},
		},
	},
	edit: Edit,
	save: Save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				transform: ({ content, align }) => {
					return createBlock('blocks-course/text-box', {
						text: content,
						alignment: align,
					});
				},
			},
			{
				type: 'enter',
				regExp: /textbox/,
				transform: () => {
					return createBlock('blocks-course/text-box', {
						shadow: true,
						gradient: 'red-to-blue',
					});
				},
			},
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock('blocks-course/text-box');
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				isMatch: ({ text }) => {
					return text ? true : false;
				},
				transform: ({ text, alignment }) => {
					return createBlock('core/paragraph', {
						content: text,
						align: alignment,
					});
				},
			},
		],
	},
});
