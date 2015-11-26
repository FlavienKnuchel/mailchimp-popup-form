<?php
/**
 * Created by PhpStorm.
 * User: fku
 * Date: 25/11/15
 * Time: 10:18
 */

//include the mailchimp-api library
//(PHP simple wrapper for Mailchim API V3.0)
include('./lib/mailchimp-api/MailChimp.php');
use \DrewM\MailChimp\MailChimp;

//here we must test that all the required fields are set
if(isset($_POST['firstname']) AND isset($_POST['lastname']) AND isset($_POST['email'])){

  //recovers all the infos given by $_POST for the required fields
  $first_name = $_POST['firstname'];
  $last_name = $_POST['lastname'];
  $email = $_POST['email'];

  //test optional fields
  $company = '';
  if (isset($_POST['company'])){
    $company = $_POST['company'];
  }

  //set API key and list informations
  $api_key = '17d371f218bb2dcf316a4fa79ed37d63-us11';
  $list_id = '944a17d6e5';


  //send API request
  $MailChimp = new MailChimp($api_key);
  $result = $MailChimp->post('lists/' . $list_id . '/members', array(
    'email_address' => $email,
    'status' => 'subscribed',
    'merge_fields' => array('FNAME' => $first_name, 'LNAME' => $last_name, 'CMPANY' => $company)
  ));

  //displays the result of the API request, encoded in JSON
  header('Content-Type: application/json');
  echo json_encode($result);
}
else{
  //displays error, encoded in JSON
  header('Content-Type: application/json');
  $error=array(
    type => 'error',
    title => 'invalid input',
    status => '400',
    detail => 'The informations provided to the script are not complete'
  );
  echo json_encode($error);
}

?>