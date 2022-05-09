import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const {
		text,
		alignment,
		size,
		focalPoint,
		image,
		repeat,
		minHeight,
		buttonText,
		buttonLink,
	} = attributes;

	const style = {
		minHeight: minHeight + 'px',
		backgroundRepeat: repeat,
		backgroundSize: size,
		backgroundImage: `url(${image.url})`,
		backgroundPosition: focalPoint
			? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
			: '',
	};

	const classes = classnames(`text-box-align-${alignment}`);

	return (
		<div {...useBlockProps.save()} style={style}>
			<RichText.Content className={classes} tagName="h2" value={text} />
			<a href={buttonLink} target="_blank" rel="noreferrer noopener">
				<button className="banner-button">
					<RichText.Content tagName="p" value={buttonText} />
				</button>
			</a>
		</div>
	);
}
