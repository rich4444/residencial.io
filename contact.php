<?php


if($_POST["email"]) {


mail("rich4shioo@gmail.com", "Here is the subject line",


$_POST["email"]. "From: an@email.address");


}


?>