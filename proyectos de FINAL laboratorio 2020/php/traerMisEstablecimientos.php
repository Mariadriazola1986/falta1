<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["id_usuario"]))
	{
		$conn = getConnection();
		$sql="SELECT * FROM establecimientos WHERE establecimientos.ID_USUARIO=:id_usuario";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $_POST["id_usuario"] ));
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