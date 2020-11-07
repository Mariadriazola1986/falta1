<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["nombre"]) && isset($_POST["apellido"]) && isset($_POST["dni"]) && isset($_POST["telefono"])&& isset($_POST["idpartido"]))
    {
        if (!empty($_POST["nombre"])&&!empty($_POST["apellido"])&&!empty($_POST["dni"])&&!empty($_POST["telefono"])) {
        
                        $conn = getConnection();
                        $sql="INSERT INTO invitados(ID_INVITADO, NOMBRE, APELLIDO, DNI, TELEFONO) VALUES (NULL,:nombre,:apellido,:dni,:telefono)";
                        $resultado=$conn->prepare($sql);
                        $resultado->execute(array(":nombre"=>$_POST["nombre"],":apellido"=>$_POST["apellido"],":dni"=>$_POST["dni"],":telefono"=>$_POST["telefono"]));
                        $idultimo=$conn->lastInsertId();
                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos
                            $sql_insertar_en_partido ="INSERT INTO usuarios_juegan_partidos (ID_USUARIO,ID_PARTIDO, ID_INVITADO) VALUES (NULL,:id_partido,:id_invitado)";
                            $resultado_insercion=$conn->prepare($sql_insertar_en_partido);
                            $resultado_insercion->execute(array(":id_invitado"=>$idultimo,":id_partido"=>$_POST["idpartido"]));
                            if ($resultado_insercion->rowCount()>0) {
                                //
                                $sql_partido="SELECT * FROM partidos WHERE partidos.ID_PARTIDO=:id_partido";
                                $resultado_partido=$conn->prepare($sql_partido);
                                $resultado_partido->execute(array(":id_partido"=>$_POST["idpartido"]));
                                if ($resultado_partido->rowCount()>0) {   
                                    $resultado_id_partido=$resultado_partido->fetch(PDO::FETCH_ASSOC);
                                    $cantidad_de_jugadores_actuales=$resultado_id_partido["CANTIDAD_DE_JUGADORES_ACTUALES"];
                                    $uno_mas=$cantidad_de_jugadores_actuales+1;
                                    $sql_actulizar_cant_jugadores="UPDATE partidos SET CANTIDAD_DE_JUGADORES_ACTUALES = $uno_mas WHERE partidos.ID_PARTIDO =:id_partido";
                                    $resultado_actualizar_jugadores=$conn->prepare($sql_actulizar_cant_jugadores);
                                    $resultado_actualizar_jugadores->execute(array(":id_partido"=>$_POST["idpartido"]));
                                    if ($resultado_actualizar_jugadores->rowCount()<0) {
                                        $resultados_de_validacion['error']="No se pudo actualizar la cantidad de jugadores del partido datos del partido";
                                    }
                            
                                }
                                else{
                                    $resultados_de_validacion['error']="No se encontraron los datos del partido";
                                }
                                //
                            }
                            else{
                                $resultados_de_validacion['error']="No se pudo insertar los datos de invitado al partido";
                            }
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

