
$(document).ready(function()	
{	
	$("#checkBoxDistrito").change(function() {
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
      		$('#distrito').toggle(1000);
    	}
    	else {
      		$('#distrito').toggle(1000);
    	}
  	});

  	$("#checkBoxDireccion").change(function() {
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
      		$('#direccion').toggle(1000);
    	}
    	else {
      		$('#direccion').toggle(1000);
    	}
  	});
  	$("#checkBoxTipoDeFutbol").change(function() {
    //Si el checkbox está seleccionado
    	if($(this).is(":checked")) {
      		$('#tipodefutbol').toggle(1000);
    	}
    	else {
      		$('#tipodefutbol').toggle(1000);
    	}
  	});


	obtenerDatosCancha();
	obtenerDeTipoCanchas();

});

function obtenerDatosCancha()//todos los datos inclusive las imagenes
{
	var parametros={"id_cancha":3};
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
				var cantidad=0;
				$("#liDistrito").html("Distrito: "+response.datos[0].DISTRITO+"");
				$("#liDireccion").html("Direccion: "+response.datos[0].DIRECCION+"");
				$("#liTipoFutbol").html("Tipo De Futbol: "+response.datos[0].TIPO+"");
				$("#liPrecio").html("Precio por Juego: "+response.datos[0].PRECIO+"");
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