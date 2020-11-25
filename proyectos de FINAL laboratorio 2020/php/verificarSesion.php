<?php
	session_start();
	require_once("conexion.php");

	if(isset($_SESSION['ID_USUARIO']))
	{
		$_SESSION['nombre_usuario'] = obtenerNombreUsuario($_SESSION['ID_USUARIO']);
		if(!usuarioTieneAcceso($_SESSION['ID_USUARIO'], $_SERVER['PHP_SELF']))
		{
			header("location:index.php");
		}
	}
    else
    {
		header("location:index.php");
	}

    function usuarioTieneAcceso($idUsuario, $nombreRaizAcceso)
    {
        $conn = getConnection();
        $query = "SELECT acceso FROM permisos, roles_permisos, usuarios 
        WHERE permisos.ID_PERMISO = roles_permisos.ID_PERMISO AND roles_permisos.ID_TIPO = usuarios.TIPO_USUARIO 
        AND usuarios.ID_USUARIO = :id_usuario";
        $result = $conn->prepare($query);
        $result->execute(array(":id_usuario"=>$idUsuario));
        $listAccesos = $result->fetchAll(PDO::FETCH_OBJ);
        //quitar raiz del acceso
        $splitStrPagina = explode("/", $nombreRaizAcceso);
        $nombrePagina = $splitStrPagina[count($splitStrPagina)-1];
        foreach($listAccesos as $acceso)
        {
            if($acceso->acceso == $nombrePagina)
            {
                closeConnection($conn);
                return true;
            }
        }
        closeConnection($conn);
        return false;
    }

    function obtenerNombreUsuario($idUsuario)
    {
        $conn = getConnection();
        $query = "SELECT nombre FROM usuarios WHERE id_usuario = :id_usuario";
        $result = $conn->prepare($query);
        $result->execute(array(":id_usuario"=>$idUsuario));
        $listNombre = $result->fetchAll(PDO::FETCH_OBJ);
        return $listNombre[0]->nombre;
    }
?>