<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["id_cancha"]))
	{
		$conn = getConnection();
		$sql="SELECT imagenes.RUTA,provincias.nombre_provincias,localidades.nombre,establecimientos.BARRIO,establecimientos.DIRECCION,tipos_cancha.TIPO,establecimientos.TELEFONO,canchas.PRECIO FROM imagenes,establecimientos,canchas,tipos_cancha,provincias,localidades WHERE imagenes.ID_CANCHA=canchas.ID_CANCHA AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO AND tipos_cancha.ID_TIPO=canchas.TIPO AND localidades.id=establecimientos.LOCALIDAD AND localidades.provincia_id=provincias.id and canchas.ID_CANCHA=:idcancha";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idcancha" => $_POST["id_cancha"] ));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		if ($registros) {
				$resultados_de_validacion['datos']=$registros;
			}
		else{
			$resultados_de_validacion['error']="No se pudo traer los datos de la cancha.";
		}	

	}
	else{
		$resultados_de_validacion['error']="El id de la cancha no esta definido.";
	}
		
		
	
	echo json_encode($resultados_de_validacion);


 ?>