<?php 
require_once("conexion.php");
if(isset($_POST["usuario"]) && isset($_POST["password"]))/*$_POST["usuario"] !== '' && $_POST["password"] !== '')*/
{
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
			echo "activar";
		}
		else if($registro['ESTADO_USUARIO']==1){
			session_start();
			$_SESSION["email"]=$_POST["mail"];
			//header("location:../index2.php");
			header("location:../index.php");
			echo "ok";

		}

	}
	else{

		echo ("error");
	}

}












 ?>