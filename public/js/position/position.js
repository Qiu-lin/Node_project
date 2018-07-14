function Position() {
  this.loadHeader();
  this.addListener();
  this.check();
  this.listByPage();
}
$.extend( Position.prototype, {
  check: function () {
    $.get( "/api/users/check", ( data ) => {
      if ( data.res_code === -1 ) {
        $( ".noAccess" ).removeClass("hidden");
      }
      else {
        $( ".noAccess" ).hide();
        $( ".contBox" ).removeClass( "hidden" );
        this.listByPage( 1 );
      }
    },"json" )
  },
  loadHeader: function () {
    new header();
    $( "#position-nav ul:first li:last" ).addClass( "active" ).siblings().removeClass( "active" );
  },
  addListener: function () {
    const $this = this;

    //添加职位
    $( ".btn_add_pos" ).on( "click", this.handleAddPostion );

    //点击分页按钮
    $( ".pagination" ).on( "click", "li", function () {
      $( this ).addClass( "active" ).siblings().removeClass( "active" );
      const currentPage = $( this ).find( "a" ).text();
      $this.listByPage( currentPage );
    } );

    // 弹出模态框,将当前职位信息渲染进模态框
    $( "tbody" ).on( "click", ".modifyPos a", function () {
      let currPosId = $( this ).parent().siblings( ".currID" ).text();
      $.get( "/api/positions/find", { id: currPosId }, function ( data ) {
        const { company, logo, experience, position, salary, site, type, _id } = data.res_body[ 0 ];
        if (logo) {
          $( "#logoImg" ).removeClass("hidden");
        }
        $( "#logoImg" ).attr( "src", logo );
        $( "#modifyPosID" ).val( _id );
        $( "#modifyPosName" ).val( position );
        $( "#modifyPosCompany" ).val( company );
        $( "#modifyPosExperience" ).val( experience );
        $( "#modifyPosType" ).val( type );
        $( "#modifyPosSite" ).val( site );
        $( "#modifyPosSalary" ).val( salary );
      }, "json" );
    } );

    /* 修改职位信息 */
    $( ".btn_modify_pos" ).on( "click", function () {
      //获取form表单数据
      const formData = new FormData( $( ".modifyPosForm" ).get( 0 ) );
      //获取上传input file控件上传文件的大小
      const $logo = formData.get( "logo" ).size;
      //如果file 没有选择上传logo文件,则上传原来logo路径
      if ( !$logo ) {
        const $src = $( "#logoImg" ).attr( "src" );
        //向formData里添加新值
        formData.append( "oldLogo", $src );
      }
      $.ajax( {
        type: "post",
        url: "/api/positions/modify",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function ( data ) {
          if ( data.res_code === 0 ) {
            $( "#modifyModal" ).modal( "hide" );
            const currentPage = $( ".pagination .active a" ).text();
            $this.listByPage( currentPage );
          }
          else {
            $( ".modifyPosErr" ).removeClass( "hide" );
          }
        }
      } );
    } );
    /**
     * 删除职位记录
     */
    $( "tbody" ).on( "click", ".delete a", function () {
      let currPosId = $( this ).parent().siblings( ".currID" ).text();
      let currLogoPath = $( this ).parent().siblings( ).find("img").attr("src");
      console.log(currLogoPath);
      $.get( "/api/positions/delete", { id: currPosId,logo:currLogoPath }, function ( data ) {
        if (data.res_code===0) {
          const currentPage = $( ".pagination .active a" ).text();
          $this.listByPage( currentPage );
        }
      }, "json" );
    } );
  },

  /**********************************/
  listByPage: function ( currentPage ) {
    currentPage = currentPage || 1;
    $.get( "/api/positions/list", { pageIndex: currentPage }, function ( data ) {
      if ( data.res_code === 0 ) {
        const html = template( "position_list_temp", { list: data.res_body } );
        $( ".pos_tab tbody" ).html( html );
      }
    }, "json" );
   },
  handleAddPostion:function(){
    var formData = new FormData( $( ".add_pos_form" ).get( 0 ) );
    $.ajax( {
      type: "post",
      url: "/api/positions/add",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: ( data )=> {
        if ( data.res_code === 0 ) {
          $( "#addPosModal" ).modal( "hide" );
          const curPage = $( ".pagination .active a" ).text();
          $.get( "/api/positions/list", { pageIndex: curPage }, function ( data ) {
            if ( data.res_code === 0 ) {
              const html = template( "position_list_temp", { list: data.res_body } );
              $( ".pos_tab tbody" ).html( html );
            }
          }, "json" );
        }
        else {
          $( ".add_pos_error" ).removeClass( "hide" );
        }
      }
    } );
  }
} );
new Position();