<!-- popup containing the mailchimp subscribing form -->
<div id="popup_container" style="display: none">
  <div id="popup_content">

<div id="form_container">
  <div class="row">
    <h1 class="col-md-12">Mailchimp API form</h1>
  </div>

  <div class="row">
    <form class="col-md-12" id="form" action="add_user.php" method="post">
      <div class="form-group has-feedback">
        <label for="email" class="control-label">E-mail</label>
        <input type="email" id="email" name="email" class="form-control" placeholder="Your email"/>
      </div>
      <div class="form-group has-feedback">
        <label for="firstname" class="control-label">First name</label>
        <input type="text" id="firstname" name="firstname" class="form-control" placeholder="Your first name"/>
      </div>
      <div class="form-group has-feedback">
        <label for="lastname" class="control-label">Last name</label>
        <input type="text" id="lastname" name="lastname" class="form-control" placeholder="Your last name"/>
      </div>
      <div class="form-group has-feedback">
        <label for="company" class="control-label">Company</label>
        <input type="text" id="company" name="company" class="form-control" placeholder="Your company"/>
      </div>
      <div class="form-group">
        <input type="submit" id="submit" Value="Register" class="btn btn-lg btn-success col-md-12"/>
      </div>
    </form>
  </div>
</div>

<div class="row">
  <div id="register_success" class="col-md-12">
    <h1>Thank you for subscribing!</h1>
    <a href="javascript:void(0)" style="margin-top: 10px" class="btn btn-lg btn-success col-md-12" id="close_popup">Close</a>
  </div>
</div>

  </div>
  <div id="popup_mask"></div>

</div>