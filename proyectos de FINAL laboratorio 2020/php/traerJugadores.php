<?php
require_once("conexion.php");
session_start();

$conn = getConnection();
$sqljugadores= "SELECT usuarios.ID_USUARIO, usuarios.NOMBRE from usuarios where ID_USUARIO not in (select ID_USUARIO from grupos_usuarios WHERE grupos_usuarios.ID_GRUPO=:idgrupousuario) AND usuarios.TIPO_USUARIO=1";
$listajugadores=$conn->prepare($sqljugadores);
$listajugadores->execute(array(":idgrupousuario"=>$_SESSION["GRUPO_ACTUAL"]));
$jugadores=$listajugadores->fetchAll(PDO::FETCH_ASSOC);
			

echo json_encode($jugadores);
closeConnection($conn);

?>