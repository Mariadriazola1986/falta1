<?php
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

	$conn = getConnection();
	$sql="SELECT canchas.ID_CANCHA,establecimientos.DISTRITO,establecimientos.DIRECCION FROM canchas,tipos_de_futbol,establecimientos WHERE canchas.ESTADO_CANCHA=1 AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO ORDER by establecimientos.DISTRITO";
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