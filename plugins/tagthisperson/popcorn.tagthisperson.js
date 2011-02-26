// PLUGIN: tagthisperson

(function (Popcorn) {
  
  /**
   * tagthisperson popcorn plug-in 
   * Adds people's names to an element on the page.
   * Options parameter will need a start, end, target, image and person.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing 
   * Person is the name of the person who you want to tag
   * Image is the url to the image of the person - optional
   * Target is the id of the document element that the text needs to be 
   * attached to, this target element must exist on the DOM
   * 
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#video')
        .tagthisperson({
          start: 5, // seconds
          end: 15, // seconds
          person: '@annasob',
          image:  'http://newshour.s3.amazonaws.com/photos%2Fspeeches%2Fguests%2FRichardNSmith_thumbnail.jpg',
          href:   'http://annasob.wordpress.com',
          target: 'tagdiv'
        } )
   *
   */
  Popcorn.plugin( "tagthisperson" , ( function() {
    // keep track of qty and sequence of options' objects based on the options' target
    var count = 0;
    var targetObj = {};
    
    function addCount( target ) {
      targetObj[ target ] = ++count;
    }
    
    return {
      manifest: {
        about:{
          name: "Popcorn tagthisperson Plugin",
          version: "0.1",
          author: "@annasob",
          website: "annasob.wordpress.com"
        },
        options:{
          start    : {elem:'input', type:'text', label:'In'},
          end      : {elem:'input', type:'text', label:'Out'},
          target   : 'tag-container',
          person   : {elem:'input', type:'text', label:'Name'},
          image    : {elem:'input', type:'text', label:'Image Src'}
        }
      },
      _setup: function( options ) {
        addCount( options.target );
        var personInfo = "";

        // Make a div to put the information into
        options._container = document.createElement( 'div' );
        options._container.style.display = "none";
        options._container._count = {};
        
        // add all the information regarding URL, image and name of person in person variable
        personInfo = ( options.image ) ? " <img src='" + options.image + "'/> " : "" ;
        personInfo += ( options.href ) ? "<a href='" + options.href + "'target='_blank'>" + options.person + "</a>" : options.person ;
        
        options._container.innerHTML = personInfo;
        options._container._count[ options.target ] = targetObj[ options.target ];
        
        if ( document.getElementById( options.target ) ) {
          document.getElementById( options.target ).appendChild( options._container );
        }
      },
      /**
       * @member tagthisperson 
       * The start function will be executed when the currentTime 
       * of the video  reaches the start time provided by the 
       * options variable
       */
      start: function( event, options ){
        // Insert comma if this is not the last options object
        if ( options._container._count[ options.target ] != targetObj[ options.target ] ) {
          options._container.innerHTML += ", ";
        }
        options._container.style.display = "inline";
      },
      /**
       * @member tagthisperson 
       * The end function will be executed when the currentTime 
       * of the video  reaches the end time provided by the 
       * options variable
       */
      end: function(event, options){
        options._container.style.display = "none";
      }
   };
  })());

})( Popcorn );
