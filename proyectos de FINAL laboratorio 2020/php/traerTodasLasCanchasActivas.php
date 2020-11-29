<?php
	require("conexion.php");
	$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
	if($action == 'ajax'){
		include 'pagination.php'; //incluir el archivo de paginación
		//las variables de paginación
		$page = (isset($_REQUEST['page']) && !empty($_REQUEST['page']))?$_REQUEST['page']:1;
		$per_page = 10; //la cantidad de registros que desea mostrar
		$adjacents  = 4; //brecha entre páginas después de varios adyacentes
		$offset = ($page - 1) * $per_page;
		//Cuenta el número total de filas de la tabla*/
		$conn = getConnection();
		$sqlcontarfilas="SELECT count(*) as cantidad_de_canchas FROM canchas";
		$rescontarfilas=$conn->prepare($sqlcontarfilas);
		$rescontarfilas->execute();
		$regcontarfilas=$rescontarfilas->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);

		if ($row=$regcontarfilas) {
			$numrows = $row[0]['cantidad_de_canchas'];
		}
		$total_pages = ceil($numrows/$per_page);
		$reload = 'index.php';
		//consulta principal para recuperar los datos
		$conn = getConnection();
		$sqltraercanchas="SELECT canchas.ID_CANCHA,localidades.nombre,establecimientos.BARRIO,establecimientos.DIRECCION, localidades.nombre,tipos_de_futbol.TIPO FROM canchas,tipos_de_futbol,establecimientos,provincias,localidades WHERE canchas.ID_ESTABLECIMIENTO = establecimientos.ID_ESTABLECIMIENTO AND canchas.TIPO=tipos_de_futbol.ID_TIPO AND establecimientos.LOCALIDAD=localidades.id AND localidades.provincia_id=provincias.id AND canchas.ESTADO_CANCHA=1 LIMIT $offset,$per_page";
		$restraercanchas=$conn->prepare($sqltraercanchas);
		$restraercanchas->execute();
		$regtraercanchas=$restraercanchas->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);


		if ($numrows>0){
			?>


  			<div class="panel panel-default">
    			<div class="panel-body">
		    		<div class="row">
						<div class="col-md-8">
							<input class="form-control order-select form-control-lg" placeholder="Buscar Cancha..." name="title" type="text" id="canchaABuscar" >
							<p class="bg-danger oculto" id="errorDeBusquedaCancha"></p>
						</div>
						<div class="col-md-2">
							<div class="dropdown">
							  	<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"  id="btnDropDownsBuscar" value="1">Localidad
							  	<span class="caret"></span></button>
							  	<ul class="dropdown-menu">
							    	<li value="1"><a href="#canchaABuscar" id="busquedaLocalidad">Localidad</a></li>
							    	<li value="2"><a href="#canchaABuscar" id="busquedaBarrio">Barrio</li>
							    	<li value="3"><a href="#canchaABuscar" id="busquedaDireccion">Direccion</a></li>
							  	</ul>
							</div>

						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-success btn-lg" id="btnBuscar">
			      				<span class="glyphicon glyphicon-search"></span> Buscar
			    			</button>
						</div>
					</div><br>

    			</div>
  			</div>


		<h3>Todas Las Canchas</h3>
		<div class="table-responsive">
			<table class="table table-bordered">
				  <thead>
					<tr>
					  <th>Localidad</th>
					  <th>Barrio</th>
					  <th>Direccion</th>
					  <th>Tipo De Futbol</th>
					  <th>Informacion Completa</th>
					</tr>
				</thead>
				<tbody>
				<?php
				if (empty($regtraercanchas)) {
					?>
					<tr class="danger">
						<td colspan="5"><?php echo "No hay canchas disponibles";?></td>
					</tr>
					<?php
				}
				foreach ($regtraercanchas as $cancha) {
					?>
					<tr>
						<td><?php echo $cancha['nombre'];?></td>
						<td><?php echo $cancha['BARRIO'];?></td>
						<td><?php echo $cancha['DIRECCION'];?></td>
						<td><?php echo $cancha['TIPO'];?></td>
						<td><button type="button" name="btn_mas_info" class="btn btn-info" value='<?php echo $cancha['ID_CANCHA'] ?>'>Ver info completa</button></td>
					</tr>
					<?php
				}
				?>
				</tbody>
			</table>
		</div>
		<div class="table-pagination pull-right">
			<?php echo paginate($reload, $page, $total_pages, $adjacents);?>
		</div>

			<?php

		} else {
			?>
			<div class="alert alert-info alert-dismissable">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
              <h4>Aviso!!!</h4> No hay Canchas para mostrar
            </div>
			<?php
		}
	}


 ?>