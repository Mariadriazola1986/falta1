<?php
session_start();

require("conexion.php");

$conn = getConnection();

$sql="SELECT canchas.ID_CANCHA,tipos_de_futbol.TIPO,provincias.nombre_provincias,localidades.nombre,establecimientos.BARRIO,establecimientos.DIRECCION FROM canchas,tipos_de_futbol,establecimientos,provincias,localidades WHERE canchas.ID_ESTABLECIMIENTO = establecimientos.ID_ESTABLECIMIENTO AND canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.LOCALIDAD=localidades.id AND localidades.provincia_id=provincias.id AND canchas.ESTADO_CANCHA=0";

$resultados=$conn->prepare($sql);

$resultados->execute();

$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($registros);



?>