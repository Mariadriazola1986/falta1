<?php
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["id_partido"]) && isset($_POST["id_grupo"]))
	{
		$conn = getConnection();
		$sql="INSERT INTO invitacion_a_partido_a_grupo (ID_PARTIDO, ID_GRUPO) VALUES (:idpartido,:idgrupo)";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idpartido" => $_POST["id_partido"],":idgrupo"=>$_POST["id_grupo"]));
		if ($resultados->rowCount()>0) {
				$resultados_de_validacion['error']="NO";
			}
		else{
			$resultados_de_validacion['error']="No se pudo guardar los datos intenta nuevamente.";
		}	

	}
	else{
		$resultados_de_validacion['error']="El id del partido o el id del grupo no esta definido.";
	}
		
		
	
	echo json_encode($resultados_de_validacion);


 ?>