<!DOCTYPE html>
<html lang="en">
	<?php 
  		require_once("php/verificarSesion.php");
 	?>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="lib/bootstrap3.css">
		<link rel="stylesheet" href="css/index.css">
		<link rel="stylesheet" href="lib/fullcalendar.css">
		<script src="lib/jquery3.js"></script>
		<script src="lib/bootstrap3.js"></script>
		<script src="lib/moment.js"></script>
        <script src="lib/fullcalendar.js"></script>
		<script src="lib/es.js"></script>
		<script src="js/organizarpartido.js"></script>
		<title>Dueño de Canchas</title>
	</head>
	<body>

        <div class="container">
            <div class="row">
				<nav class="navbar navbar-default">
					<h4 class="col-md-10">Hola Propietario de cancha <?php echo $_SESSION["NOMBRE"];?> que vas a hacer?</h4>
					<a href="php/cerrarsesion.php"><button type="button" class="btn btn-warning col-md-2">Cerrar Sesion</button></a>
				</nav>
			</div>

            <div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Elegi la opcion que vos quieras:</h4>
					</div>
					<div class="panel-body">
						<button type="button" class="btn btn-default">Registra una nueva Cancha</button>
						<button type="button" class="btn btn-default">Ver mis Canchas</button>
						<button type="button" class="btn btn-default">Administrar Reservas</button>
					</div>
				</div>
			</div>		
  			<div class="modal fade" id="MRegistroCorrectoCancha" role="dialog">
			    <div class="modal-dialog">
				      <div class="modal-content">
				        <div class="modal-header">
				          <button type="button" class="close" data-dismiss="modal">&times;</button>
				          <h4 class="modal-title">Registro Correcto de la Cancha</h4>
				        </div>
				        <div class="modal-body">
				          
		                        <h4>La Cancha fue Guardada Correctamente</h4>
		                        
				        </div>
				        <div class="modal-footer">
				          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        </div>
				      </div>

			    </div>
  			</div>



		</div>
	</body>
</html>