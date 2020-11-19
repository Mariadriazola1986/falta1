<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );
    if(isset($_POST["id_usuario"]) && isset($_POST["id_partido"]))
    {

        if (!empty($_POST["id_usuario"])&&!empty($_POST["id_partido"])){
                        $id_usuario=$_POST["id_usuario"];
                        $id_partido=$_POST["id_partido"];
                        //traer primero la fechay hora del partido
                        $conn = getConnection();
                        $sql_partido_al_cual_me_voy_unir="SELECT FECHA,HORA,HORA_FIN FROM partidos WHERE ID_PARTIDO=:id_partido";
                        $partfechahora=$conn->prepare($sql_partido_al_cual_me_voy_unir);
                        $partfechahora->execute(array(":id_partido"=>$id_partido));
                        $todoOkParaCargar=true;
                        if ($partfechahora->rowCount()>0) {
                                //COMPARO LA FECHA DEL PARTIDO A ANOTARME CON LA QUE YA ESTOY ANOTADO
                                $aanotar=$partfechahora->fetchAll(PDO::FETCH_ASSOC);
                                //echo($aanotar[0]["FECHA"]);
                                $sql_juego_partidos_en_esa_fecha_hora = "select * from partidos as P, tipos_de_futbol as T where P.ID_PARTIDO in (select Pa.ID_PARTIDO from partidos as Pa where exists (select * from usuarios_juegan_partidos as Us where Pa.ID_PARTIDO = Us.ID_PARTIDO and Us.ID_USUARIO =:idusuariomispartidos)) AND P.TIPO_DE_FUTBOL = T.ID_TIPO AND P.FECHA=:fechamipartidos";

                                $mispartidofecha=$conn->prepare($sql_juego_partidos_en_esa_fecha_hora);
                                $mispartidofecha->execute(array(":idusuariomispartidos"=>$id_usuario,":fechamipartidos"=>$aanotar[0]["FECHA"]));
                                $partidosAnotados=$mispartidofecha->fetchall(PDO::FETCH_ASSOC);
                                closeConnection($conn);
                                if ($partidosAnotados) {//partidos donde sí me anote
                                    foreach ($partidosAnotados as $partidosH) {
                                        if ($aanotar[0]["HORA"] == $partidosH["HORA"] || $aanotar[0]["HORA"] == $partidosH["HORA_FIN"]) {
                                            $resultados_de_validacion['error']="Ya tenes un partido donde jugar y se superpone con el que queres anotarte.";
                                            $todoOkParaCargar=false;
                                        }
                                        else if($aanotar[0]["HORA"]>=$partidosH["HORA"] && $aanotar[0]["HORA"]<=$partidosH["HORA_FIN"]){
                                            $resultados_de_validacion['error']="Ya tenes un partido donde jugar y se superpone con el que queres anotarte.";
                                            $todoOkParaCargar=false;
                                        }
                                        else if($aanotar[0]["HORA_FIN"]== $partidosH["HORA"] || $aanotar[0]["HORA_FIN"] == $partidosH["HORA_FIN"] ) {
                                            $resultados_de_validacion['error']="Ya tenes un partido donde jugar y se superpone con el que queres anotarte.";
                                            $todoOkParaCargar=false;
                                        }
                                        else if($aanotar[0]["HORA_FIN"]>=$partidosH["HORA"] && $aanotar[0]["HORA_FIN"]<=$partidosH["HORA_FIN"]){
                                            $resultados_de_validacion['error']="Ya tenes un partido donde jugar y se superpone con el que queres anotarte.";
                                            $todoOkParaCargar=false;
                                        }
                                    }
                                }
                                else{

                                }

                                if ($todoOkParaCargar){
                                    unirsePartido();
                                }
                        }
        }
    }


    function unirsePartido(){
        global $id_usuario, $id_partido;
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
            $resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente unirse partido";
            }
    closeConnection($conn);
                                   }

    }
    echo(json_encode($resultados_de_validacion));


?>

