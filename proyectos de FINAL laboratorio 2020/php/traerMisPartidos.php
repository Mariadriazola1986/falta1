<?php
	session_start();
	require("conexion.php");

	if(isset($_POST["id_usuario"]))
	{
		obtenerMisPartidos($_POST["id_usuario"]);

	}

	function obtenerMisPartidos($id_user)
	{
		//var_dump($id_user);
		$conn = getConnection();
		$sql="select *from partidos,tipos_de_futbol where ID_USUARIO=:id_usuario AND partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO AND partidos.CANTIDAD_DE_JUGADORES_ACTUALES<tipos_de_futbol.JUGADORES_MINIMOS_REQUERIDOS AND partidos.FECHA>=CURDATE() ORDER BY partidos.FECHA ASC";
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