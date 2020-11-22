<?php
require_once("conexion.php");
session_start();

$conn = getConnection();

$sql= "SELECT grupos.ID_GRUPO, grupos.NOMBRE, grupos.CANT_MIEMBROS, fotos.RUTA from grupos, fotos, grupos_usuarios where grupos_usuarios.ID_USUARIO=:idusuario and grupos.ID_GRUPO=grupos_usuarios.ID_GRUPO and grupos.ID_FOTO=fotos.ID_FOTO";
$resultados=$conn->prepare($sql);

$resultados->execute(array(":idusuario"=>$_SESSION["ID_USUARIO"]));

$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
$registros_coincidentes=array();
foreach ($registros as $lala){
	array_push($registros_coincidentes, $lala);
}

echo json_encode($registros_coincidentes);

closeConnection($conn);

?>