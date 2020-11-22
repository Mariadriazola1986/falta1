<?php
require_once("php/conexion.php");
require_once("php/verificarSesion.php");
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<title>Mi Grupo2</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/micss.css">
	<link rel="stylesheet" href="css/visualizar_canchas.css">
	<script type="text/javascript" src="js/misGrupos2.js"></script>
	
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
				    <a class="navbar-brand" href="misGrupos.php"><span class="glyphicon glyphicon-arrow-left"></span> Atras</a>	
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
			
			<br>
			
			<div class="row">	
					
				<div class="panel-heading">
					


					<div id="Dimg" class="col-sm-3 col-xs-6">
					</div>
					<div id="Dnom" class="col-sm-4 col-xs-6">
						
						<a data-toggle="modal" data-target="#modalEditar" id="esAdmin">Administrar Grupo</a>
					</div>
					<div id="Dbut" class="col-sm-4">
						<br>
						<button id="abandonar" class="btn-danger btn-lg" data-toggle="modal" data-target="#modalAbandonar">Abandonar Grupo</button>
						<hr>
						<button id="agregar" class="btn-success btn-lg" data-toggle="modal" data-target="#modalAgregar">Agregar Miembros</button>
					</div>
				</div>
			</div>			



			<div class="panel-body">
				<h2>Lista de Miembros</h2>				
				
				<ul id="list" class="list-group">

				</ul>			
			</div>
		</div>
	</div>
	
</div>

  <!-- Modal -->
  <div class="modal fade" id="modalEditar" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modificar Grupo</h4>
        </div>
        <div class="modal-body">          
        	<div class="panel panel-default">
	            <div id="panelModificar" class="panel-body">
	                <form action="#" method="POST" id="modificar">
	                    <div class="form-group">
	                        <label for="nombreGrupo" class="control-label">Nombre:</label>
	                        <input type="text" class="form-control" id="nombreGrupo" placeholder="Ingrese nombre de Grupo" name="nombreGrupo" required>
	                    </div>
	                    <div class="form-group">
	                        <label for="fotoG" class="control-label">Foto de grupo</label><br>
        					<input class="form-control" type="file" name="fotoG" id="fotoG" required>
	                    </div>
	                    <br>        
	                    <div class="row">
	                        <div class="form-group col-md-6">
	                            <button type="submit" class="btn btn-success" id="btnModificar" value="">Guardar modificaciones</button>
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




  <!-- Modal -->
  <div class="modal fade" id="modalAbandonar" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Esta seguro de que desea abandonar el grupo?</h4>
        </div>
        <div class="modal-body">
            <button type="button" class="btn btn-success">SI</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">NO</button>
        </div>
      </div>
      
    </div>
  </div>




  <!-- Modal -->
  <div class="modal fade" id="modalAgregar" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Buscar jugadores para agregar</h4>
        </div>
        <div class="modal-body">

        	<form>
        		<div class="form-group">
        			<label for="buscador" class="control-label">Ingrese nombre de jugador</label>
        			<input type="text" class="form-control" id="buscador" name="buscador">
        			<br>
        			<button type="button" id="botonazo">Buscar:</button>
        		</div>
        	</form>

        	<div id="noEncontro" class="alert alert-danger">
  				No se encontraron jugadores con el nombre buscado.
			</div>

        	<ul id="listAgregar" class="list-group">

        	</ul>
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>




			<div class="modal fade" id="modificacion_echa" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Modificar Grupo</h4>
			        </div>
			        <div class="modal-body">
			        	<div class="alert alert-success">
  							<strong>El grupo a sido modificado exitosamente</strong>
						</div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" id="cargarGrupos" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div>
			      
			    </div>
  			</div>






			<div class="modal fade" id="invitacion_enviada" role="dialog">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        
			        <div class="modal-body">
			        	<div class="alert alert-success">
  							<strong>Se ah invitado al grupo correctamente</strong>
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

