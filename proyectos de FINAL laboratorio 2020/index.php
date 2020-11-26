<!DOCTYPE html>
<html lang="en">

	<?php
	session_start();
  		if(isset($_SESSION["ID_USUARIO"])){
  			require_once("php/estaEnSesion.php");
    }
 	?>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="lib/bootstrap3.css">
		<link rel="stylesheet" href="css/index.css">
		<script src="lib/jquery3.js"></script>
		<script src="lib/bootstrap3.js"></script>
		<script src="js/altausuario.js"></script>
		<script src="js/login.js"></script>
		<script src="js/traerpublicaciones.js"></script>
		<script src="js/rgistrarseenpublicacion.js"></script>
		<script src="js/mostrarcanchasenindex.js"></script>
		<title>indice</title>
	</head>
	<body>
		<div id="contenedor_carga">
			<div id="carga"></div>
		</div>

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
				        <li><a href="#">Contacto</a></li>
				        <li><a href="#">Quienes Somos</a></li>
				      </ul>
				      <ul class="nav navbar-nav navbar-right">
				        <li> <a href="#" data-toggle="modal" data-target="#modalRegistro"><span class="glyphicon glyphicon-user"></span> Registrate</a></li>
				        <li><a href="#"data-toggle="modal" data-target="#inicioSesion" ><span class="glyphicon glyphicon-log-in"></span>   Inicia Sesion</a></li>
				      </ul>
				    </div>
				  </div>
				</nav>
			</div>

            <div class="row">
				<div class="panel panel-primary">
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-lg-offset-4">
								<h1 class="bienvenido">Bienvenido a Falta 1</h1>
							</div>
						</div>
						<div class="row">
							<div class="col-md-8 col-lg-offset-2">
								<p>En este sitio web vas a poder organizar los partidos que vos quieras con la garantía de que siempre vas a poder completar la cantidad de jugadores necesarios para jugar al partido de futbol que tanto queres,ademas vas a poder crear grupos de juegos personalizados que van a formar parte de los partidos al que sean invitados,como asi tambien vas a poder invitar a algun conocido tuyo para que para que forme parte de esta comunidad de jugadores.<br>
								Ademas si tenes una cancha la podes registrar y publicar para que los jugadores puedan verlas y reservarlas.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-body">
						<ul class="nav nav-tabs col-lg-12">
					    	<li class="active"><a data-toggle="tab" href="#publicaciones">Partidos Publicados</a></li>
					    	<li><a data-toggle="tab" href="#listadoCanchas">Canchas disponibles en nuestro sistema</a></li>
					  	</ul>

					</div>

				</div>

			</div>

			<div class="row">
				<div class="tab-content">
					<div id="publicaciones" class="tab-pane fade in active">
						<div class="panel panel-primary">
							<div class="panel-body" id="publicacionesMostradas">
							</div>
						</div>

					</div>
					<div class="tab-pane fade" id="listadoCanchas">
						
					</div>
				</div>
			</div>


			<div class="modal fade" id="modalRegistro" role="dialog">
			    <div class="modal-dialog">

			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Elegí como queres registrarte</h4>
			        </div>
			        <div class="modal-body">
			          		<button type="button" class="btn btn-info"data-toggle="modal" data-target="#modalDeSeleccion" id="btnJugador" value="1">Soy Jugador</button>
							<button type="button" class="btn btn-info"data-toggle="modal" data-target="#modalDeSeleccion" id="btnPropietario" value="2">Tengo una Cancha</button>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
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
			          <h4 class="modal-title">Completa los datos para registrarte</h4>
			        </div>
			        <div class="modal-body">
                        <div class="panel panel-default">
                        	<div class="panel-body">
	                            <form action="#" method="POST" id="formUsuario">
	                                <div class="form-group">
	                                    <label for="usuario" class="control-label">Usuario:</label>
	                                    <input type="text" class="form-control" id="usuario" placeholder="Ingrese su nombre de Usuario" name="usuario" required>
	                                    <p class="bg-danger oculto" id="errorRegistroUsuario"></p>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputPassword" class="control-label">Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputPassword" placeholder="Ingrese Contraseña" name="password" required>
	                                    <p class="bg-danger oculto" id="errorPasswordPassword1"></p>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputRepetirPassword" class="control-label">Confirmar Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputRepetirPassword" placeholder="Confirme Contraseña" name="repetirpassword" required>
	                                    <p class="bg-danger oculto" id="errorPasswordPassword2"></p>
	                                </div>
	                                <div class="form-group">
	                                    <label for="email" class="control-label">Email:</label>
	                                    <input type="email" class="form-control" id="email" placeholder="Ingrese su Email" name="email" required>
	                                    <p class="bg-danger oculto" id="errorEmail"></p>
	                                </div>

	                                <br>
	                                <div class="row">
	                                	<div class="form-group col-md-6">
	                                    	<button type="submit" class="btn btn-success" id="btnRegistrar" value="">Registrar</button>
	                                	</div>
	                                </div>
	                            </form>
	                            <p class="bg-danger oculto" id="errorVRegistroPHP"></p>
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
	                                    <p class="bg-danger oculto" id="errorLoginUsuario"></p>
	                                </div>
	                                <div class="form-group">
	                                    <label for="inputPasswordLogin" class="control-label">Contraseña:</label>
	                                    <input type="password" class="form-control" id="inputPasswordLogin" placeholder="Ingrese Contraseña" name="passwordLogin" required>
	                                    <p class="bg-danger" id="errorLoginPassword"></p>
	                                </div>
	                                <br>
	                                <div class="form-group">
	                                    <button type="submit" class="btn btn-info" id="btnLogin">Login</button>
	                                </div>
	                                <div class="form-group">
	                                    <button type="button" class="btn btn-link">Olvidaste la contraseña</button>
	                                </div>
	                            </form>
	                            <p class="bg-danger oculto" id="errorVLoginPHP"></p>
	                        </div>
                    	</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
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


  			<div id="modalMasInfoCancha" class="modal fade" role="dialog">
			  <div class="modal-dialog">


			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal">&times;</button>
			        <h4 class="modal-title">Informacion completa de la Cancha</h4>
			      </div>
			      <div class="modal-body">
			        <div class="row" id="contenedorcarrusel">

			        </div>
			        <div class="row">
			        	<ul class="list-group">
						  <li class="list-group-item" id="liProvincia"></li>
						  <li class="list-group-item" id="liLocalidad"></li>
						  <li class="list-group-item" id="liBarrio"></li>
						  <li class="list-group-item" id="liDireccion"></li>
						  <li class="list-group-item" id="liTipoFutbol"></li>
						  <li class="list-group-item" id="liPrecio"></li>
						  <li class="list-group-item" id="liTelefono"></li>


						</ul>
				    </div>
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