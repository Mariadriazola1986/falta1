<?php
	require("conexion.php");
	session_start();//IMPORTANTE SI QUERES Q TOME EL VALOR DEL QUE ESTA EN SESION
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_SESSION["ID_USUARIO"]))
	{
		global $resultados_de_validacion;
		$conn = getConnection();
		$sql="SELECT invitacion_a_partido_a_grupo.ID_GRUPO,partidos.ID_PARTIDO,grupos.ID_GRUPO,grupos_usuarios.ID_USUARIO FROM invitacion_a_partido_a_grupo LEFT JOIN partidos ON invitacion_a_partido_a_grupo.ID_PARTIDO = partidos.ID_PARTIDO LEFT JOIN grupos ON invitacion_a_partido_a_grupo.ID_GRUPO = grupos.ID_GRUPO LEFT JOIN grupos_usuarios ON grupos_usuarios.ID_GRUPO = grupos.ID_GRUPO WHERE grupos_usuarios.ID_USUARIO=:idusuario";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idusuario" => $_SESSION["ID_USUARIO"]));
		if ($resultados->rowCount()>0) {
				closeConnection($conn);
				$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
				//traer la info de los partidos
				$conn = getConnection();
				$registros_coincidentes=array();
				foreach ($registros as $datospartido) {
					$sql2="select * from partidos as P, tipos_de_futbol as T 
			where P.ID_PARTIDO in (select Pa.ID_PARTIDO from partidos as Pa where not exists 
			(select * from usuarios_juegan_partidos as Us where Pa.ID_PARTIDO = Us.ID_PARTIDO and Us.ID_USUARIO = :id_usuario)) 
			AND P.TIPO_DE_FUTBOL = T.ID_TIPO AND P.CANTIDAD_DE_JUGADORES_ACTUALES < T.JUGADORES_MINIMOS_REQUERIDOS AND P.FECHA >= CURDATE() AND P.ID_USUARIO!=:id_usuario AND P.ID_PARTIDO=:idpartido ORDER  BY P.FECHA ASC";

					$resultados2=$conn->prepare($sql2);
					$resultados2->execute(array(":id_usuario" => $_SESSION["ID_USUARIO"],":idpartido"=>$datospartido["ID_PARTIDO"] ));
					$registros2=$resultados2->fetchAll(PDO::FETCH_ASSOC);
					closeConnection($conn);
					$hora_actual = new DateTime("now", new DateTimeZone('America/Argentina/Buenos_Aires'));

					$hora_now=$hora_actual->format('H:i:s');
					$Hoy = new DateTime("now", new DateTimeZone('America/Argentina/Buenos_Aires'));
					
					foreach ($registros2 as $hora_del_partido) {
						if ($hora_del_partido["FECHA"]==$Hoy->format('Y-m-d')) {

							if ($hora_del_partido["HORA"]>$hora_now) {

								array_push($registros_coincidentes, $hora_del_partido);
							}
						}
						else if ($hora_del_partido["FECHA"]>$Hoy->format('Y-m-d')) {
								array_push($registros_coincidentes, $hora_del_partido);
						}


					}
					//echo json_encode($registros_coincidentes);
					$resultados_de_validacion['datos']=$registros_coincidentes;
				}
						
						//
			}
		else{
			$resultados_de_validacion['error']="El jugador no cuenta con ninguna invitacion.";
		}	

	}
	else{
		$resultados_de_validacion['error']="El id del usuario no esta definido.";
	}
		
		
	
	echo json_encode($resultados_de_validacion);


 ?>