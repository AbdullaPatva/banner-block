import { registerBlockType } from '@wordpress/blocks';

const allAttr = {
	numberPosts: {
		type: 'string',
	},
	categories: {
		type: 'object',
	},
	selectedCategory: {
		type: 'string',
	},
};

function latestPosts(props) {
	function onChangeCategory(e) {
		props.setAttributes({ selectedCategory: e.target.value });
	}

	function onChangeNumberPosts(e) {
		props.setAttributes({ numberPosts: e.target.value });
	}

	if (!props.attributes.categories) {
		wp.apiFetch({
			url: '/wp-json/wp/v2/categories',
		}).then((categories) => {
			props.setAttributes({ categories });
		});
	}

	if (!props.attributes.categories) {
		return 'loading...';
	}

	if (
		props.attributes.categories &&
		props.attributes.categories.length === 0
	) {
		return 'No Categories Found';
	}

	return (
		<div>
			<select
				onChange={onChangeCategory}
				value={props.attributes.selectedCategory}
			>
				{props.attributes.categories.map((category) => {
					return (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					);
				})}
			</select>
			<input
				type="text"
				onChange={onChangeNumberPosts}
				value={props.attributes.numberPosts}
			/>
		</div>
	);
}

registerBlockType('my-first-dynamic-gutenberg-block/latest-post', {
	title: 'Latest Post Custom Block',
	icon: 'megaphone',
	category: 'text',
	attributes: allAttr,
	edit: latestPosts,
});
