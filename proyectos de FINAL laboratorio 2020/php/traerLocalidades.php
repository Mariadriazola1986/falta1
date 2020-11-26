<?php 
	
	require("conexion.php");

	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
	$idprovincias=$_POST["idprovincias"];
	if (isset($idprovincias)) {
		if (!empty($idprovincias)) {
			if (is_numeric($idprovincias)) {
				$conn=getConnection();
				$sql_listado_municipios="SELECT * FROM localidades WHERE provincia_id=:idprovincias ORDER by localidades.nombre";
				$resultados=$conn->prepare($sql_listado_municipios);
				$resultados->execute(array(":idprovincias"=>$idprovincias));
				$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
				closeConnection($conn);
				if ($registros) {
					$resultados_de_validacion['datos']=$registros;
				}
				else{
					$resultados_de_validacion['error']="No hay Localidades relacionadas con la provincia.";
				}	
			}
			else{
				$resultados_de_validacion['error']="el id de la provincia no es un numero";
			}
		}
		else{
				$resultados_de_validacion['error']="el id de la provincia esta vacio";
			}
	}
	else{
		$resultados_de_validacion['error']="el id de la provincia no esta definido";
	}

	
	echo json_encode($resultados_de_validacion);
	
 ?>