<?php
require_once("conexion.php");
session_start();

$conn = getConnection();

$sql="SELECT s.ID_USUARIO FROM grupos_solicitudes g, solicitudes s WHERE s.ESTADO_SOLICITUD=4 AND g.ID_GRUPO=:idgrupoactual AND s.ID_SOLICITUD=g.ID_SOLICITUD";

$resultado=$conn->prepare($sql);

$resultado->execute(array(":idgrupoactual"=>$_SESSION["GRUPO_ACTUAL"]));


$jugadores=$resultado->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($jugadores);
closeConnection($conn);

?>