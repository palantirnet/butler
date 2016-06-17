//
// The test scenario
//

var url = 'http://localhost:8000/'; // @todo replace with real URL

casper.
start(url).
// screenshot the initial page load
then(function() {
  phantomcss.screenshot('<SELECTOR_TO_SCREENSHOT>', '<LABEL_SCREENSHOT>');
}).
then(function() {
  // do something
}).
// second screenshot
then(function() {
  phantomcss.screenshot('<SELECTOR_TO_SCREENSHOT>', '<LABEL_SCREENSHOT>');
});

//
// End tests and compare screenshots
//

casper.
then(function now_check_the_screenshots() {
  phantomcss.compareAll();
}).
run(function end_it() {
  console.log('\nTHE END.');
  phantom.exit(phantomcss.getExitStatus());
});