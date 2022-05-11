<?php
/**
 * Plugin Name:       Example Dynamic Block
 * Description:       Example dynamic block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Abu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-block
 *
 * @package           gutenberg-examples
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function register_dynamic_block_action() {

	wp_register_script(
		'my-first-dynamic-gutenberg-block-script',
		plugins_url( '/build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' ),
		true
	);

	register_block_type(
		'my-first-dynamic-gutenberg-block/latest-post',
		array(
			'editor_script'   => 'my-first-dynamic-gutenberg-block-script',
			'render_callback' => 'my_plugin_render_block_latest_post',
		)
	);

}
add_action( 'init', 'register_dynamic_block_action' );

/**
 * Renders the block content
 */
function my_plugin_render_block_latest_post( $attributes ) {
	$posts = get_posts(
		array(
			'category'       => $attributes['selectedCategory'],
			'posts_per_page' => $attributes['numberPosts'],
		)
	);

	ob_start();
	foreach ( $posts as $post ) {
		echo '<h2>' . $post->post_title . '</h2>';
		echo get_the_post_thumbnail( $post->ID, 'medium' );
	}
	return ob_get_clean();
}
