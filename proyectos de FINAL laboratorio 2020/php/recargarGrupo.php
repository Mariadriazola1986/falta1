<?php
require_once("conexion.php");
session_start();
$conn = getConnection();
$sql= "SELECT grupos.ID_USUARIO_CREADOR, grupos.ID_GRUPO, grupos.NOMBRE, grupos.CANT_MIEMBROS, fotos.RUTA FROM grupos, fotos WHERE grupos.ID_FOTO=fotos.ID_FOTO and grupos.ID_GRUPO=:idgrupo";
$resultados=$conn->prepare($sql);
$resultados->execute(array(":idgrupo"=>$_SESSION["GRUPO_ACTUAL"]));
$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($registros);
closeConnection($conn);
?>