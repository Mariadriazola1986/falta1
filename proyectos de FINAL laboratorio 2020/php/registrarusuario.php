<?php

    require_once("conexion.php");
    if(isset($_POST["usuario"]) && isset($_POST["password"]) && isset($_POST["repetirpassword"]) && isset($_POST["email"]) && isset($_POST["tipousuario"]))/*$_POST["usuario"] !== '' && $_POST["password"] !== '')*/
    {
        $usuario=$_POST["usuario"];
        $pass=$_POST["password"];
        $mail=$_POST["email"];
        $tipouser=$_POST["tipousuario"];
        $password_h=password_hash($pass,PASSWORD_DEFAULT);
        $estado=0;
        $enviar=false;
        $cadena="";
        $posible="1234567890abcdefghijklmnopqrstuvwxyz_";
        $i=0;
        while($i<30){
            $caracter=substr($posible,mt_rand(0,strlen($posible)-1),1);
            $cadena.=$caracter;
            $i++;
        }
        $conn = getConnection();
        $sql="insert into usuarios (NOMBRE,PASSWORD,EMAIL,TIPO_USUARIO,ESTADO_USUARIO,COD_ACTIVACION)values(:nombre,:password,:email,:tipo_usuario,:estado,:cod_activacion)";
        $resultado=$conn->prepare($sql);
        $resultado->execute(array(":nombre"=>$usuario,":password"=>$password_h,":email"=>$mail,":tipo_usuario"=>$tipouser,":estado"=>$estado,"cod_activacion"=>$cadena));
        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos que se envie el mail
						//$resultado['datos']=1;
        			$para=$mail;
			        $asunto="link de activacion de Usuario en el Sistema";
			        $mensajes="<html lang='es'>"
			                ."<head>"
			                ."<title> Link de activacion de Usuario</title> "
			                ."<meta charset='utf-8'/>"
			                ."</head>"
			                ."<body>"
			                ."Para poder al sistema debe activar su usuario haciendo click en el siguente enlace:<br>"
			                ."<a href='localhost/proyectos%20de%20FINAL%20laboratorio%202020/php/activar_usuario.php?link=$cadena'>"
			                ."Activar Cuenta</a>";
			        $mensajes.="</body>"
			                ."</html>  ";
			        $cabeceras='MIME-Version: 1.0' . "\r\n";
			        $cabeceras.='Content-type: text/html; charset=iso-8859-1' . "\r\n";
			        $cabeceras.='From: falta1.com <falta1@gmail.com>' . "\r\n";
			        mail($para,$asunto,$mensajes,$cabeceras);
			        echo "el mail fue enviado correctamente";

					}
		else{
						//$resultado['datos']=0;
		}
        closeConnection($conn);
        
    }
    
?>

