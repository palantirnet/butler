/**
 * @file
 * A Javascript file that is run on every page load.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright (c) 2016 Palantir.net
 */

(function ($, Drupal) {
  Drupal.behaviors.script = {
      attach: function (context, settings) {
          (function ($) {
              // Insert your Javascript here
              
          })(jQuery);
      }
  };
})(jQuery, Drupal);
