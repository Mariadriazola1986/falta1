<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

	if(isset($_POST["distrito"]) && isset($_POST["direccion"]) && isset($_POST["selecttipocancha"]) && isset($_POST["idusuario"]))
	{
		$conn = getConnection();
		$where="";
		if (empty($_POST["distrito"]) && empty($_POST["direccion"])) {//si solo esta seleccionada el tipo de futbol como filtro

			$where="WHERE establecimientos.ID_USUARIO=".$_POST["idusuario"]." AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND canchas.TIPO=".$_POST["selecttipocancha"]."";
		}
		else if (empty($_POST["selecttipocancha"]) && empty($_POST["direccion"])) {//si solo esta seleccionada el distrito
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.DISTRITO LIKE '".$_POST['distrito']."%'";
		}
		else if (empty($_POST["selecttipocancha"]) && empty($_POST["distrito"])) {//si solo esta seleccionada la direccion
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.DIRECCION LIKE '".$_POST['direccion']."%'";
		}

		//----------------------------------------------------------------------------------------

		else if (empty($_POST["selecttipocancha"])){//si el tipo de futbol NO esta seleccionada
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.DIRECCION LIKE '".$_POST['direccion']."%' AND establecimientos.DISTRITO LIKE '".$_POST['distrito']."%'";
		}
		else if (empty($_POST["distrito"])){//si el distrito  NO esta seleccionado
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.DIRECCION LIKE '".$_POST['direccion']."%' AND canchas.TIPO=".$_POST["selecttipocancha"]."";
		}
		else if (empty($_POST["direccion"])){//si la direccion  NO esta seleccionada
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND canchas.TIPO=".$_POST["selecttipocancha"]." AND establecimientos.DISTRITO LIKE '".$_POST['distrito']."%'";
		}
		
		else if (!empty($_POST["direccion"]) && !empty($_POST["distrito"]) && !empty($_POST["selecttipocancha"]) ){//si todos estan seleccionados
			$where="WHERE establecimientos.ID_USUARIO= ".$_POST["idusuario"]."  AND canchas.ID_ESTABLECIMIENTO=establecimientos.ID_ESTABLECIMIENTO and canchas.TIPO=tipos_de_futbol.ID_TIPO AND canchas.TIPO=".$_POST["selecttipocancha"]." AND establecimientos.DISTRITO LIKE '".$_POST['distrito']."%' AND establecimientos.DIRECCION LIKE '".$_POST['direccion']."%'";
		}

		$sql="SELECT canchas.ID_CANCHA,tipos_de_futbol.TIPO,establecimientos.DISTRITO,establecimientos.DIRECCION FROM canchas,tipos_de_futbol,establecimientos $where";
		$resultados=$conn->prepare($sql);
		$resultados->execute();
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