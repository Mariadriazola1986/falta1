<?php
require_once("conexion.php");
session_start();

$conn = getConnection();

$sql= "SELECT g.NOMBRE, f.RUTA, g.ID_GRUPO FROM solicitudes s, fotos f, grupos g, grupos_solicitudes gs WHERE s.ID_USUARIO=:idusuario AND s.ESTADO_SOLICITUD=4 and s.ID_SOLICITUD=gs.ID_SOLICITUD AND gs.ID_GRUPO=g.ID_GRUPO AND s.ID_TIPO_S=1 AND f.ID_FOTO=g.ID_FOTO";
$resultados=$conn->prepare($sql);

$resultados->execute(array(":idusuario"=>$_SESSION["ID_USUARIO"]));

$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($registros);

closeConnection($conn);
?>