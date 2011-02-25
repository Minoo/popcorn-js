test("Popcorn tagthisperson Plugin", function () {
  
  var popped = Popcorn( "#video" ),
      expects = 7, 
      count = 0,
      interval,
      interval2,
      interval3,
      tagdiv = document.getElementById( 'tagdiv' );
  
  expect(expects);
  
  function plus() {
    if ( ++count === expects ) {
      start();
    }
  }
  
  stop();
   
  ok ( 'tagthisperson' in popped, "tagthisperson is a method of the popped instance" );
  plus();
  
  equals ( tagdiv.innerHTML, "", "initially, there is nothing inside the tagdiv" );
  plus();
  
  popped.tagthisperson({
      start: 0, // seconds
      end: 5, // seconds
      person: 'Anna Sob',
      image: 'http://newshour.s3.amazonaws.com/photos%2Fspeeches%2Fguests%2FRichardNSmith_thumbnail.jpg',
      href: 'http://annasob.wordpress.com',      
      target: 'tagdiv'
    } )
    .tagthisperson({
      start: 3, // seconds
      end: 10, // seconds
      person: 'Scott',
      href: 'http://scottdowne.wordpress.com/',
      target: 'tagdiv'
    } )
    .volume(0)
    .play();
  
  
  interval = setInterval( function() {
    if( popped.currentTime() > 0 && popped.currentTime() <= 5 ) {
      equals ( tagdiv.childElementCount, 2, "tagdiv now contains two child elements" );
      plus();
      equals ( tagdiv.children[0].style.display , "inline", "tagdiv is visible on the page" ); 
      plus();
      clearInterval( interval );
    }
  }, 2000);
  
  interval2 = setInterval( function() {
    if( popped.currentTime() > 3 && popped.currentTime() < 5  ) {
      equals (tagdiv.children[1].style.display , "inline", "second tagdiv is visible on the page" );
      plus();
      clearInterval( interval2 );
    }
  }, 2000);
  
  interval3 = setInterval( function() {
    if( popped.currentTime() > 10 ) {
      equals ( tagdiv.children[1].style.display , "none", "second tagdiv is no longer visible on the page" );
      plus();
      equals ( tagdiv.children[0].style.display , "none", "first tagdiv is no longer visible on the page" );
      plus();
      clearInterval( interval3 );
    }
  }, 4000);
});
