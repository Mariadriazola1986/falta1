<?php
	//session_start();
	require_once("conexion.php");

	if(isset($_SESSION['ID_USUARIO']))
	{
		cualEsSuPaginaDefaulSiEstaEnSesion($_SESSION['ID_USUARIO']);
	}
    

    function cualEsSuPaginaDefaulSiEstaEnSesion($idUsuario)
    {
        $conn = getConnection();
        $query = "SELECT acceso FROM permisos, roles_permisos, usuarios 
        WHERE permisos.ID_PERMISO = roles_permisos.ID_PERMISO AND roles_permisos.ID_TIPO = usuarios.TIPO_USUARIO 
        AND usuarios.ID_USUARIO = :id_usuario";
        $result = $conn->prepare($query);
        $result->execute(array(":id_usuario"=>$idUsuario));
        $listAccesos = $result->fetchAll(PDO::FETCH_ASSOC);
        //var_dump($listAccesos[0]["acceso"]);
        header("location:".$listAccesos[0]["acceso"]."");
        
    }

    
?>