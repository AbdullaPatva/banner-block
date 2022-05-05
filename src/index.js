import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import './style.scss';

registerBlockType('create-block/banner-block', {
	edit: Edit,
	save,
});
