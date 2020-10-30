<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["id_usuario"]) && isset($_POST["dia"]) && isset($_POST["hora"]) && isset($_POST["tipo_de_futbol"]))
    {
        
        if (!empty($_POST["id_usuario"])&&!empty($_POST["dia"])&&!empty($_POST["hora"])&&!empty($_POST["tipo_de_futbol"])) {
            
                        $id_usuario=$_POST["id_usuario"];
                        $dia=$_POST["dia"];
                        $hora=$_POST["hora"];
                        $tipo_futbol=$_POST["tipo_de_futbol"];
                        $conn = getConnection();
                        $sql="INSERT INTO partidos (ID_PARTIDO, ID_USUARIO, FECHA, HORA, TIPO_DE_FUTBOL) VALUES (NULL,:id_usuario,:dia,:hora,:tipo_futbol)";
                        $resultado=$conn->prepare($sql);
                        $resultado->execute(array(":id_usuario"=>$id_usuario,":dia"=>$dia,":hora"=>$hora,":tipo_futbol"=>$tipo_futbol));
                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos que se confirme que no hubo errores	
                        	$resultados_de_validacion['error']='NO';
                        }
                					
                		else{
                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente registrar partido";
                		}
                        closeConnection($conn);
                
                
        }
        else
        {
            $resultados_de_validacion['error']="Todos los campos son obligatorios";
        }

        
        
    }
    else{
        $resultados_de_validacion['error']="Las variables de los campos no estan definidas";
    }
    echo(json_encode($resultados_de_validacion));



    
?>

