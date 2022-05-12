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
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-components',
			'wp-plugins',
			'wp-edit-post',
		),
		true
	);

	wp_register_style(
		'my-first-dynamic-gutenberg-block-script-css',
		plugins_url( '/build/style-index.css', __FILE__ ),
	);

	register_block_type(
		'my-first-dynamic-gutenberg-block/latest-post',
		array(
			'attributes'      => array(
				'numberPosts'       => array(
					'type' => 'string',
				),
				'numberColumns'     => array(
					'type' => 'string',
				),
				'selectedCategory'  => array(
					'type' => 'string',
				),
				'showPostThumbnail' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showExcerpt'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'categories'        => array(
					'type' => 'object',
				),
			),
			'render_callback' => 'my_plugin_render_block_latest_post',
			'editor_script'   => 'my-first-dynamic-gutenberg-block-script',
			'style'           => 'my-first-dynamic-gutenberg-block-script-css',
		)
	);

}
add_action( 'init', 'register_dynamic_block_action' );

/**
 * Renders the block content
 */
function my_plugin_render_block_latest_post( $attributes ) {
	$args = array(
		'cat'            => isset( $attributes['selectedCategory'] ) ? $attributes['selectedCategory'] : '',
		'posts_per_page' => isset( $attributes['numberPosts'] ) ? $attributes['numberPosts'] : '1',
	);

	$posts = new WP_Query( $args );

	ob_start();
	if ( $posts->have_posts() ) {
		?>
		 <div class="latest-posts-block has-<?php echo isset( $attributes['numberColumns'] ) ? esc_attr( $attributes['numberColumns'] ) : '3'; ?>-columns">
			<?php
			while ( $posts->have_posts() ) {
				$posts->the_post();
				?>
			<div>
			<h4><?php echo esc_html( get_the_title() ); ?></h4>
				<?php
				if ( $attributes['showPostThumbnail'] ) {
					echo get_the_post_thumbnail( '', 'medium' );
				}
				if ( $attributes['showExcerpt'] ) {
					echo esc_html( the_excerpt() );
				}
				?>
			</div>
				<?php
			}
			?>
		</div>
		<?php
	} else {
		echo 'No Posts Found';
	}
	wp_reset_postdata();
	return ob_get_clean();
}
