<!DOCTYPE html>
<html lang="en">
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
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#organizarPartido">Organizar Partido</button>
						<button type="button" class="btn btn-default">Buscar Grupo</button>
						<button type="button" class="btn btn-default">Crear Grupo</button>
						<button type="button" class="btn btn-default">Mis Grupos</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Mis partidos:</h4>
					</div>
					<div class="panel-body">
						
					</div>
				</div>
			</div>
			<div class="modal fade" id="organizarPartido" role="dialog">
			    <div class="modal-dialog">


			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Organiza un Partido</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
	                        <div class="panel-body">
	                        	<form action="#" method="POST" id="formOrganizarPartido">
										<h4> <label for="CalendarioWeb" class="label label-info">Selecciona el Dia:</label></h4>

										<div id="CalendarioWeb"></div>
										<div class="form-group">
	                                    	<h4>
	                                    		<label for="tipoFutbol" class="label label-info">
	                                    	Selecciona el tipo de Futbol:</label>
	                                    	</h4>
	                                    	<select class="form-control" id="tipoFutbol">
											    
											</select>
	                                	</div>
	                                	<div class="form-group">
	                                    	<h4><label for="horaInicioPartidoOrganizado" class="label label-info">Selecciona la hora de inicio:</label></h4>
	                                    	<input type="time" class="form-control" id="horaInicioPartidoOrganizado" name="horaInicioPartidoOrganizado" required>
	                                	</div>
	                                	<button type="submit" class="btn btn-success" id="btnRegistrarPartido" value="<?php echo($_SESSION['ID_USUARIO']) ?>">Registrar Partido</button>
								</form>
	                        </div>
                    	</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>

			    </div>
  			</div>

  			<div class="modal fade" id="MRegistroCorrectoPartido" role="dialog">
			    <div class="modal-dialog">
				      <div class="modal-content">
				        <div class="modal-header">
				          <button type="button" class="close" data-dismiss="modal">&times;</button>
				          <h4 class="modal-title">Registro Correcto del Partido</h4>
				        </div>
				        <div class="modal-body">
				          
		                        <h4>El Partido fue Guardado Correctamente</h4>
		                        
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