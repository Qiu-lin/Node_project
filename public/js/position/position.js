function Position() {
  this.loadHeader();
  this.addListener();
  this.listByPage( 1 );
}
$.extend( Position.prototype, {
  loadHeader: function () {
    //console.log("haha")
    new header();
    $( "#position-nav ul:first li:last" ).addClass( "active" ).siblings().removeClass( "active" );
  },
  addListener: function () {
    $( ".btn_add_pos" ).on( "click", this.handleAddPostion);
    const $this = this;
    $( ".pagination" ).on( "click", "li", function () {
      const currentPage = $( this ).find( "a" ).text();
      $this.listByPage( currentPage );
     } );
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
  },
  listByPage: function ( currentPage ) {
    currentPage = currentPage || 1;
    $.get( "/api/positions/list", { pageIndex: currentPage }, function ( data ) {
      if ( data.res_code === 0 ) {
        const html = template( "position_list_temp", { list: data.res_body } );
        $( ".pos_tab tbody" ).html( html );
      }
    }, "json" );
   }
} );
new Position();