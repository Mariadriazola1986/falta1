<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["usuario"]) && isset($_POST["password"]) && isset($_POST["passwordR"]) && isset($_POST["email"]) && isset($_POST["tipousuario"]))
    {
        
        if (!empty($_POST["usuario"])&&!empty($_POST["password"])&&!empty($_POST["passwordR"])&&!empty($_POST["email"])&&!empty($_POST["tipousuario"])) {
            if (no_existe_el_usuario($_POST["usuario"])) {
                if (no_existe_el_mail($_POST["email"])) {            
                    if ($_POST["password"]===$_POST["passwordR"]) {
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
                        			$para=$mail;
                			        $asunto="link de activacion de Usuario en el Sistema";
                			        $mensajes="<html lang='es'>"
                			                ."<head>"
                			                ."<title> Link de activacion de Usuario</title> "
                			                ."<meta charset='utf-8'/>"
                			                ."</head>"
                			                ."<body>"
                			                ."Para poder acceder al sistema debe activar su usuario haciendo click en el siguente enlace:<br>"
                			                ."<a href='localhost/proyectos%20de%20FINAL%20laboratorio%202020/php/activar_usuario.php?link=$cadena'>"
                			                ."Activar Cuenta</a>";
                			        $mensajes.="</body>"
                			                ."</html>  ";
                			        $cabeceras='MIME-Version: 1.0' . "\r\n";
                			        $cabeceras.='Content-type: text/html; charset=iso-8859-1' . "\r\n";
                			        $cabeceras.='From: falta1.com <falta1@gmail.com>' . "\r\n";
                			        mail($para,$asunto,$mensajes,$cabeceras);

                					}
                		else{
                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente registrar";
                		}
                        closeConnection($conn);
                    }
                    else{
                        $resultados_de_validacion['error']="Los password no coinciden";
                    }

                }
                else{
                    $resultados_de_validacion['error']="El email que intenta registrar ya existe en nuestro sistema.";
                }
            }
            else{
                $resultados_de_validacion['error']="El Nombre de usuario que eligio ya esta en uso.";
            }
        }
        else
        {
            $resultados_de_validacion['error']="Todos los campos son obligatorios";
        }

        echo(json_encode($resultados_de_validacion));
        
    }

    function no_existe_el_mail($email){
        $conn = getConnection();
        $sql="select *from usuarios where EMAIL=:correo";
        $comprobar=$conn->prepare($sql);
        $comprobar->execute(array(':correo' => $email ));
        $resultado=$comprobar->fetchAll();
        if($resultado){
            return false;
        }
        else {
        return true;
        }
        closeConnection($conn);
    }

    function no_existe_el_usuario($usuario){
        $conn = getConnection();
        $sql="select *from usuarios where NOMBRE=:usuario";
        $comprobar=$conn->prepare($sql);
        $comprobar->execute(array(':usuario' => $usuario ));
        $resultado=$comprobar->fetchAll();
        if($resultado){
            return false;
        }
        else {
        return true;
        }
        closeConnection($conn);
    }
    
?>

