<!DOCTYPE html>
<html lang="en">
	<!-- Verifico si la sesion esta iniciada -->
	<?php
  		require_once("php/verificarSesion.php");
 	?>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="lib/bootstrap3.css">
		<link rel="stylesheet" href="css/index.css">
		<script src="lib/jquery3.js"></script>
		<script src="lib/bootstrap3.js"></script>
		<script src="js/mostrarUsuarios.js"></script>
		<title>Administracion</title>
	</head>

	<body>
		<div id="contenedor_carga_jugador">
			<div id="carga_jugador"></div>
		</div>
		
		<!-- Container em el que voy a laburar con los datos que tengo que mostrar en la pagina --> 
		<div class="container">
			<!-- Aca vamos con el nav -->
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

			<!-- Muestro el mensaje de bienvenida para el admin logueado y los botones para registrar un usuario y ver las solicitudes de alta de cancha (ambos botones mostraran la informacion a traves de un modal) -->
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Bienvenido <?php echo $_SESSION["NOMBRE"];?>. Desde aquí, podras gestionar a los usuarios registrados en el sistema y tambien el alta de las canchas</h4>
					</div>
					<!-- <div class="panel-body">
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalRegistro">Registrar usuario</button>
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalSoli">Ver solicitudes de alta de cancha</button>
					</div> -->
				</div>
			</div>

			<!-- Aca tengo la tabla que voy a mostrar la info de los usuarios para el admin -->
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Usuarios registrados en el sistema:</h4>
					</div>
					<div class="panel-body" >
						<div class="table-responsive">          
							  <table class="table">
							    <thead>
							      <tr>
							        <th>Usuario</th>
							        <th>Email</th>
							        <th>Rol</th>
							        <th>Estado del usuario</th>
							        <th>¿Que accion tomará?</th>
							      </tr>
							    </thead>
							    <tbody id="tablaUsuariosRegistrados">
							    	
							    </tbody>
							  </table>
						</div>
					</div>
				</div>
			</div>








			<!-- Mi modal de las solicitudes de alta de cancha -->
			<div class="modal fade" id="modalSoli" role="dialog">
			    <div class="modal-dialog">
			    	<div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Solicitudes de alta de cancha</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
			          	<h5>Aun no se me ocurre como hacer esta parte :(</h5>
			          </div>
			          <div class="modal-footer">
			          	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			          </div>
			        </div>
			    	</div>
				</div>
			</div>



			<div class="modal fade" id="modalModificarUsuario" role="dialog">
			    <div class="modal-dialog">
			    
			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Completá el siguiente formulario para modificar al usuario seleccionado:</h4>
			        </div>
			        <div class="modal-body">
                        <div class="panel panel-default">
                        	<div class="panel-body">
	                            <form action="#" method="POST" id="formUsuario">
	                                <div class="form-group">
	                                    <label for="usuario" class="control-label">Usuario:</label>
	                                    <input type="text" class="form-control" id="usuario" name="usuario" required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputPassword" class="control-label">Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputPassword" placeholder="Ingrese Contraseña" name="password" required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputRepetirPassword" class="control-label">Confirmar Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputRepetirPassword" placeholder="Confirme Contraseña" name="repetirpassword" required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="email" class="control-label">Email:</label>
	                                    <input type="email" class="form-control" id="email" name="email" required>
	                                </div>

	                                <br>
	                                <div class="row">
	                                	<div class="form-group col-md-6">
	                                    	<button type="submit" class="btn btn-success" id="btnActualizar" value="">Actualizar info</button>
	                                	</div>
	                                </div>
	                            </form>
	                            <p class="bg-danger" id="errorVRegistroPHP"></p>
	                        </div>
                        </div>
                   	</div>                    
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>
			      
			    </div>
			</div>

			<div class="modal fade" id="actualizacion_correcta" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Usuario Modificado Correctamente</h4>
			        </div>
			        <div class="modal-body">
			          <h4>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhh funcionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h4>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>


		</div>
	</body>
</html>