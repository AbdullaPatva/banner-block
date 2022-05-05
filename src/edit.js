import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	MediaPlaceholder,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	Toolbar,
	IconButton,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	SelectControl,
	Button,
} from '@wordpress/components';
import './editor.scss';
import './text-box';

export default function Edit({ className, attributes, setAttributes }) {
	const { image, focalPoint, repeat, size, backgroundColor } = attributes;

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

	const styleRepeat = (value) => {
		setAttributes({ repeat: value });
	};

	const styleSize = (value) => {
		setAttributes({ size: value });
	};

	const bgColor = (value) => {
		setAttributes({ backgroundColor: value });
	};

	const style = {
		backgroundRepeat: repeat,
		backgroundSize: size,
		backgroundColor,
		backgroundPosition:
			typeof focalPoint !== 'undefined'
				? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
				: ``,
		backgroundImage:
			typeof image !== 'undefined' ? `url(${image.url})` : ``,
	};

	return (
		<div className={className} style={style}>
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
					</PanelBody>
					<PanelBody title={__('Color settings')} initialOpen={false}>
						<ColorPalette
							value={backgroundColor}
							onChange={bgColor}
						/>
					</PanelBody>
				</InspectorControls>
			)}
			{image && image.url ? (
				<div />
			) : (
				<MediaPlaceholder onSelect={handleImage} />
			)}
			<InnerBlocks allowedBlocks={['create-block/text-input']} />
		</div>
	);
}
