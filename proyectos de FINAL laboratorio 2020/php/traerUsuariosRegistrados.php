<?php
	/*Quiero traer de la BD: nombre, email, rol, y estado de usuario de todos los usuarios que no sean el administrador logueado 
	PD: Necesito modificar el WHERE con el id del administrador logueado en ese momento*/
	session_start();
	require("conexion.php");

		//var_dump($id_user);
		$conn = getConnection();
		$sql="select usuarios.ID_USUARIO, usuarios.NOMBRE, usuarios.EMAIL, roles.NOMBRE_TIPO, estados_usuarios.ESTADO from usuarios inner join roles on usuarios.TIPO_USUARIO = roles.ID_TIPO inner join estados_usuarios on usuarios.ESTADO_USUARIO = estados_usuarios.ID_ESTADO where roles.NOMBRE_TIPO != 'Administrador' ";
		$resultados=$conn->prepare($sql);
		$resultados->execute();
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
		
		$registros_coincidentes=array();
		foreach ($registros as $usuariosRegistrados) {
					array_push($registros_coincidentes, $usuariosRegistrados);
				}
			

		echo json_encode($registros_coincidentes);


 ?>