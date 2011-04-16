test("Popcorn tagthisperson Plugin", function () {
  
  var popped = Popcorn( "#video" ),
      expects = 7, 
      count = 0,
      tagdiv = document.getElementById( 'tagdiv' );
      tagdiv2 = document.getElementById( 'tagdiv2' );
  
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
    })
    .tagthisperson({
      start: 3, // seconds
      end: 10, // seconds
      person: 'Scott',
      href: 'http://scottdowne.wordpress.com/',
      target: 'tagdiv'
    })
    .tagthisperson({
      start: 6, // seconds
      end: 10, // seconds
      person: 'Mike',
      target: 'tagdiv2'
    })    
    .tagthisperson({
      start: 7, // seconds
      end: 12, // seconds
      person: 'Daniel',
      target: 'tagdiv2'
    });
    
  popped.exec( 4, function() {
      equals ( tagdiv.childElementCount, 3, "tagdiv now contains two person tags and an image element" );
      plus();
  });
  
  popped.exec( 7, function() {
      equals ( tagdiv.innerHTML.search( "<a href" ) , 1 ,"second tag in tagdiv has a url" );
      plus();
      equals ( tagdiv2.textContent.trim(), "Mike, Daniel" ,"tagdiv2 shows the first & second tag" );
      plus();
  });
  
  popped.exec( 13, function() {
      equals ( tagdiv.innerHTML , "" ,"tagdiv is now cleared" );
      plus();
      equals ( tagdiv2.innerHTML , "" ,"tagdiv2 is now cleared" );
      plus();
  });
  popped.volume(0).play();

});
