<?php
require_once("conexion.php");
session_start();

$conn = getConnection();
$sqljugadores= "SELECT usuarios.ID_USUARIO, usuarios.NOMBRE FROM `grupos_usuarios`, usuarios WHERE grupos_usuarios.ID_GRUPO=:idgrupousuario AND grupos_usuarios.ID_USUARIO=usuarios.ID_USUARIO";
$listajugadores=$conn->prepare($sqljugadores);
$listajugadores->execute(array(":idgrupousuario"=>$_SESSION["GRUPO_ACTUAL"]));
$jugadores=$listajugadores->fetchAll(PDO::FETCH_ASSOC);
			

echo json_encode($jugadores);
closeConnection($conn);

?>