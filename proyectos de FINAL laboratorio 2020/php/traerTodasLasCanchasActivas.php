<?php
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

	$conn = getConnection();
	$sql="SELECT canchas.ID_CANCHA,localidades.nombre,establecimientos.BARRIO,establecimientos.DIRECCION, localidades.nombre,tipos_de_futbol.TIPO FROM canchas,tipos_de_futbol,establecimientos,provincias,localidades WHERE canchas.ID_ESTABLECIMIENTO = establecimientos.ID_ESTABLECIMIENTO AND canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.LOCALIDAD=localidades.id AND localidades.provincia_id=provincias.id AND canchas.ESTADO_CANCHA=1";
	$resultados=$conn->prepare($sql);
	$resultados->execute();
	$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
	if ($registros) {
		$resultados_de_validacion['datos']=$registros;
	}
	else{
		$resultados_de_validacion['error']="No hay Cancha disponible que mostrar";
	}
	echo json_encode($resultados_de_validacion);


 ?>