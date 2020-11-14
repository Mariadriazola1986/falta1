<!DOCTYPE html>
<html lang="en">
	<?php
  		require_once("php/verificarSesion.php");
 	?>
<head>
	<title>Mis Grupos</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/micss.css">
	<link rel="stylesheet" href="css/visualizar_canchas.css">
	<script type="text/javascript" src="js/misGrupos.js"></script>
	<script type="text/javascript" src="js/busquedaGrupos.js"></script>

	

</head>
<body>


<div class="container">
	<div class="row">
        <nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
				    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
				    </button>
				    <a class="navbar-brand" href="#">falta1.com</a>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
				   
				</ul>
				<ul class="nav navbar-nav navbar-right">
				<li><a href="php/cerrarsesion.php"><span class="glyphicon glyphicon-log-out"></span>   Cerrar Sesion</a></li>
				</ul>
				</div>
			</div>
		</nav>
	</div>

	<div class="row">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<h4>Bienvenido <?php echo $_SESSION["NOMBRE"];?>.</h4>
			</div>
		</div>
	</div>
</div>












</body>
</html>