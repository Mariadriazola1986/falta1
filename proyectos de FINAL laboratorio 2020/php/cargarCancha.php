<?php
    require_once("conexion.php");
    $resultados_de_validacion = array( "error" =>"NO",
                        'datos' => array());
   //var_dump($_FILES);
    //var_dump($_POST);
    //echo count($_FILES);
    $ruta = '../imagenes/'; //Decalaramos una variable con la ruta en donde almacenaremos los archivos
    $mensage = '';//Declaramos una variable mensaje quue almacenara el resultado de las operaciones.
    $sepuedeCargarDatos=array();//array de booleanos
    $imagenesCargadasalservidor=array();//array de nombres
    
    if (count($_FILES)<=10 && count($_FILES)>1){
	    foreach ($_FILES as $key) //Iteramos el arreglo de archivos
	    {
	        if($key['error'] == UPLOAD_ERR_OK )//Si el archivo se paso correctamente continuamos 
	            {
	                //echo  $key["type"];
	                if ($key["size"]<4000000)//si la imagen es menor a 4 mb 
	                {
	                    if ($key["type"]=="image/jpeg"||$key["type"]=="image/jpg"||$key["type"]=="image/png") {
	                        $NombreOriginal = $key['name'];//Obtenemos el nombre original del archivo
	                        $temporal = $key['tmp_name']; //Obtenemos la ruta Original del archivo
	                        $Destino = $ruta.$NombreOriginal;   //Creamos una ruta de destino con la variable ruta y el nombre original del archivo
	                        move_uploaded_file($temporal, $Destino); //Movemos el archivo temporal a la ruta especificada 
	                        array_push($imagenesCargadasalservidor,$NombreOriginal);
	                        array_push($sepuedeCargarDatos,true);//si todo va bien cargo los datos booleanos de acuerdo a cada imagen
	                     }

	                     else{
	                        array_push($sepuedeCargarDatos,false);//si va mal agrego un false al array
	                     }
	                }
	                   
	                else{
	                    array_push($sepuedeCargarDatos,false);//si va mal agrego un false al array
	                }
	                   
	            }
	        
	    }
	}
	else{
		$resultados_de_validacion["error"]="La cantidad de imagenes requeridas debe ser mayor que 1 y menor o igual a 10.";
		array_push($sepuedeCargarDatos,false);
	}






    if (estaTodoOk($sepuedeCargarDatos)) {
        $conn = getConnection();
                        $sql="INSERT INTO canchas (ID_CANCHA,ID_ESTABLECIMIENTO,TIPO,PRECIO,ESTADO_CANCHA) VALUES (NULL,:idestablecimiento,:tipo,:precio, 0)";
                        $resultado=$conn->prepare($sql);
                        $resultado->execute(array(":idestablecimiento"=>$_POST["idestablecimiento"],":tipo"=>$_POST["tipo"],":precio"=>$_POST["precio"]));
                        $idultimo=$conn->lastInsertId();
                        if ($resultado->rowCount()>0) {//si si se pudo ingresar los datos
                            //$resultados_de_validacion['error']="NO";
                            foreach ($imagenesCargadasalservidor as $nombre) {                           
                                $sqlimagenes="INSERT INTO imagenes (ID_IMAGEN,ID_CANCHA,RUTA) VALUES (NULL,:idcancha,:ruta)";
                                $resultadoimagenes=$conn->prepare($sqlimagenes);
                                $resultadoimagenes->execute(array(":idcancha"=>$idultimo,":ruta"=>$nombre));
                            }
                        }               
                        else{
                            $resultados_de_validacion['error']="Los datos no fueron cargados por favor presione nuevamente enviar";
                        }
                        closeConnection($conn);
    }
    else{
    	$resultados_de_validacion["error"]="El formato o peso de la imagen no es la correcta.";
    }
   
function estaTodoOk($unArray){
	$resultado=true;
	foreach ($unArray as $value) {
		if ($value==false) {
			$resultado=false;
		}
	}
	return $resultado;

}
echo(json_encode($resultados_de_validacion));
?>

