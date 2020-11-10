<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["idusuario"]) && isset($_POST["direccion"]) && isset($_POST["distrito"]) && isset($_POST["telefono"]))
    {
        if (!empty($_POST["idusuario"])&&!empty($_POST["direccion"])&&!empty($_POST["distrito"])&&!empty($_POST["telefono"])) {
        
                        $conn = getConnection();
                        $sql="INSERT INTO establecimientos(ID_ESTABLECIMIENTO,ID_USUARIO, DISTRITO,DIRECCION,TELEFONO) VALUES (NULL,:id_usuario,:distrito,:direccion,:telefono)";
                        $resultado=$conn->prepare($sql);
                        $resultado->execute(array(":id_usuario"=>$_POST["idusuario"],":direccion"=>$_POST["direccion"],":distrito"=>$_POST["distrito"],":telefono"=>$_POST["telefono"]));
                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos
                            $resultados_de_validacion['error']="NO";
                        }				
                		else{
                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente enviar";
                		}
                        closeConnection($conn);
            
        }
        else
        {
            $resultados_de_validacion['error']="Todos los campos son obligatorios";
        }

        
        
    }
    else
    {
        $resultados_de_validacion['error']="Los campos no estan definidos";
    }
   echo(json_encode($resultados_de_validacion));
?>

