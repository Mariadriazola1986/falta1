<?php

    require_once("conexion.php");
    $resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
    if(isset($_POST["comentarios"]) && isset($_POST["id_partido"]))
    {
        
        if (!empty($_POST["comentarios"])&&!empty($_POST["id_partido"])) {

                        $comentarios=$_POST["comentarios"];
                        $id_partido=$_POST["id_partido"];
                        $conn = getConnection();
                        $sql_partido="INSERT INTO publicaciones(ID_PUBLICACION,ID_PARTIDO,COMENTARIOS)VALUES (NULL,:idpartido,:comentarios)";
                        $resultado_partido=$conn->prepare($sql_partido);
                        $resultado_partido->execute(array(":idpartido"=>$id_partido,":comentarios"=>$comentarios));
                        if ($resultado_partido->rowCount()>0) {
                            $resultados_de_validacion['error']='NO';
	                        closeConnection($conn);
                    	}
                    	else{
                    		$resultados_de_validacion['error']="No se pudo guardar la publicacion del partido";
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

