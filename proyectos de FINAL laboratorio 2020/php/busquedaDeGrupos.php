<?php
require_once("conexion.php");

$conn = getConnection();

$sql= "SELECT grupos.ID_GRUPO, grupos.NOMBRE, grupos.CANT_MIEMBROS, fotos.RUTA FROM grupos, fotos WHERE grupos.ID_FOTO=fotos.ID_FOTO";
$resultados=$conn->prepare($sql);

$resultados->execute();

$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
$registros_coincidentes=array();
foreach ($registros as $lala){
	array_push($registros_coincidentes, $lala);
}

echo json_encode($registros_coincidentes);

closeConnection($conn);

?>