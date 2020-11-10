<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["idusuario"]))
	{

		$conn = getConnection();
		$sql="SELECT * FROM establecimientos WHERE establecimientos.ID_USUARIO=:id_usuario";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $_POST["idusuario"]));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
		if($registros) {//si encuentra que tiene algun establecimiento registrado le mostrara un menu
			$resultados_de_validacion['error']="NO";
			$resultados_de_validacion['datos']="ok";
		}
		else{//si no, les mostrará  un formulario para que registre su primer establecimiento.
			$resultados_de_validacion['error']="NO";
			$resultados_de_validacion['datos']="fail";
		}
	}
	else{
		$resultados_de_validacion['error']="El id del usuario no esta definido.";
	}
	echo json_encode($resultados_de_validacion);


 ?>