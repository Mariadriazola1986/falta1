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
		
		//$sql="select *from partidos,tipos_de_futbol where ID_USUARIO!=:id_usuario AND partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO AND partidos.CANTIDAD_DE_JUGADORES_ACTUALES<tipos_de_futbol.JUGADORES_MINIMOS_REQUERIDOS AND partidos.FECHA>=CURDATE() ORDER BY partidos.FECHA ASC";
		$sql='select *from partidos,tipos_de_futbol where ID_USUARIO!=:id_usuario AND partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO AND partidos.CANTIDAD_DE_JUGADORES_ACTUALES<tipos_de_futbol.JUGADORES_MINIMOS_REQUERIDOS AND partidos.FECHA>=CURDATE() AND partidos.HORA>DATE_FORMAT(NOW( ), "%H:%i:%S" ) ORDER BY partidos.FECHA ASC';
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $id_user ));
		$registros=$resultados->fetchAll(PDO::FETCH_OBJ);
		closeConnection($conn);
		echo json_encode($registros);
		
	}



 ?>