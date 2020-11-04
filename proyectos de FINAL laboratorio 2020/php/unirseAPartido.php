<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["id_usuario"]) && isset($_POST["id_partido"]))
    {
        
        if (!empty($_POST["id_usuario"])&&!empty($_POST["id_partido"])) {

                        $id_usuario=$_POST["id_usuario"];
                        $id_partido=$_POST["id_partido"];
                        $conn = getConnection();
                        $sql_partido="SELECT * FROM partidos WHERE partidos.ID_PARTIDO=:id_partido";
                        $resultado_partido=$conn->prepare($sql_partido);
                        $resultado_partido->execute(array(":id_partido"=>$id_partido));
                        if ($resultado_partido->rowCount()>0) {   
	                        $resultado_id_partido=$resultado_partido->fetch(PDO::FETCH_ASSOC);
	                        $cantidad_de_jugadores_actuales=$resultado_id_partido["CANTIDAD_DE_JUGADORES_ACTUALES"];
                            $uno_mas=$cantidad_de_jugadores_actuales+1;


	                        $sql_actulizar_cant_jugadores="UPDATE partidos SET CANTIDAD_DE_JUGADORES_ACTUALES = $uno_mas WHERE partidos.ID_PARTIDO =:id_partido";
	                        $resultado_actualizar_jugadores=$conn->prepare($sql_actulizar_cant_jugadores);
	                        $resultado_actualizar_jugadores->execute(array(":id_partido"=>$id_partido));

	                        if ($resultado_actualizar_jugadores->rowCount()>0) {//si si se pudo actualizar los datos
                                $sql_juega_partido="INSERT INTO usuarios_juegan_partidos (ID_USUARIO, ID_PARTIDO, ID_INVITADO) VALUES (:id_usuario,:partido, NULL)";
                                $resultado_juego=$conn->prepare($sql_juega_partido);
                                $resultado_juego->execute(array(":id_usuario"=>$id_usuario,":partido"=>$id_partido));
	                        	$resultados_de_validacion['error']='NO';
	                        }
	                					
	                		else{
	                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente registrar partido";
	                		}
	                        closeConnection($conn);
                    	}
                    	else{
                    		$resultados_de_validacion['error']="No se pudo encontrar los datos del partido";
                    	}
                
                
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

