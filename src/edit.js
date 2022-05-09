import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	Toolbar,
	IconButton,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	SelectControl,
	Button,
	TextControl,
} from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		image,
		focalPoint,
		repeat,
		size,
		minHeight,
		text,
		alignment,
		buttonText,
		buttonLink,
	} = attributes;

	const classes = classnames(`text-box-align-${alignment}`);

	const onChangeAlignment = (newAlignment) => {
		setAttributes({ alignment: newAlignment });
	};

	const handleImage = (newImage) => {
		setAttributes({ image: newImage });
	};

	const newFocalPoint = (newPoint) => {
		setAttributes({ focalPoint: newPoint });
	};

	const clearMedia = () => {
		setAttributes({
			image: undefined,
			backgroundType: undefined,
			focalPoint: undefined,
		});
	};

	const styleRepeat = (repeatValue) => {
		setAttributes({ repeat: repeatValue });
	};

	const styleSize = (sizeValue) => {
		setAttributes({ size: sizeValue });
	};

	const styleHeight = (heightValue) => {
		setAttributes({ minHeight: heightValue });
	};

	const onChangeText = (newText) => {
		setAttributes({ text: newText });
	};

	const onChangeButtonText = (newButtonText) => {
		setAttributes({ buttonText: newButtonText });
	};

	const onChangeButtonLink = (newButtonLink) => {
		setAttributes({ buttonLink: newButtonLink });
	};

	const style = {
		minHeight: minHeight + 'px',
		backgroundRepeat: repeat,
		backgroundSize: size,
		backgroundPosition:
			typeof focalPoint !== 'undefined'
				? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
				: ``,
		backgroundImage:
			typeof image !== 'undefined' ? `url(${image.url})` : ``,
	};

	return (
		<div {...useBlockProps()} style={style}>
			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={handleImage}
						allowedTypes={['image']}
						render={({ open }) => (
							<IconButton
								className="components-toolbar__control"
								label={__('Edit media')}
								icon="edit"
								onClick={open}
							/>
						)}
					/>
				</Toolbar>
			</BlockControls>
			{!!image && (
				<InspectorControls>
					<PanelBody title={__('Media settings')} initialOpen={true}>
						<FocalPointPicker
							label={__('Background Position')}
							url={image.url}
							value={focalPoint}
							onChange={newFocalPoint}
						/>
						<PanelRow>
							<Button
								isSecondary
								isSmall
								className="block-library-backgroundimage__reset-button"
								onClick={clearMedia}
							>
								{__('Clear Media')}
							</Button>
						</PanelRow>
						<SelectControl
							label="Repeat"
							help="If and how this background should repeat."
							value={repeat}
							options={[
								{ label: 'Repeat', value: 'repeat' },
								{
									label: 'Repeat Horizontally',
									value: 'repeat-x',
								},
								{
									label: 'Repeat Vertically',
									value: 'repeat-y',
								},
								{ label: 'No Repeat', value: 'no-repeat' },
								{ label: 'Space', value: 'space' },
								{ label: 'Round', value: 'round' },
							]}
							onChange={styleRepeat}
						/>
						<SelectControl
							label="Size"
							help="Background size."
							value={size}
							options={[
								{ label: 'Auto', value: 'auto' },
								{ label: 'Cover', value: 'cover' },
								{ label: 'Contain', value: 'contain' },
							]}
							onChange={styleSize}
						/>
						<TextControl
							label={__('Minimum Height')}
							value={minHeight}
							onChange={styleHeight}
						/>
					</PanelBody>
					<PanelBody title={__('Button settings')} initialOpen={true}>
						<TextControl
							label={__('Button Redirect')}
							value={buttonLink}
							onChange={onChangeButtonLink}
						/>
					</PanelBody>
				</InspectorControls>
			)}
			{image && image.url ? (
				<div />
			) : (
				<MediaPlaceholder onSelect={handleImage} />
			)}
			{text && (
				<BlockControls>
					<AlignmentToolbar
						value={alignment}
						onChange={onChangeAlignment}
					/>
				</BlockControls>
			)}
			<RichText
				className={classes}
				placeholder={__('Your Text', 'banner')}
				tagName="h2"
				onChange={onChangeText}
				value={text}
			/>
			<div href={buttonLink} target="_blank">
				<button className="banner-button">
					<RichText
						placeholder={__('Your Text', 'banner')}
						tagName="p"
						onChange={onChangeButtonText}
						value={buttonText}
					/>
				</button>
			</div>
		</div>
	);
}
