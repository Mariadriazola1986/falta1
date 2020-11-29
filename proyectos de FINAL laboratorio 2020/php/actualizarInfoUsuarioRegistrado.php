<?php

require_once("conexion.php");

$conn = getConnection();

$sql="UPDATE usuarios SET usuarios.NOMBRE=:newnombre, usuarios.EMAIL=:newmail WHERE usuarios.ID_USUARIO=:usuario";

$resultadonombre=$conn->prepare($sql);

$resultadonombre->execute(array(":newnombre"=>$_POST["usuario"],":newmail"=>$_POST["email"],":usuario"=>$_POST["id"]));

closeConnection($conn);


?>