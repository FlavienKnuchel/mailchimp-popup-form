//define server paths to call other files
var baseUrl = window.location.protocol + "//" + window.location.host;
var pluginUrl = baseUrl + '/src/';

// dynamically load css via js (to fix display as soon as possible)
var cssUrl = pluginUrl + '/css/style.css';
loadjscssfile(cssUrl, 'css');


/*
 This code can be used when the plugin is embedded in a page that already contains jquery
 But then you have to comment the code under this one
 var waitForLoad = function () {
 //makes the script until jquery is loaded
 if (typeof jQuery != "undefined") {
 jQuery.noConflict();
 mac_mailchimp();
 } else {
 window.setTimeout(waitForLoad, 200);
 }
 };
 //launches the waiting function
 window.setTimeout(waitForLoad, 200);
 */

//to comment if using the above code
mac_mailchimp();
// end to comment


function mac_mailchimp() {
//main function wil all the logic

  jQuery.noConflict();

  jQuery(function () {
    //DOM ready

    //button interaction
    jQuery('#subscribe_newsletter_button').on('click', function () {
      //at loading, the popup container has an inline display:none, so that we won't see
      //it appear quickly before the css is dynamically loaded
      //so we remove it on the first button click
      jQuery('#popup_container').attr('style', '');
      jQuery('#popup_container').addClass('displayed');
    });

    jQuery('#popup_mask').on('click', function () {
      jQuery('#popup_container').removeClass('displayed');
    });

    jQuery('#close_popup').on('click', function () {
      jQuery('#popup_container').removeClass('displayed');
      jQuery('#form_container').removeClass('hidden');
      jQuery('#register_success').removeClass('displayed');
      jQuery('#form').trigger('reset');
      validator.resetForm();
    });

    //gets jquery validation plugin and the adequate language
    jQuery.getScript(pluginUrl + './lib/jquery-validate/jquery.validate.js').done(function () {

      //set the adequate language
      var language = jQuery('html').attr('lang');
      var localize_var = '';
      switch (language) {
        case 'fr-fr':
          localize_var = 'fr';
          break;
        case 'de-de':
          localize_var = 'de';
          break;
        case 'it-it':
          localize_var = 'it';
          break;
        default:
          localize_var = 'fr';
          break;
      }

      //get the good language file
      jQuery.getScript(pluginUrl + './lib/jquery-validate/localization/messages_' + localize_var + '.min.js').done(function () {

        //form validation - jquery.validate
        var validator = jQuery("#form").validate({
          submitHandler: function (form) {

            //define the path to the mailchimp user adding script
            var script_url = 'add_user.php';

            //launch the script via ajax
            var request = jQuery.ajax({
              type: 'POST',
              url: script_url,
              data: jQuery('#form').serialize(),
              dataType: 'json'
            });

            //request was successful
            request.done(function (result) {

              if (result.status == 'subscribed') {
                //the subscription was successfull
                jQuery('#form_container').addClass('hidden');
                jQuery('#register_success').addClass('displayed');
              }
              else {
                //the subscription failed
                if(result.title="Member Exists"){
                  error_msg="";
                  switch(language){
                    case 'fr-fr':
                      error_msg="Cet email est déjà enregistré";
                      break;
                    case 'de-de':
                      error_msg="Dieser email ist schon registriert";
                      break;
                    case 'it-it':
                      error_msg="Questo e-mail è registrato già";
                      break;
                  }
                  alert(error_msg);
                  //or display it wherever you want
                }
                else{
                  error_msg="An error occured, please inform the administrator.";
                  alert(error_msg);
                  //or display it wherever you want
                }
              }
            });

            request.fail(function (jqXHR, result) {
              //the request to the php script failed
              alert('request failed, please contact the administrator');
            });

            //stops the form from submitting on click
            return false;
          },

          //defines the error class set on the parent of an invalid form input
          errorClass: 'has-error',
          //defines the error class set on the parent of a valid form input
          validClass: 'has-success',

          //enables the validation on keyup
          keyup: function (element) {
            return element.valid();
          },

          // validation rules
          rules: {
            email: {
              required: true
            },
            firstname: {
              required: true,
              minlength: 2
            },
            lastname: {
              required: true,
              minlength: 2
            }
          },

          //defines inside which kind of container will be inputted the error message
          errorPlacement: function (error, element) {
            error.insertAfter(element)
              .wrap('<div class="errorlabel"></div>');
          },

          //behaviour of the error highlight
          highlight: function (element, errorClass, validClass) {
            jQuery(element).parent().addClass(errorClass).removeClass(validClass);
            // bootstrap only behavior
            //jQuery('span.glyphicon', jQuery(element).parent()).remove();
            //jQuery(element).after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
          },

          // behaviour of the success highlight
          unhighlight: function (element, errorClass, validClass) {
            jQuery(element).parent().removeClass(errorClass).addClass(validClass);
            // bootstrap only behavior
            //jQuery('span.glyphicon', jQuery(element).parent()).remove();
            //jQuery(element).after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
          }
        });// end validator

      });// end getScript localization

    });// end getScript validate.js

  }); //end DOM ready
} //end function mac_mailchimp


function loadjscssfile(filename, filetype) {
  //load a css or js file
  if (filetype == "js") { //if filename is a external JavaScript file
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype == "css") { //if filename is an external CSS file
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}