<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="lib/bootstrap3.css">
		<link rel="stylesheet" href="css/index.css">
		<script src="lib/jquery3.js"></script>
		<script src="lib/bootstrap3.js"></script>
		<script src="js/verificarsiinvitacionestaactiva.js"></script>
		<script src="js/rgistrarseenpublicacion.js"></script>
		<title>Formulario para tu amigo</title>
	</head>
	<body>
		<input id="partidoTraido" type="text" name="" value="<?php echo($_GET["link"]) ?>" class="oculto">
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
				      <a class="navbar-brand" href="index.html">falta1.com</a>
				    </div>
				    <div class="collapse navbar-collapse" id="myNavbar">
				      <ul class="nav navbar-nav">
				        <li><a href="#">Contacto</a></li>
				        <li><a href="#">Quienes Somos</a></li>
				      </ul>
				    </div>
				  </div>
				</nav>
			</div>

            <div class="row">
				<div class="panel panel-primary">
					<div class="panel-body" id="queTraer">
						
					</div>
				</div>
			</div>


		</div>
	</body>
</html>