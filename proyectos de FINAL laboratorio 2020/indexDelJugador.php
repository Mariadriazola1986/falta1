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
		<title>Jugador</title>
	</head>
	<body>

        <div class="container">
        	<?php
    
		    session_start();
		    $usuario=$_SESSION["NOMBRE"];
		    //echo $usuario;
		    if (!isset($_SESSION['NOMBRE']) and !isset($_SESSION["ID_USUARIO"])) {
		    	header('Location:index.html');
		    	exit();
		    }
		?>
            <div class="row">
				<nav class="navbar navbar-default">
					<h4 class="col-md-10">Hola jugador <?php echo $usuario;?> que vas a hacer?</h4>
					<a href="php/cerrarsesion.php"><button type="button" class="btn btn-warning col-md-2">Cerrar Sesion</button></a>
				</nav>				
			</div>

            <div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Elegi la opcion que vos quieras:</h4>
					</div>
					<div class="panel-body">
						<button type="button" class="btn btn-default">Unirse a Partido</button>
						<button type="button" class="btn btn-default">Organizar Partido</button>
						<button type="button" class="btn btn-default">Buscar Grupo</button>
						<button type="button" class="btn btn-default">Crear Grupo</button>
						<button type="button" class="btn btn-default">Mis Partidos</button>
						<button type="button" class="btn btn-default">Mis Grupos</button>
					</div>
				</div>
			</div>

		</div>
	</body>
</html>