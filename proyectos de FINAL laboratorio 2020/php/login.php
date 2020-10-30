<?php 
require_once("conexion.php");
$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
if(isset($_POST["usuario"]) && isset($_POST["password"]))
{
	if (!empty($_POST["usuario"])&&!empty($_POST["password"])){
		$nombre=$_POST["usuario"];
		$password=$_POST["password"];
		$conn = getConnection();
		$sql="select * from usuarios where NOMBRE =:nombre";
		$resultado=$conn->prepare($sql);
		$resultado->execute(array(":nombre"=>$nombre));
		$registro=$resultado->fetch(PDO::FETCH_ASSOC);
		closeConnection($conn);


		if(password_verify( $password,$registro['PASSWORD']))//'PASSWORD' es el nombre del campo de la tabla,password_verify es una funcion de desifrar hash del password
		{
			if ($registro['ESTADO_USUARIO']==0)//'ESTADO_USUARIO' es el nombre del campo de la tabla
			{
				$resultados_de_validacion['error']="Falta activar su cuenta por mail, por favor espere que un mail le llegará en momentos";
			}
			else if($registro['ESTADO_USUARIO']==1){
				$tipo_de_usuario=$registro["TIPO_USUARIO"];
				session_start();
				$_SESSION["ID_USUARIO"]=$registro["ID_USUARIO"];
				$_SESSION["NOMBRE"]=$registro["NOMBRE"];

				$pagina_default = cargarPermisosUsuario($registro["ID_USUARIO"]);
				$resultados_de_validacion['datos']=$pagina_default;


			}

		}
		else{

			$resultados_de_validacion['error']="El usuario o la contraseña es incorrecta.";
		}
	}
	else{
		$resultados_de_validacion['error']="Todos los campos son obligatorios";
	}
	echo(json_encode($resultados_de_validacion));

}


function cargarPermisosUsuario($idUsuario)
    {
        $conn = getConnection();
        $query = "SELECT acceso 
        FROM USUARIOS, ROLES, ROLES_PERMISOS, PERMISOS 
        WHERE PERMISOS.id_permiso = ROLES_PERMISOS.id_permiso AND 
        ROLES_PERMISOS.id_tipo = ROLES.id_tipo AND ROLES.id_tipo = USUARIOS.tipo_usuario AND USUARIOS.id_usuario = $idUsuario";
        $result = $conn->prepare($query);
        $result->execute();
        $listPermisos = $result->fetchAll(PDO::FETCH_ASSOC);
        closeConnection($conn);
        return $listPermisos[0]['acceso'];
    }









 ?>