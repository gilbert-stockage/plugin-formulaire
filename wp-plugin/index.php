<?php
 /*
 * Plugin Name: Formulaire Gilbert
 * Author: @guillaumeduhan
 * Version: 1.0.0
 * 
*/

  add_shortcode('gilbert-form', 'pluginFunction');

  wp_enqueue_script('vue', 'https://unpkg.com/vue');
  wp_enqueue_script('google-analytics', plugin_dir_url(__FILE__) . 'ga.js');
  wp_enqueue_script('FormPlugin', plugin_dir_url(__FILE__) . 'plugins/Form.js');
  wp_enqueue_script('app', plugin_dir_url(__FILE__) . 'app.js');
  wp_enqueue_script('gilbert-form', plugin_dir_url(__FILE__) . 'dist/gilbert-plugin.js');

  function pluginFunction() {
    echo "<div id='instanceForm'></div>";
  };

?>