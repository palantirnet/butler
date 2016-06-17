casper.
  // @todo add the github repo here to create url to ghpages website
start( 'http://localhost:8000' ).
then(function(){
  phantomcss.screenshot('#hplogo', 'google');
});

casper.run();