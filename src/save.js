import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const styleSave = {
		backgroundRepeat: attributes.repeat,
		backgroundSize: attributes.size,
		backgroundImage: `url(${attributes.image.url})`,
		backgroundPosition: attributes.focalPoint
			? `${attributes.focalPoint.x * 100}% ${
					attributes.focalPoint.y * 100
			  }%`
			: '',
		backgroundColor: attributes.backgroundColor,
	};

	return (
		<div style={styleSave}>
			<InnerBlocks.Content />
		</div>
	);
}
