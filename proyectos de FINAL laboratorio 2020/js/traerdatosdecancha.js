
$(document).ready(function()
{
	$("#checkBoxDistrito").change(function() {
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
    		$("#inputDistrito").prop('required', true);
    		$("#btnBuscarCanchas").removeClass('oculto');
      		$('#distrito').toggle(1000);
    	}
    	else {
    		$("#inputDistrito").prop('required', false);
      		$('#distrito').toggle(1000);
    	}
  	});

  	$("#checkBoxDireccion").change(function() {
 
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
    		$("#inputDireccion").prop('required', true);
    		$("#btnBuscarCanchas").removeClass('oculto');
      		$('#direccion').toggle(1000);
    	}
    	else {
    		$("#inputDireccion").prop('required', false);
      		$('#direccion').toggle(1000);
    	}
  	});
  	$("#checkBoxTipoDeFutbol").change(function() {
 
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
    		$("#tipoFutbol").prop('required', true);
    		$("#btnBuscarCanchas").removeClass('oculto');
      		$('#tipodefutbol').toggle(1000);
    	}
    	else {
    		$("#tipoFutbol").prop('required', false);
      		$('#tipodefutbol').toggle(1000);
    	}
  	});


	//obtenerDatosCancha();
	
	obtenerDeTipoCanchas();

	$("#formFiltradoCancha").submit(function(event) {
		event.preventDefault();
		if ($("#checkBoxDistrito").prop('checked'))//si solo distrito esta seleccionado
		{
			
			buscarCanchas($("#inputDistrito").val(),"","",$("#idUsuario").val());
		}

		else if ($("#checkBoxDireccion").prop('checked')) {//si solo direccion esta seleccionado

			buscarCanchas("",$("#inputDireccion").val(),"",$("#idUsuario").val());
		}

		else if ($("#checkBoxTipoDeFutbol").prop('checked')) {//si solo tipo de futbol esta seleccionado

			buscarCanchas("","",$("#tipoFutbol").children('option:selected').val(),$("#idUsuario").val());
		}
		//-------------------------------------------------------------------------------------------------
		 if ($("#checkBoxDistrito").prop('checked') && $("#checkBoxDireccion").prop('checked'))//si distrito y direccion esta seleccionado
		{
			
			buscarCanchas($("#inputDistrito").val(),$("#inputDireccion").val(),"",$("#idUsuario").val());
		}
		 if ($("#checkBoxTipoDeFutbol").prop('checked') && $("#checkBoxDireccion").prop('checked'))//si tipo de futbol y direccion esta seleccionado
		{
			
			buscarCanchas("",$("#inputDireccion").val(),$("#tipoFutbol").children('option:selected').val(),$("#idUsuario").val(),$("#idUsuario").val());
		}
		if ($("#checkBoxTipoDeFutbol").prop('checked') && $("#checkBoxDistrito").prop('checked'))//si tipo de futbol y distrito esta seleccionado (Q onda aca?)
		{
			
			buscarCanchas($("#inputDistrito").val(),"",$("#tipoFutbol").children('option:selected').val(),$("#idUsuario").val(),$("#idUsuario").val());
		}
		if ($("#checkBoxTipoDeFutbol").prop('checked') && $("#checkBoxDistrito").prop('checked') && $("#checkBoxDireccion").prop('checked'))//si tipo de futbol,direccion y distrito esta seleccionado (Q onda aca tambien?)
		{
			
			buscarCanchas($("#inputDistrito").val(),$("#inputDireccion").val(),$("#tipoFutbol").children('option:selected').val(),$("#idUsuario").val(),$("#idUsuario").val());
		}

	});



});

function buscarCanchas(inputDistrito,inputDireccion,selecttipocancha,idusuario)
{
	var parametros={"distrito":inputDistrito,"direccion":inputDireccion,"selecttipocancha":selecttipocancha,"idusuario":idusuario};
	$.ajax
	({
		data: parametros,
		url: "php/buscarCanchas.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$("#canchasFiltradas").empty();
			if (response.error=="NO") {

				$("#canchasFiltradas").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-primary"><div class="panel-heading">Canchas</div><div class="panel-body"><div class="table-responsive"><table class="table table-bordered"><thead><tr><th class="success">Distrito</th><th class="success">Direccion</th><th class="success">Tipo De Futbol</th><th class="success">Informacion Completa</th></tr></thead><tbody id="lasCanchas"></tbody></table></div></div></div></div>');
				$("#lasCanchas").empty();
				$.each(response.datos, function() {
					$("#lasCanchas").append('<tr><td>'+this.DISTRITO+'</td><td>'+this.DIRECCION+'</td><td>'+this.TIPO+'</td><td><button type="button" name="btn_mas_info" class="btn btn-info" value='+this.ID_CANCHA+'>Ver info completa</button></td></tr>');

				});
			}
			else{
				var message = $('<div class="alert alert-danger  alert-dismissible text-center error_message"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+response.error+'</div>');
				message.appendTo($('#canchasFiltradas')).fadeIn(300).delay(5000).fadeOut(500);
			}
			$("[name=btn_mas_info]").click(function(event) {
				//$("#canchaResultado").removeClass("oculto");
				obtenerDatosCancha($(this).val());
    		});

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}





function obtenerDatosCancha(id_cancha)//todos los datos inclusive las imagenes
{

	var parametros={"id_cancha":id_cancha};
	$.ajax
	({
		data: parametros,
		url: "php/traerDatosCancha.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {
		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#contenedorcarrusel").empty();
				$("#contenedorcarrusel").append('<div id="carrusel" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators" id="indicadorCancha"></ol><div class="carousel-inner" id="imagenesCancha"></div><a href="#carrusel" class="left carousel-control" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a href="#carrusel" class="right carousel-control" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div>');
				var cantidad=0;
				$("#liProvincia").html("Provincia: "+response.datos[0].nombre_provincias+"");
				$("#liLocalidad").html("Localidad: "+response.datos[0].nombre+"");
				$("#liBarrio").html("Barrio: "+response.datos[0].BARRIO+"");
				$("#liDireccion").html("Direccion: "+response.datos[0].DIRECCION+"");
				$("#liTipoFutbol").html("Tipo De Futbol: "+response.datos[0].TIPO+"");
				$("#liPrecio").html("Precio por Juego: "+"$"+response.datos[0].PRECIO+"");
				$("#liTelefono").html("Telefono: "+response.datos[0].TELEFONO+"");

				$.each(response.datos, function() {
					if (cantidad==0)
					{
						$("#indicadorCancha").append('<li data-target="#carrusel" data-slide-to='+cantidad+' class="active"></li>');
						$("#imagenesCancha").append('<div class="item active"><img src="imagenes/'+this.RUTA+'" alt="'+this.RUTA+'"></div>');
					}
					else{
						$("#indicadorCancha").append('<li data-target="#carrusel" data-slide-to='+cantidad+'></li>');
						$("#imagenesCancha").append('<div class="item"><img src="imagenes/'+this.RUTA+'" alt="'+this.RUTA+'"></div>');
					}
				 	cantidad++;

				});
				$("#modalMasInfoCancha").modal("show");


			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function obtenerDeTipoCanchas()
{
	var parametros={"funcion":"traerLasTiposCanchas"};
	$.ajax
	({
		data: parametros,
		url: "php/traerTiposDeCanchas.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$.each(response.datos, function() {
				 	$("#tipoFutbol").append('<option value='+this.ID_TIPO+'>'+this.TIPO+'</option>');
				});
			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}