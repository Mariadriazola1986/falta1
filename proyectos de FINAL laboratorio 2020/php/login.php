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
				if ($tipo_de_usuario==1) {//Esto esta mal tendriamos que dar las paginas de acuerdo a los permisos pero por ahora basta con hacer funcionar SI HAY TIEMPO HAY Q CAMBIARLO

					//header("location:../organizar-partido.html");//tiene que ser una pagina php para que guarde la sesion
					//$resultados_de_validacion['error']='NO';
				}
				else if ($tipo_de_usuario==1){
					//header("location:../organizar-partido.html");//pagina respectiva al dueño de cancha
				}


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












 ?>