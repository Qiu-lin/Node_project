function loginModal() {
    this.creatDom();
}

loginModal.template = `<div class="modal fade" tabindex="-1" role="dialog" id="loginModal">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
      <h4 class="modal-title">用户登录</h4>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <label for="loginUsername">用户名</label>
          <input type="text" class="form-control" id="loginUsername" placeholder="用户名">
        </div>
        <div class="form-group">
          <label for="loginPassword">密码</label>
          <input type="password" class="form-control" id="loginPassword" placeholder="密码">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary">登录</button>
    </div>
  </div>
</div>
</div>`;

$.extend( loginModal.prototype, {
  creatDom: function () {
    $( loginModal.template ).appendTo( "body" );
  }
} );