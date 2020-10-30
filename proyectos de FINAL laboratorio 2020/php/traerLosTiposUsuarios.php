<?php
	session_start();
	require("conexion.php");

	if(isset($_POST["funcion"]))
	{
		obtenerTiposCanchas();

	}

	function obtenerTiposCanchas()
	{
		$conn = getConnection();
		$sql_canchas="SELECT * FROM roles";
		$resultados=$conn->prepare($sql_canchas);
		$resultados->execute();
		$registros=$resultados->fetchAll(PDO::FETCH_OBJ);
		closeConnection($conn);
		echo json_encode($registros);
	}


 ?>