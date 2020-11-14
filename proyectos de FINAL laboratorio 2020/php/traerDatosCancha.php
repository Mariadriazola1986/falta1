<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["id_cancha"]))
	{
		$conn = getConnection();
		$sql="SELECT imagenes.RUTA,establecimientos.DISTRITO,establecimientos.DIRECCION,tipos_cancha.TIPO,establecimientos.TELEFONO,canchas.PRECIO FROM imagenes,establecimientos,canchas,tipos_cancha WHERE imagenes.ID_CANCHA=canchas.ID_CANCHA AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO AND tipos_cancha.ID_TIPO=canchas.TIPO and canchas.ID_CANCHA=:idcancha";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idcancha" => $_POST["id_cancha"] ));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		if ($registros) {
				$resultados_de_validacion['datos']=$registros;
			}
		else{
			$resultados_de_validacion['error']="El usuario no tiene establecimientos cargados.";
		}	

	}
	else{
		$resultados_de_validacion['error']="El id de usario no esta definido.";
	}
		
		
	
	echo json_encode($resultados_de_validacion);


 ?>