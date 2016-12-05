# Writing JS with Butler for Drupal #

### Overview ###
Drupal prefers that scripts be [attached using behaviors](https://www.drupal.org/node/2269515) so that code runs both on normal page loads, when data is loaded by AJAX and in other instances when Drupal deems necessary for the behavior to be run.

Allowing scripts in the styleguide to be written as Drupal behaviors allows for the scripts to be symlinked to the Drupal `/themes` directory. The scripts, however, break when used in the styleguide.

As a result, a custom script (_drupal-attach-behaviors.js_) mimics the functionality from the Drupal JS API. It lives at `/source/code/libraries/drupal-attach-behaviors.js`. This allows us to write our scripts as Drupal behaviors and use them in the styleguide. With _drupal-attach-behaviors.js_ included in the `<head>` of your styleguide, the scripts work properly—both in Drupal and in the styleguide—with the scripts living in only one location.

### Setup ###
#### Styleguide ####
Including the _drupal-attach-behaviors.js_ script will need to be done before any custom scripts are declared in the appropriate HTML file in the styleguide (like default.html and styleguide.html). This is done by default in the styleguide:
```
<script type="text/javascript" src="/code/libraries/drupal-attach-behaviors.js"></script>
<script src="/code/js/alert.js"></script>
<script src="/code/js/cards.js"></script>
<script src="/code/js/filter.js"></script>
<script src="/code/js/etc.js"></script>
```

#### Drupal ####
No additional work is required for the scripts to work within Drupal. The appropriate files just need to be symbolically linked to your theme's root folder.

### Writing Javascript ###
Once _drupal-attach-behaviors.js_ is included, you're ready to write some Javascript. It's best to encapsulate the Javascript used on the site into separate pieces based on functionality. This way, only the necessary Javascript is loaded on a page.

By default, a `scripts.js` file has been added to the `js/` folder. It is loaded on every page in the styleguide and in Drupal. If you have site-wide scripts to write (perhaps opening/closing mobile navigation), this would be the place to include this code. Otherwise, if code is only being used on a single page or group of pages, creating a new Javascript file is preferred.

#### Creating a new, custom Javascript file ####
1. Create a new Javascript file in the `/source/code/js` directory.
2. Copy and paste the [Javascript file template](https://github.com/palantirnet/butler/blob/drupal-attach-behaviors/docs/JS_TEMPLATE.js) into your new file. (The template is located at /docs/JS_TEMPLATE.js)
3. Update the potions in curly brackets: the file description comment, the name of the behavior and the contents of the script you're writing. You many name your behavior anything you like; it just needs to be unique.
4. Include the Javascript file in the `<head>` of your HTML file **after** the `drupal-attach-behaviors.js` script.
5. If you need to create additional scripts, just repeat this process.
