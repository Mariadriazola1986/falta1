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
				    <a class="navbar-brand" href="indexDelJugador.php"><span class="glyphicon glyphicon-arrow-left"></span> Atras</a>
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
				<h4>Jugador <?php echo $_SESSION["NOMBRE"];?> Elegi la opcion que vos quieras:</h4>
			</div>
			<div class="panel-body">
				<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalBusqueda">Busqueda De grupos</button>
				<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalCrear">Crear Grupo</button>
				<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalSoli" id="cantSol">Solicitudes </button>
			</div>
		</div>
	</div>


	<div class="row">

	<div class="panel panel-primary">
        <div class="panel-heading">
        	<h4>Mis Grupos</h4>
        </div>
        <div class="panel-body">
        	
        		<div id="nohay" class="alert alert-info">
  					<strong>Actualmente no se encuentra en ningún grupo</strong> 
				</div>
        		<div class="table-responsive">
        			
        			<table id="latabla" class="table table-hover">
						<thead>
							<th>Imagen</th>
							<th>Nombre</th>
							<th>Cantidad de miembros</th>
							<th></th>
						</thead>
						<tbody id="tablaG">
						</tbody>
					</table>
					
        		</div>
        	
        </div>
    </div>

	</div>

</div>




			<div class="modal fade" id="grupo_creado" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Creando Grupo</h4>
			        </div>
			        <div class="modal-body">
			        	<div class="alert alert-success">
  							<strong>El grupo a sido creado exitosamente</strong>
						</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>








  <!-- Modal -->
  <div class="modal fade" id="modalSoli" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Solicitudes</h4>
        </div>
        <div class="modal-body">
        	<div id="sol" class="container">
        		
        	</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>










  <!-- Modal -->
  <div class="modal fade" id="modalBusqueda" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Buscar Grupos</h4>
        </div>
        <div class="modal-body">
        	<div class="container-fluid">
				<div class="row">
					<div class="panel panel-default">
						<div class="panel-body">
						<form method="get">
							<label for="nombre">Nombre:</label>
							<input class="finput" type="text" name="nombre" id="nombre">
							<button type="button" id="bus">Buscar</button>
						</form>
						<h1 id="sinGrupos">No se encontro Resultado</h1>
					<br>
					<br>
					<table>
						<thead>
							<tr>
								<th>Imagen</th>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th></th>
							</tr>
						</thead>
						<tbody id="Tablabuscada">
							
						</tbody>
					</table>
					<br>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>










  			<div class="modal fade" id="modalCrear" role="dialog">
			    <div class="modal-dialog">		      
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Crear Grupo</h4>
			        </div>
			        <div class="modal-body">
			          <div class="panel panel-default">
	                        <div class="panel-body">
	                            <form action="#" method="POST" id="crearGrupo">
	                                <div class="form-group">
	                                    <label for="nombreGrupo" class="control-label">Nombre:</label>
	                                    <input type="text" class="form-control" id="nombreGrupo" placeholder="Ingrese nombre de Grupo" name="nombreGrupo" required>
	                                </div>
	                                <div class="form-group">
	                                    <label for="fotoG" class="control-label">Foto de grupo</label><br>
        								<input class="form-control" type="file" name="fotoG" id="fotoG" required>
	                                </div>
	                                <br>
	                            
	                                <br>
	                                <div class="row">
	                                	<div class="form-group col-md-6">
	                                    	<button type="submit" class="btn btn-success" id="btnCrear" value="">Crear Grupo</button>
	                                	</div>
	                                </div>


	                            </form>
	                            <span class="label label-danger" id="errorVLoginPHP"></span>
	                        </div>
                    	</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>		      
			    </div>
  			</div>



			<div class="modal fade" id="union_exitosa" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Unido a grupo</h4>
			        </div>
			        <div class="modal-body">
			        	<div class="alert alert-success">
  							<strong>Te has unido al grupo exitosamente</strong>
						</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" id="cargarGrupos" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>











</body>
</html>