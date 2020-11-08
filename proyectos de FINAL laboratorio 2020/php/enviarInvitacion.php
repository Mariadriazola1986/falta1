<?php
    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["id_partido"]) && isset($_POST["email"])&& isset($_POST["nombre"])&& isset($_POST["districtoybarrio"]))
    {
        
        if (!empty($_POST["id_partido"])&&!empty($_POST["email"])&&!empty($_POST["nombre"])&&!empty($_POST["districtoybarrio"])) {
            $idpartido=$_POST["id_partido"];
            $mail=$_POST["email"];
            $nombre_del_que_invita=$_POST["nombre"];
            $id=$idpartido;
            $districtoybarrio=$_POST["districtoybarrio"];
            $para=$mail;
            $conn = getConnection();
            $sql="SELECT * FROM partidos,tipos_de_futbol WHERE partidos.TIPO_DE_FUTBOL=tipos_de_futbol.ID_TIPO and partidos.ID_PARTIDO=:idpartido";
            $resultados=$conn->prepare($sql);
            $resultados->execute(array(":idpartido" => $id ));
            $registros=$resultados->fetch(PDO::FETCH_ASSOC);//REVISAR bien EL fecthALL y la diferencia con fetch
            closeConnection($conn);
            
            if ($registros) {
                $fecha_a_enviar=$registros["FECHA"];
                $hora_inicio_a_enviar=$registros["HORA"];
                $hora_fin_a_enviar=$registros["HORA_FIN"];
                $tipos_de_futbol_a_enviar=$registros["TIPO"];

                $asunto="El jugador:". $nombre_del_que_invita ." te invito a unirte a este partido";
                        $mensajes="<html lang='es'>"
                         ."<head>"
                         ."<title>Invitacion a partido </title> "
                         ."<meta charset='utf-8'/>"
                         ."<style>
                        table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                        }
                        </style>"
                        ."</head>"
                        
                        ."<body>"
                        ."<h2>Datos del partido</h2>"
                        ."<table>
                          <tr>
                            <th>fecha</th>
                            <th>Hora inicio</th>
                            <th>Hora fin</th>
                            <th>Tipo de futbol a jugar</th>
                            <th>Districto y Barrio donde se va a Jugar</th>
                          </tr>
                          <tr>
                            <td>".$fecha_a_enviar."</td>
                            <td>".$hora_inicio_a_enviar."</td>
                            <td>".$hora_fin_a_enviar."</td>
                            <td>".$tipos_de_futbol_a_enviar."</td>
                            <td>".$districtoybarrio."</td>
                          </tr>
                        </table>"
                        ."Hace click en el siguiente enlace para anotarte a este partido:<br>"
                        ."<a href='localhost/proyectos%20de%20FINAL%20laboratorio%202020/invitadoamigo.php?link=$id'>"
                        ."Anotarme en partido</a>";
                        $mensajes.="</body>"
                                            ."</html>  ";
                                    $cabeceras='MIME-Version: 1.0' . "\r\n";
                                    $cabeceras.='Content-type: text/html; charset=iso-8859-1' . "\r\n";
                                    $cabeceras.='From: falta1.com <falta1@gmail.com>' . "\r\n";
                                    mail($para,$asunto,$mensajes,$cabeceras);
            }
            else{

                $resultados_de_validacion['error']="No se encontro los datos del partido.";
            }                  

        }
                        
        else
        {
            $resultados_de_validacion['error']="Todos los campos son obligatorios";
        }

            
    }

    else{
        $resultados_de_validacion['error']="Los campos no estan definidos";
    }


    echo(json_encode($resultados_de_validacion));

    
?>

