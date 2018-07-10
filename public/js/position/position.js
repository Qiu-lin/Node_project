function Position() {
  this.loadHeader();
  this.addListener();
}
$.extend( Position.prototype, {
  loadHeader: function () {
    //console.log("haha")
    new header();
    $( "#position-nav ul:first li:last" ).addClass( "active" ).siblings().removeClass( "active" );
  },
  addListener: function () {
    $( ".btn_add_pos" ).on( "click", this.handleAddPostion);
  },
  handleAddPostion: function () {
    var formData = new FormData( $( ".add_pos_form" ).get( 0 ) );
    $.ajax( {
      type: "post",
      url: "/api/positions/add",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function ( data ) {
        if ( data.res_code === 0 ) {
          $( "#addPosModal" ).modal( "hide" );
        }
        else {
          $( ".add_pos_error" ).removeClass( "hide" );
        }
      }
    } );

    /* $.post( "/api/positions/add", $( ".add_pos_form" ).serialize(), function ( data ) {
      if ( data.res_code === 0 ) {
        $( "#addPosModal" ).modal( "hide" );
      }
      else {
        $( ".add_pos_error" ).removeClass( "hide" );
      }
    },"json" ); */
   }
} );
new Position();