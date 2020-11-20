
$(document).ready(function()
{
	traeCanchasActivas();

});

function traeCanchasActivas()
{
	$.ajax
	({

		url: "php/traerTodasLasCanchasActivas.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$("#listadoCanchas").empty();
			if (response.error=="NO") {

				$("#listadoCanchas").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-primary"><div class="panel-heading">Canchas</div><div class="panel-body"><div class="table-responsive"><table class="table table-bordered"><thead><tr><th class="success">Distrito</th><th class="success">Direccion</th><th class="success">Informacion Completa</th></tr></thead><tbody id="lasCanchas"></tbody></table></div></div></div></div>');
				$("#lasCanchas").empty();
				$.each(response.datos, function() {
					$("#lasCanchas").append('<tr><td>'+this.DISTRITO+'</td><td>'+this.DIRECCION+'</td><td><button type="button" name="btn_mas_info" class="btn btn-info" value='+this.ID_CANCHA+'>Ver info completa</button></td></tr>');

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
				$("#liDistrito").html("Distrito: "+response.datos[0].DISTRITO+"");
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