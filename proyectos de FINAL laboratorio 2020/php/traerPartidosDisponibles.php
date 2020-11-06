<?php
	session_start();
	require("conexion.php");

	if(isset($_POST["id_usuario"]))
	{
		obtenerPartidosDisponibles($_POST["id_usuario"]);

	}

	function obtenerPartidosDisponibles($id_user)
	{
		//var_dump($id_user);
		$conn = getConnection();

		$sql="select * from partidos as P, tipos_de_futbol as T 
where P.ID_PARTIDO in (select Pa.ID_PARTIDO from partidos as Pa where not exists 
(select * from usuarios_juegan_partidos as Us where Pa.ID_PARTIDO = Us.ID_PARTIDO and Us.ID_USUARIO = :id_usuario)) 
AND P.TIPO_DE_FUTBOL = T.ID_TIPO AND P.CANTIDAD_DE_JUGADORES_ACTUALES < T.JUGADORES_MINIMOS_REQUERIDOS AND P.FECHA >= CURDATE() ORDER BY P.FECHA ASC";

		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $id_user ));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
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
		echo json_encode($registros_coincidentes);

	}



 ?>