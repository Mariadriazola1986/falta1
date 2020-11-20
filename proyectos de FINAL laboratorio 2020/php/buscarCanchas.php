<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

	if(isset($_POST["distrito"]) && isset($_POST["direccion"]) && isset($_POST["selecttipocancha"]))
	{
		$conn = getConnection();
		$sql="SELECT canchas.ID_CANCHA,tipos_de_futbol.TIPO,establecimientos.DISTRITO,establecimientos.DIRECCION FROM canchas,tipos_de_futbol,establecimientos WHERE canchas.TIPO=:tipocancha AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":tipocancha" => $_POST["selecttipocancha"] ));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		if ($registros) {
				$resultados_de_validacion['datos']=$registros;
			}
		else{
			$resultados_de_validacion['error']="No se encontro nigun resultado para el filtro aplicado";
		}

	}
	else{
		$resultados_de_validacion['error']="Algunos de los campos no estan definidos.";
	}



	echo json_encode($resultados_de_validacion);


 ?>