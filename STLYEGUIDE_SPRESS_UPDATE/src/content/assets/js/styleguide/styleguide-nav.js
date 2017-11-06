/**
 * @file
 * A JavaScript file for rail items.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.styleguideNavTrigger = {
    attach: function (context, settings) {
      // Styleguide Navigation Open and Close functionality
      // Main navigation mobile open/close
      $('.sg-trigger').click(function (event) {
        $(this).toggleClass('is-active');
        $(this).blur();
        event.preventDefault();
        $(this).siblings('.sg-nav').toggleClass('is-active');
      });
      // Secondary navigation Mobile open/close
      $('.sg-secondary-nav-trigger').click(function (event) {
        $(this).toggleClass('is-active');
        $(this).blur();
        event.preventDefault();
        $(this).siblings('.sg-secondary-nav').toggleClass('is-active');
      });
      // Secondary navigation mobile sub drawer open/close
      $('.sg-secondary-nav__section').click(function (event) {
        $(this).toggleClass('is-active');
        $(this).blur();
        event.preventDefault();
        $(this).siblings('.sg-secondary-subnav').toggleClass('is-active');
        $(this).parents().siblings().children('.sg-secondary-subnav').removeClass('is-active');
        $(this).parents().siblings().children('.sg-secondary-nav__section').removeClass('is-active');
      });

      // Dev Notes Drawer
      $('.sg-dev-drawer-trigger').click(function (event) {
        $(this).toggleClass('is-active');
        $(this).blur();
        event.preventDefault();
        $(this).parents('.sg-dev-drawer-trigger-wrapper').siblings('.sg-dev-drawer').toggleClass('is-active');
      });

    }
  };

})(jQuery, Drupal);
