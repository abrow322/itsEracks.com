<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );
$name = $_POST['contact_name'];
$email = $_POST['contact_email'];
$subject = $_POST['contact_subject'];
$message = $_POST['contact_message'];

$mailto = "abrown52516@gmail.com";
$headers = "From: ".$email;
$txt = "Name: ".$name."\n\n".$message;
mail($mailto, $subject, $txt, $headers);
header("Location: contact.html?mailsent")
?>


