<?php
	session_start();
	require("conexion.php");

	if(isset($_POST["id_usuario"]))
	{
		obtenerMisPartidos($_POST["id_usuario"]);

	}

	function obtenerMisPartidos($id_user)
	{
		$conn = getConnection();
		$sql="select *from partidos,tipos_de_futbol where ID_USUARIO=id_usuario AND partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO ORDER BY partidos.FECHA ASC";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":id_usuario" => $id_user ));
		$registros=$resultados->fetchAll(PDO::FETCH_OBJ);
		closeConnection($conn);
		echo json_encode($registros);
		
	}


 ?>