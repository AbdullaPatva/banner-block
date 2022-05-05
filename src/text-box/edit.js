import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import {
	//eslint-disable-next-line
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';

const { __Visualizer: BoxControlVisualizer } = BoxControl;

export default function Edit(props) {
	const { attributes, setAttributes } = props;

	const { text, alignment, style, shadow, shadowOpacity } = attributes;

	const onChangeAlignment = (newAlignment) => {
		setAttributes({ alignment: newAlignment });
	};

	const onChangeText = (newText) => {
		setAttributes({ text: newText });
	};

	const classes = classnames(`text-box-align-${alignment}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	});

	const toggleShadow = () => {
		setAttributes({ shadow: !shadow });
	};

	const onChangeShadowOpacity = (newOpacity) => {
		setAttributes({ shadowOpacity: newOpacity });
	};

	return (
		<>
			<InspectorControls>
				{shadow && (
					<PanelBody title={__('Shadow Settings', 'text-box')}>
						<RangeControl
							label={__('Shadow Opacity', 'text-box')}
							value={shadowOpacity}
							min={10}
							max={40}
							step={10}
							onChange={onChangeShadowOpacity}
						/>
					</PanelBody>
				)}
			</InspectorControls>
			<BlockControls
				controls={[
					{
						title: __('Box Shadow', 'text-box'),
						icon: 'admin-page',
						onClick: toggleShadow,
						isActive: shadow,
					},
				]}
			>
				<AlignmentToolbar
					value={alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<div
				{...useBlockProps({
					className: classes,
				})}
			>
				<RichText
					placeholder={__('Your Text', 'text-box')}
					tagName="h2"
					onChange={onChangeText}
					value={text}
				/>
				<BoxControlVisualizer
					values={style && style.spacing && style.spacing.padding}
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</>
	);
}
