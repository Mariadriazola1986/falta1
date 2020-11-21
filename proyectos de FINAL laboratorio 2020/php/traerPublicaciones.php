<?php
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );
	traerPublicaciones();
	function traerPublicaciones()
	{
		global $resultados_de_validacion;//HDRP HAY Q PONER ESTO PARA QUE RECONOZCA LA VARIABLE GLOBAL.
		//var_dump($id_user);
		$conn = getConnection();
		$sql="select * from partidos,tipos_de_futbol,publicaciones where publicaciones.ID_PARTIDO=partidos.ID_PARTIDO AND partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO AND partidos.CANTIDAD_DE_JUGADORES_ACTUALES<tipos_de_futbol.JUGADORES_MINIMOS_REQUERIDOS AND partidos.FECHA>=CURDATE() ORDER BY partidos.FECHA ASC";
		$resultados=$conn->prepare($sql);
		$resultados->execute();
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
		if ($registros) {	
			$hora_actual = new DateTime("now", new DateTimeZone('America/Argentina/Buenos_Aires'));
			$hora_now=$hora_actual->format('H:i:s');
			$Hoy = new DateTime("now", new DateTimeZone('America/Argentina/Buenos_Aires'));
			$registros_coincidentes=array();
			foreach ($registros as $hora_del_partido) {
				if ($hora_del_partido["FECHA"]==$Hoy->format('Y-m-d')) {

					if ($hora_del_partido["HORA"]>$hora_now) {

						array_push($registros_coincidentes, $hora_del_partido);
					}
				}
				else if ($hora_del_partido["FECHA"]>$Hoy->format('Y-m-d')) {
						array_push($registros_coincidentes, $hora_del_partido);
				}
			}
			if(empty($registros_coincidentes)){
				$resultados_de_validacion["error"]="No hay publicaciones actuales.";
			}
			else{
				$resultados_de_validacion["datos"]=$registros_coincidentes;
			}
		}
		else{
		$resultados_de_validacion["error"]="No hay publicaciones disponibles.";
		}

	}
echo json_encode($resultados_de_validacion);

 ?>