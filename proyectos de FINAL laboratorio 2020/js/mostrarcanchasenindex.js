
$(document).ready(function()
{
	//traeCanchasActivas();
	load(1);

});

function load(page){
		var parametros = {"action":"ajax","page":page};

		$.ajax({
			url:'php/traerTodasLasCanchasActivas.php',
			data: parametros,
			 beforeSend: function(objeto){

			},
			success:function(data){
				//alert("primerpaginador");
				$("#listadoCanchas").empty();
				$("#listadoCanchas").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-primary"><div class="panel-heading">Canchas Disponibles</div><div class="panel-body" id="canchasDisponibles"></div></div></div>');
				$("#canchasDisponibles").empty();
				$("#canchasDisponibles").append(data);
				$("[name=btn_mas_info]").click(function(event) {
					obtenerDatosCancha($(this).val());
    			});


    			$("#busquedaBarrio").click(function(event) {
    				$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");

				});
				$("#busquedaDireccion").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("#busquedaLocalidad").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});

				$("#btnBuscar").click(function(event) {
					buscarCanchas($("#btnDropDownsBuscar").val(),$("#canchaABuscar").val());
				});

			}



		})
}

function buscarCanchas(valor_filtro,dato){
	parametros={"valor":valor_filtro,"dato":dato,"action":"ajax","page":1};
	$.ajax({
			url:'php/buscarCanchas.php',
			data: parametros,
			type: "POST",
			 beforeSend: function(objeto){

			},
			success:function(data){
				$("#listadoCanchas").empty();
				$("#listadoCanchas").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-primary"><div class="panel-heading">Canchas Disponibles</div><div class="panel-body" id="canchasDisponibles"></div></div></div>');
				$("#canchasDisponibles").empty();
				$("#canchasDisponibles").append(data);
				$("[name=btn_mas_info]").click(function(event) {
					obtenerDatosCancha($(this).val());
    			});


    			$("#busquedaBarrio").click(function(event) {
    				$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");

				});
				$("#busquedaDireccion").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("#busquedaLocalidad").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});

				$("#btnBuscar").click(function(event) {
					buscarCanchas($("#btnDropDownsBuscar").val(),$("#canchaABuscar").val());
				});

			}



		})


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