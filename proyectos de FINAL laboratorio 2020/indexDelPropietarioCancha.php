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
		<link rel="stylesheet" href="css/indexdelpropietario.css">
		<link rel="stylesheet" href="lib/fullcalendar.css">
		<script src="lib/jquery3.js"></script>
		<script src="lib/bootstrap3.js"></script>
		<script src="js/verificarsipropietarioregistroestablecimiento.js"></script>
		<script src="js/traertiposdecanchas.js"></script>
		<script src="js/cargarcancha.js"></script>
		<script src="js/traerdatosdecancha.js"></script>
		<title>Dueño de Canchas</title>
	</head>
	<body>
		<input type="text" name="" hidden="" id="idUsuario" value="<?php echo($_SESSION['ID_USUARIO']) ?>"><!--TENGO QUE VER COMO TOMAR LA VARIABLE EN SESION QUE NO SEA DESDE UN INPUT OCULTO pero por ahora....-->
		<input type="text" hidden="" id="nombreUsuario" value="<?php echo $_SESSION["NOMBRE"];?>"><!--lo mismo para nombre :(-->
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


			<div id="queMostrarAPropietario">

  			</div>

  			<div class="row" id="tituloCancha">
				<div class="panel panel-primary">
					<div class="panel-body">
						<ul class="nav nav-tabs col-lg-12">
							<li class="active"><a data-toggle="tab" href="#Canchas">Mis Canchas</a></li>


					  	</ul>

					</div>

				</div>
			</div>
			<div class="row" id="contenedorFiltroCancha">
				<div class="tab-content">
				<div id="Canchas" class="tab-pane fade in active">
					<div class="panel panel-primary">
			        	<div class="panel-heading">
			            <h4>Mis Canchas</h4>
			            </div>
						<div class="panel-body">
							<div class="row col-md-6">
								<h2>Busca tu cancha</h2>
								  <p>Elegi por que parametros filtrar las canchas:</p>

								    <div class="checkbox">
								      <label><input type="checkbox" value="" id="checkBoxDistrito">Distrito</label>
								    </div>
								    <div class="checkbox">
								      <label><input type="checkbox" value="" id="checkBoxDireccion">Direccion</label>
								    </div>
								    <div class="checkbox">
								      <label><input type="checkbox" value="" id="checkBoxTipoDeFutbol">Tipo De Futbol</label>
								    </div>

							</div>
							<div class="row col-md-6">
									<form action="#" id="formFiltradoCancha">
										<div class="form-group oculto" id="distrito">
											<h4><label for="inputDistrito" class="label label-info">Distrito:</label></h4>
											<input type="text" class="form-control"  id="inputDistrito" placeholder="Ingrese Distrito" >
										</div>
										<div class="form-group oculto" id="direccion">
											<h4><label for="inputDireccion" class="label label-info">Direccion de la Cancha:</label></h4>
											<input type="text" id="inputDireccion" class="form-control"  placeholder="Ingrese Direccion">
										</div>
										<div class="form-group oculto" id="tipodefutbol">
											<h4><label for="tipoFutbol" class="label label-info">Tipo de Futbol:</label></h4>
											<select class="form-control" id="tipoFutbol">

											</select>
										</div>
										<div class="form-group">
											<button type="submit" class="btn btn-info btn-block oculto" name="filtrar" id="btnBuscarCanchas" value="">Filtrar</button>
										</div>
									</form>

							</div>
						</div><br>
						<div class="row" id="canchasFiltradas">

						</div>

					</div>
				</div>

			</div>




			<div class="modal fade" id="modalMasInfoCancha" role="dialog">
			    <div class="modal-dialog">

			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Informacion de la Cancha</h4>
			        </div>
			        <div class="modal-body" >
			        	<div class="row" id="contenedorcarrusel">

			        	</div>
			        	<div class="row">
			        		<ul>
								<li id="liDistrito"></li>
								<li id="liDireccion"></li>
								<li id="liTipoFutbol"></li>
								<li id="liPrecio"></li>
								<li id="liTelefono"></li>
							</ul>
			        	</div>

                   	</div>

			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>

			    </div>
			</div>









  			<div class="modal fade" id="modalDeSeleccionEstablecimiento" role="dialog">
			    <div class="modal-dialog">

			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Selecciona el establecimiento al cual le vas a agregar una cancha</h4>
			        </div>
			        <div class="modal-body">
			        	<span class="label label-success">Tus Establecimientos</span>
                        <div class="panel panel-default">
                        	<div class="panel-body" id="todosLosEstablecimientos">

	                        </div>
                        </div>
                        <button type="button" class="btn btn-success" id="irACancha">Siguiente</button>
                   	</div>

			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>

			    </div>
			</div>



			<div class="modal fade" id="modalCargaCancha" role="dialog">
			    <div class="modal-dialog">

			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Completa los datos de la cancha</h4>
			        </div>
			        <div class="modal-body">
                        <div class="panel panel-default">
                        	<div class="panel-body">
                        		<form action="#" method="POST" id="formCargaCancha">
	                                <div class="form-group">
	                                    <label for="tipo">Tipo de Cancha:</label>
										<select class="form-control" id="tipo">

										</select>
	                                </div>
	                                <div class="form-group">
	                                    <label for="precioCancha" class="control-label">Precio de la cancha:</label>
	                                    <input type="number" class="form-control" id="precioCancha" placeholder="Ingrese Precio de la cancha" required>
	                                </div>
	                                <div class="input-group mb-3">
									  <div class="input-group-prepend">

									    <a href="#" data-toggle="tooltip" title="2 como minima y 10 como maxima">Subir imagenes de la cancha</a>
									  </div>
									  <div class="custom-file">
									    <input type="file" class="custom-file-input" id="archivos" required="" multiple data-toggle="tooltip" title="2 como minima y 10 como maxima">
									  </div>
									</div><br>

	                                    <button type="submit" class="btn btn-success" id="btnRegistrarCancha" value="">Registrar Cancha</button>


	                            </form>

	                        </div>
                        </div>

                   	</div>

			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>

			    </div>
			</div>

			<div class="modal fade" id="modalNuevoEstablecimiento" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Completa los datos del establecimiento</h4>
			        </div>
			        <div class="modal-body">
                        <div class="panel panel-default">
                        	<div class="panel-body">
                        		<form action="#" id="formularioRegistroNuevoEstablecimiento"><div class="form-group"><label for="Direccion">Direccion Del Establecimiento:</label><input type="text" class="form-control" id="Direccion" required ></div><div class="form-group"><label for="Distrito">Distrito:</label><input type="text" class="form-control" id="Distrito" placeholder="ingrese distrito y el barrio del establecimiento" required></div><div class="form-group"><label for="Telefono">Telefono:</label><input type="number" class="form-control" id="Telefono" required></div><button type="submit" class="btn btn-success">Enviar</button>
                        		</form>

	                        </div>
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