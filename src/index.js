import { registerBlockType } from '@wordpress/blocks';
import {
	ToggleControl,
	PanelBody,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import './style.scss';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

const allAttr = {
	numberColumns: {
		type: 'string',
	},
	numberPosts: {
		type: 'string',
	},
	categories: {
		type: 'object',
	},
	selectedCategory: {
		type: 'string',
	},
	showExcerpt: {
		type: 'boolean',
		default: true,
	},
	showPostThumbnail: {
		type: 'boolean',
		default: true,
	},
};

function latestPosts(props) {
	const onChangeCategory = (value) => {
		props.setAttributes({ selectedCategory: value });
	};

	const onChangeNumberPosts = (value) => {
		props.setAttributes({ numberPosts: value });
	};

	const onChangeShowExcerpt = (value) => {
		props.setAttributes({ showExcerpt: value });
	};

	const onChangeShowPostThumbnail = (value) => {
		props.setAttributes({ showPostThumbnail: value });
	};

	const getCategoryNames = () => {
		const options = [];
		if (!props.attributes.categories) {
			wp.apiFetch({
				url: '/wp-json/wp/v2/categories',
			}).then((categories) => {
				props.setAttributes({ categories });
			});
		}
		if (props.attributes.categories) {
			props.attributes.categories.map((category) => {
				return options.push({
					label: category.name,
					value: category.id,
				});
			});
		}

		return options;
	};

	return (
		<div>
			<InspectorControls>
				<PanelBody title={__('Block Settings')} initialOpen={true}>
					<SelectControl
						label={__('Select Category')}
						value={props.attributes.selectedCategory}
						onChange={onChangeCategory}
						options={getCategoryNames()}
					/>
					<ToggleControl
						label={__('Show Excerpt ?')}
						onChange={onChangeShowExcerpt}
						checked={props.attributes.showExcerpt}
					/>
					<ToggleControl
						label={__('Show Featured Images ?')}
						onChange={onChangeShowPostThumbnail}
						checked={props.attributes.showPostThumbnail}
					/>
					<TextControl
						label={__('Number of posts to show')}
						onChange={onChangeNumberPosts}
						value={props.attributes.numberPosts}
					/>
				</PanelBody>
			</InspectorControls>
			<ServerSideRender
				block="my-first-dynamic-gutenberg-block/latest-post"
				attributes={{
					selectedCategory: props.attributes.selectedCategory,
					categories: props.attributes.categories,
					numberPosts: props.attributes.numberPosts,
					numberColumns: props.attributes.numberColumns,
					showExcerpt: props.attributes.showExcerpt,
					showPostThumbnail: props.attributes.showPostThumbnail,
				}}
				httpMethod="POST"
			/>
		</div>
	);
}

registerBlockType('my-first-dynamic-gutenberg-block/latest-post', {
	title: 'Latest Post Custom Block',
	icon: 'megaphone',
	category: 'text',
	attributes: allAttr,
	supports: {
		html: false,
		align: ['wide', 'full'],
	},
	edit: latestPosts,
	save() {
		return null;
	},
});
