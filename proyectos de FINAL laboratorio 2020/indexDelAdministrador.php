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
						<h4>Bienvenido <?php echo $_SESSION["NOMBRE"];?>.</h4>
					</div>
					<div class="panel-body">
						<!-- <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalRegistro">Registrar usuario</button> -->
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalSoli">Solicitudes de alta de cancha</button>
					</div>
				</div>
			</div>

			<!-- Aca tengo la tabla que voy a mostrar la info de los usuarios para el admin -->
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4><?php echo $_SESSION["NOMBRE"];?>, estos son los usuarios registrados en el sistema:</h4>
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
















			<!-- Mi modal de registro de usuarios -->
			<div class="modal fade" id="modalRegistroUsuario" role="dialog">
			    <div class="modal-dialog">
			    	<div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Registrar usuario</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
			          </div>
			          <div class="modal-footer">
			          	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			          </div>
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
			          </div>
			          <div class="modal-footer">
			          	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			          </div>
			        </div>
			    	</div>
				</div>
			</div>

		</div>


		<div class="modal fade" id="modalRegistro" role="dialog">
			    <div class="modal-dialog">
			    
			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">¿A quién vas a registrar¿</h4>
			        </div>
			        <div class="modal-body">
			          		<button type="button" class="btn btn-info"data-toggle="modal" data-target="#modalDeSeleccion" id="btnJugador" value="1">Jugador</button>
							<button type="button" class="btn btn-info"data-toggle="modal" data-target="#modalDeSeleccion" id="btnPropietario" value="2">Dueño de Cancha</button>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>
			      
			    </div>
			</div>

			<div class="modal fade" id="modalDeSeleccion" role="dialog">
			    <div class="modal-dialog">
			    
			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Completá el siguiente formulario para registrar al usuario deseado:</h4>
			        </div>
			        <div class="modal-body">
                        <div class="panel panel-default">
                        	<div class="panel-body">
	                            <form action="#" method="POST" id="formUsuario">
	                                <div class="form-group">
	                                    <label for="usuario" class="control-label">Usuario:</label>
	                                    <input type="text" class="form-control" id="usuario" placeholder="Ingrese su nombre de Usuario" name="usuario" required>
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
	                                    <input type="email" class="form-control" id="email" placeholder="Ingrese su Email" name="email" required>
	                                </div>

	                                <br>
	                                <div class="row">
	                                	<div class="form-group col-md-6">
	                                    	<button type="submit" class="btn btn-success" id="btnRegistrar" value="">Registrar</button>
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
			          <h4 class="modal-title">Usuario Registrado Correctamente</h4>
			        </div>
			        <div class="modal-body">
			          <h4>Se ha enviado un mail a tu casilla de correo, sigue los pasos para activar tu usuario</h4>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>
  			<div class="modal fade" id="invitadoRegistradoCorrectamente" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Te Registraste Correctamente</h4>
			        </div>
			        <div class="modal-body">
			          <h4>Se te contactara por telefono una vez confirmado el partido y la cancha.</h4>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>

  			<div class="modal fade" id="inicioSesion" role="dialog">
			    <div class="modal-dialog"> 
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Inicia Sesion</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
	                        <div class="panel-body">
	                            <form action="#" method="POST" id="formLogin">
	                                <div class="form-group">
	                                    <label for="usuarioLogin" class="control-label">Usuario:</label>
	                                    <input type="text" class="form-control" id="usuarioLogin" placeholder="Ingrese su nombre de Usuario" name="usuarioLogin" required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputPasswordLogin" class="control-label">Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputPasswordLogin" placeholder="Ingrese Contraseña" name="passwordLogin" required>
	                                </div>
	                                <br>
	                                <div class="form-group">
	                                    <button type="submit" class="btn btn-info" id="btnLogin">Login</button>
	                                </div>
	                                <div class="form-group">
	                                    <button type="button" class="btn btn-link">Olvidaste la contraseña</button>
	                                </div>
	                            </form>
	                            <p class="bg-danger" id="errorVLoginPHP"></p>
	                        </div>
                    	</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>

  			<div class="modal fade" id="anotarteAPublicacion" role="dialog">
			    <div class="modal-dialog"> 
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Completa los datos para poder unirte al partido</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
	                        <div class="panel-body">
	                            <form action="#" method="POST" id="formInvitado">
	                                <div class="form-group">
	                                    <label for="inputnombreinvitado" class="control-label">Nombre:</label>
	                                    <input type="text" class="form-control" id="inputnombreinvitado" placeholder="Ingrese su nombre" required>
	                                </div>
	                                
	                                <div class="form-group">
	                                    <label for="inputapellidoivitado" class="control-label">Apellido:</label>
	                                    <input type="text" class="form-control" id="inputapellidoinvitado" placeholder="Ingrese su apellido"required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputdniinvitado" class="control-label">DNI:</label>
	                                    <input type="number" class="form-control" id="inputdniinvitado" placeholder="Ingrese su DNI"required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputtelefonoinvitado" class="control-label">Telefono:</label>
	                                    <input type="number" class="form-control" id="inputtelefonoinvitado" placeholder="Ingrese su telefono"required>
	                                </div>
	                                <br>
	                                <div class="form-group">
	                                    <button type="submit" class="btn btn-success" id="btnregistrarinvitado">Enviar Datos</button>
	                                </div>
	             
	                            </form>
	                            <p class="bg-danger" id="errorVRegistroInvitado"></p>
	                        </div>
                    	</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>











	</body>
</html>