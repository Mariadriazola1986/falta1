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
                        //
                      	$sql_hay_partidos_en_esa_fecha = "select * from partidos as P, tipos_de_futbol as T where P.ID_PARTIDO in (select Pa.ID_PARTIDO from partidos as Pa where exists (select * from usuarios_juegan_partidos as Us where Pa.ID_PARTIDO = Us.ID_PARTIDO and Us.ID_USUARIO =:idusuario)) AND P.TIPO_DE_FUTBOL = T.ID_TIPO AND P.FECHA=:fecha";
                        $resultado_partidos=$conn->prepare($sql_hay_partidos_en_esa_fecha);
                        $resultado_partidos->execute(array(":fecha"=>$dia,":idusuario"=>$id_usuario));
                        $existe_partido=$resultado_partidos->fetchAll(PDO::FETCH_ASSOC);//cuidado con fetch(solo trae la primer fila) y fetchAll(trae todas las filas) 
                       
                        
                        if ($existe_partido) {// si exite algun partido en esa fecha
                            $sql_sumar_duracion="SELECT * FROM tipos_de_futbol WHERE tipos_de_futbol.ID_TIPO=:id_tipo_futbol";
                        	$resultado_Deduracion=$conn->prepare($sql_sumar_duracion);
                        	$resultado_Deduracion->execute(array(":id_tipo_futbol"=>$tipo_futbol));
                        	if ($resultado_Deduracion->rowCount()>0) {   
		                        $duracionPrima=$resultado_Deduracion->fetch(PDO::FETCH_ASSOC);
		                        $duraciondeMipartidoingresado=[$duracionPrima["DURACION"],$hora];
		                        $horaFinMipartidoingresado=sumarHoras($duraciondeMipartidoingresado);
		                        $horaInicioMipartidoingresado=$hora;
		                        $todoOkParaCargar=true;
		                        
		                        foreach ($existe_partido as $partidosH) {
		                    		
		                        	if ($horaInicioMipartidoingresado == $partidosH["HORA"] || $horaInicioMipartidoingresado == $partidosH["HORA_FIN"]) {
		                        		$resultados_de_validacion['error']="Ya tenes un partido organizado dentro del horario que seleccionaste.";
		                        		$todoOkParaCargar=false;
		                        	}
		                        	else if($horaInicioMipartidoingresado>=$partidosH["HORA"] && $horaInicioMipartidoingresado<=$partidosH["HORA_FIN"]){
		                        		$resultados_de_validacion['error']="Ya tenes un partido organizado dentro del horario que seleccionaste.";
		                        		$todoOkParaCargar=false;
		                        	}
		                        	else if($horaFinMipartidoingresado == $partidosH["HORA"] || $horaFinMipartidoingresado == $partidosH["HORA_FIN"] ) {
		                        		$resultados_de_validacion['error']="Ya tenes un partido organizado dentro del horario que seleccionaste.";
		                        		$todoOkParaCargar=false;
		                        	}
		                        	else if($horaFinMipartidoingresado>=$partidosH["HORA"] && $horaFinMipartidoingresado<=$partidosH["HORA_FIN"]){
		                        		$resultados_de_validacion['error']="Ya tenes un partido organizado dentro del horario que seleccionaste.";
		                        		$todoOkParaCargar=false;
		                        	}
		                        }
		                        if ($todoOkParaCargar) {
		                        	 $sql_duracion="SELECT * FROM tipos_de_futbol WHERE tipos_de_futbol.ID_TIPO=:id_tipo_futbol";
				                        $resultado_duracion=$conn->prepare($sql_duracion);
				                        $resultado_duracion->execute(array(":id_tipo_futbol"=>$tipo_futbol));
				                        if ($resultado_duracion->rowCount()>0) {   
					                        $duracion=$resultado_duracion->fetch(PDO::FETCH_ASSOC);
					                        $duracionfulbol=[$duracion["DURACION"],$hora];
					                        $total_duracion=sumarHoras($duracionfulbol);

					                        $sql="INSERT INTO partidos (ID_PARTIDO, ID_USUARIO, FECHA, HORA,HORA_FIN,TIPO_DE_FUTBOL,CANTIDAD_DE_JUGADORES_ACTUALES) VALUES (NULL,:id_usuario,:dia,:hora,:hora_fin,:tipo_futbol,1)";
					                        $resultado=$conn->prepare($sql);
					                        $resultado->execute(array(":id_usuario"=>$id_usuario,":dia"=>$dia,":hora"=>$hora,":hora_fin"=>$total_duracion,":tipo_futbol"=>$tipo_futbol));
				                            $idultimo=$conn->lastInsertId();
					                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos que se confirme que no hubo errores
				                                $sql_juega_partido="INSERT INTO usuarios_juegan_partidos (ID_USUARIO, ID_PARTIDO, ID_INVITADO) VALUES (:id_usuario,:partido, NULL)";
				                                $resultado_juego=$conn->prepare($sql_juega_partido);
				                                $resultado_juego->execute(array(":id_usuario"=>$id_usuario,":partido"=>$idultimo));
					                        	$resultados_de_validacion['error']='NO';
					                        }
					                					
					                		else{
					                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente registrar partido";
					                		}
					                        closeConnection($conn);
				                    	}
				                    	else{
				                    		$resultados_de_validacion['error']="No se pudo traer los datos de duracion del tipo de futbol";
				                    	}
		                        }
		                        
	                    	}
                        }
                        else{//si no existe que guarde el partido sin porblemas

	                        $conn = getConnection();
	                        $sql_duracion="SELECT * FROM tipos_de_futbol WHERE tipos_de_futbol.ID_TIPO=:id_tipo_futbol";
	                        $resultado_duracion=$conn->prepare($sql_duracion);
	                        $resultado_duracion->execute(array(":id_tipo_futbol"=>$tipo_futbol));
	                        if ($resultado_duracion->rowCount()>0) {   
		                        $duracion=$resultado_duracion->fetch(PDO::FETCH_ASSOC);
		                        $duracionfulbol=[$duracion["DURACION"],$hora];
		                        $total_duracion=sumarHoras($duracionfulbol);

		                        $sql="INSERT INTO partidos (ID_PARTIDO, ID_USUARIO, FECHA, HORA,HORA_FIN,TIPO_DE_FUTBOL,CANTIDAD_DE_JUGADORES_ACTUALES) VALUES (NULL,:id_usuario,:dia,:hora,:hora_fin,:tipo_futbol,1)";
		                        $resultado=$conn->prepare($sql);
		                        $resultado->execute(array(":id_usuario"=>$id_usuario,":dia"=>$dia,":hora"=>$hora,":hora_fin"=>$total_duracion,":tipo_futbol"=>$tipo_futbol));
	                            $idultimo=$conn->lastInsertId();
		                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos que se confirme que no hubo errores
	                                $sql_juega_partido="INSERT INTO usuarios_juegan_partidos (ID_USUARIO, ID_PARTIDO, ID_INVITADO) VALUES (:id_usuario,:partido, NULL)";
	                                $resultado_juego=$conn->prepare($sql_juega_partido);
	                                $resultado_juego->execute(array(":id_usuario"=>$id_usuario,":partido"=>$idultimo));
		                        	$resultados_de_validacion['error']='NO';
		                        }
		                					
		                		else{
		                			$resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente registrar partido";
		                		}
		                        closeConnection($conn);
	                    	}
	                    	else{
	                    		$resultados_de_validacion['error']="No se pudo traer los datos de duracion del tipo de futbol";
	                    	}
                        }

                        //
                       
                
                
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

function sumarHoras($horas) {
    $total = 0;
    foreach($horas as $h) {
        $parts = explode(":", $h);
        $total += $parts[0]*3600 + $parts[1]*60  ;        
    }   
    return gmdate("H:i:s", $total);
}


    
?>

