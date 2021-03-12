

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/src/SMTP.php';

// passing true in constructor enables exceptions in PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; // for detailed debug output
    // $mail->isSMTP();
    $mail->Host = 'localhost';
    $mail->SMTPAuth = true;
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 25;
    // $mail->Username = 'anuragpundir621@gmail.com'; // YOUR gmail email
    // $mail->Password = 'titmbiokbpntdyrg'; // YOUR gmail password

    $mail->Username = "lavnalocks@gmail.com";
    $mail->Password = "Temp@0030";

    // Sender and recipient settings
    // $mail->setFrom('anuragpundir621@gmail.com', 'Sender Name');
    // $mail->addAddress('ps1089124@gmail.com', 'Receiver Name');

    $mail->setFrom('lavnalocks@gmail.com', 'Lavna Locks');
    $mail->addAddress('ps1089124@gmail.com', 'Receiver Name');
  //  $mail->addReplyTo('anuragpundir621@gmail.com', 'Lavna Admin'); // to set the reply to

    // Setting the email content
    $mail->IsHTML(true);
    $mail->Subject = "Lavna Query";
    $name = $_POST['name'];
    $sendEmail = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $mail->Body = "Message =". $message ."<br/> Name = ". $name ." <br/> email = ". $sendEmail." <br/> phone = ". $phone."";
   // $mail->AltBody = 'Plain text message body for non-HTML email client. Gmail SMTP email body.';

    $mail->send();
    
    //$myObj->city = "New York";
   echo '<script>window.location.href = "success.html";</script>';
} catch (Exception $e) {
  echo '<script>window.location.href = "error.html";</script>';
}
?>
