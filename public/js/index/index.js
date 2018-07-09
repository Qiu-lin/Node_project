function Index() {

}
$.extend( Index.prototype, {
  loadHeader: function () {
    new header();
  }
} );
new Index().loadHeader();