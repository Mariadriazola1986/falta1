<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

	if(isset($_POST["idusuario"]))
	{
		$conn = getConnection();
		$sql="SELECT canchas.ID_CANCHA,tipos_de_futbol.TIPO,provincias.nombre_provincias,localidades.nombre,establecimientos.BARRIO,establecimientos.DIRECCION, localidades.nombre FROM canchas,tipos_de_futbol,establecimientos,provincias,localidades WHERE canchas.ID_ESTABLECIMIENTO = establecimientos.ID_ESTABLECIMIENTO AND canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.LOCALIDAD=localidades.id AND localidades.provincia_id=provincias.id AND establecimientos.ID_USUARIO=:idusuario";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idusuario"=>$_POST["idusuario"]));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		if ($registros) {
				$resultados_de_validacion['datos']=$registros;
			}
		else{
			$resultados_de_validacion['error']="No tenes ninguna cancha cargada todavia.";
		}

	}
	else{
		$resultados_de_validacion['error']="El id de usuario no esta definido.";
	}



	echo json_encode($resultados_de_validacion);


 ?>