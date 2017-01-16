/**
 * @file
 * {{ A brief description of what this Javascript does. }}
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright (c) 2016 Palantir.net
 */
(function ($, Drupal) {
  Drupal.behaviors.{{ some unique name }} = {
      attach: function (context, settings) {
          (function ($) {
              {{ script here }}
          })(jQuery);
      }
  };
})(jQuery, Drupal);
