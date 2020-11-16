<?php
require_once("conexion.php");

$conn = getConnection();

$sql= "select grupos.ID_GRUPO, grupos.NOMBRE, grupos.CANT_MIEMBROS, fotos.RUTA FROM grupos, fotos WHERE grupos.ID_GRUPO=:idgrupo and grupos.ID_FOTO=fotos.ID_FOTO";
$resultados=$conn->prepare($sql);

$resultados->execute(array(":idgrupo"=>$_POST["sape"]));

$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($registros);

closeConnection($conn);


?>