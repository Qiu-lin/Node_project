function Position() {

}
$.extend( Position.prototype, {
  loadHeader: function () {
    //console.log("haha")
    new header();
    $( "#position-nav ul:first li:last" ).addClass( "active" ).siblings().removeClass( "active" );
  }
} );
new Position().loadHeader();