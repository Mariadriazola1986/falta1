<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["id_usuario"]))
	{
		$conn = getConnection();
		$sql="select * from partidos as P, tipos_de_futbol as T where P.ID_PARTIDO in (select Pa.ID_PARTIDO from partidos as Pa where exists (select * from usuarios_juegan_partidos as Us where Pa.ID_PARTIDO = Us.ID_PARTIDO and Us.ID_USUARIO =:id_usuario)) AND P.TIPO_DE_FUTBOL = T.ID_TIPO AND P.FECHA = CURDATE() AND P.CANTIDAD_DE_JUGADORES_ACTUALES=T.JUGADORES_MINIMOS_REQUERIDOS ORDER BY P.HORA ASC";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $_POST["id_usuario"] ));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		if ($registros) {
				$resultados_de_validacion['datos']=$registros;
			}
		else{
			$resultados_de_validacion['error']="No jugas en ningun partido hoy.";
		}	

	}
	else{
		$resultados_de_validacion['error']="El id de usario no esta definido.";
	}
		
		
	
	echo json_encode($resultados_de_validacion);


 ?>