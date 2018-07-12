function Position() {
  this.loadHeader();
  this.listByPage( 1 );
  this.addListener();
}
$.extend( Position.prototype, {
  loadHeader: function () {
    //console.log("haha")
    new header();
    $( "#position-nav ul:first li:last" ).addClass( "active" ).siblings().removeClass( "active" );
  },
  addListener: function () {
    const $this = this;
    $( ".btn_add_pos" ).on( "click", this.handleAddPostion);
    $( ".pagination" ).on( "click", "li", function () {
      $( this ).addClass( "active" ).siblings().removeClass( "active" );
      const currentPage = $( this ).find( "a" ).text();
      $this.listByPage( currentPage );
    } );

    /* 修改职位信息 */
    $( "tbody" ).on( "click", ".modifyPos a", function () {
      let currPosId = $( this ).parent().siblings( ".currID" ).text();
      console.log( currPosId );
      $.get( "/api/positions/find", { id: currPosId }, function ( data ) {
        const list = { company, logo, experience, position, salary, site, type, _id } = data.res_body[ 0 ];
        console.log( list.logo );
        if (list.logo==undefined) {
          $( "#logoImg" ).hide();
        }
        $( "#logoImg" ).attr( "src", list.logo );
        $( "#modifyPosID" ).val( list._id );
        $( "#modifyPosName" ).val( list.position );
        $( "#modifyPosCompany" ).val( list.company );
        $( "#modifyPosExperience" ).val( list.experience );
        $( "#modifyPosType" ).val( list.type );
        $( "#modifyPosSite" ).val( list.site );
        $( "#modifyPosSalary" ).val( list.salary );
      }, "json" );
      $( ".btn_modify_pos" ).on( "click", function () {
        var formData = new FormData( $( ".modifyPosForm" ).get( 0 ) );
        $.ajax( {
          type: "post",
          url: "/api/positions/modify",
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
      } );
    } );

    /**
     * 删除职位记录
     */
    $( "tbody" ).on( "click", ".delete a", function () {
      let currPosId = $( this ).parent().siblings( ".currID" ).text();
      $.get( "/api/positions/delete", { id: currPosId }, function ( data ) {
        if (data.res_code===0) {
          const currentPage = $( ".pagination .active a" ).text();
          console.log(currentPage);

          $this.listByPage( currentPage );
        }
      }, "json" );
    } );

  },

  /**********************************/
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
  },
  listByPage: function ( currentPage ) {
    currentPage = currentPage || 1;
    $.get( "/api/positions/list", { pageIndex: currentPage }, function ( data ) {
      if ( data.res_code === 0 ) {
        const html = template( "position_list_temp", { list: data.res_body } );
        // console.log(res_body);
        $( ".pos_tab tbody" ).html( html );
      }
    }, "json" );
   }
} );
new Position();