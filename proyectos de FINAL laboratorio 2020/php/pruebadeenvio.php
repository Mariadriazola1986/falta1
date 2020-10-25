<?php 
		$para="lopezcarlosjavier25@gmail.com";
        $asunto="link de activacion de Usuario en el Sistema";
        $desde="From:"." falta1.com";
        $mensajes="presione el siguente link para activar";

        mail($para,$asunto,$mensajes,$desde);
        //header("location:../base_de_datos/aviso_de_envio.html");
        //echo "revise su mail para poder activar su cuenta";


 ?>