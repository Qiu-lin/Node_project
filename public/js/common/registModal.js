function registModal() {
  this.creatDom();
  this.addListener();
}

registModal.template = `<div class="modal fade" tabindex="-1" role="dialog" id="regModal">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
      <h4 class="modal-title">用户注册</h4>
    </div>
    <div class="modal-body">
    <div class="alert alert-danger hide reg_error" role="alert">用户注册失败，请稍后重试...</div>
      <form class="register_form">
        <div class="form-group">
          <label for="regUsername">用户名</label>
          <input type="text" class="form-control" name="username"  id="regUsername" placeholder="输入用户名">
        </div>
        <div class="form-group">
          <label for="regPassword">密码</label>
          <input type="password" class="form-control" name="password"  id="regPassword" placeholder="输入密码">
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input type="password" class="form-control"  id="confirmPassword" placeholder="再次输入密码">
        </div>
        <div class="form-group">
          <label for="regEmail">邮箱</label>
          <input type="email" class="form-control" name="email" id="regEmail" placeholder="输入邮箱">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      <button type="button" class="btn btn-primary btn_register">注册</button>
    </div>
  </div>
</div>
</div>`;

$.extend( registModal.prototype, {
  creatDom: function () {
    $( registModal.template ).appendTo( "body" );
  },
  addListener:function(){
    $( ".btn_register" ).on( "click",$.proxy( this.handleRegister, this ));
  },
  handleRegister:function(){
    $.post( "/api/users/register", $( ".register_form" ).serialize(), function ( data ) {
      if(data.res_code===0){
        $("#regModal").modal("hide");
      }
      else {
        $(".reg_error").removeClass("hide");
      }
    },"json");
  }
} );

