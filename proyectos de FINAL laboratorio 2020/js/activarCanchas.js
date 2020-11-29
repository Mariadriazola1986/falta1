$(document).ready(function(){
    obtenerCanchasInactivas();
});

function obtenerCanchasInactivas(){

	$.ajax({
		url:"php/canchasInactivas.php",
		type: "POST",
		dataType: "json",
		success: function(result){
			$("#canchasInactivas").empty();
			if (result.length>0) {

				$("#contSoli").text("Ver solicitudes de alta de cancha ");
				$("#contSoli").append("<span class='badge'>"+result.length+"</span>");
				
				$("#canchasInactivas").append("<br>");
				$("#canchasInactivas").append('<div class="table-responsive"><table class="table table-bordered"><thead><tr><th class="success">Localidad</th><th class="success">Barrio</th><th class="success">Direccion</th><th class="success">Tipo De Futbol</th><th class="success">Informacion Completa</th></tr></thead><tbody id="lasCanchas"></tbody></table></div>');
				$("#lasCanchas").empty();
				$.each(result, function() {
					$("#lasCanchas").append('<tr><td>'+this.nombre+'</td><td>'+this.BARRIO+'</td><td>'+this.DIRECCION+'</td><td>'+this.TIPO+'</td><td><button type="button" name="btn_mas_info" class="btn btn-info" value='+this.ID_CANCHA+'>Ver info completa</button></td></tr>');

				});
			}
			else{
				var message = $('<div class="alert alert-danger  alert-dismissible text-center error_message"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+response.error+'</div>');
				message.appendTo($('#canchasInactivas')).fadeIn(300).delay(5000).fadeOut(500);
			}
			obtenerDatosCancha();


		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("pincho y no se por que");
		}
	})

}

function obtenerDatosCancha()//todos los datos inclusive las imagenes
{
	$("button[name='btn_mas_info']").click(function(){

		var parametros={"id_cancha":this.value};
		$("#alta").attr("value",this.value);
		$("#baja").attr("value",this.value);
		$.ajax({
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

					$("#modalSoli").modal("show");

					darDeAlta();
					darDeBaja();

				}

			},
			error: function (xhr, status, error) {
				console.log(error);
			}
		});
	})
}

function darDeAlta(){
	$("#alta").click(function(){

		var cancha = {"id_cancha":this.value};

		$.ajax({
			url:"php/activarCanchas.php",
			data: cancha,
			type:"post",
			dataType:"text",
			success:function(result){

				$("#modalSoli").modal("hide");
				$("#cancha_actualizada").modal("show");
				obtenerCanchasInactivas();


			},
			error: function (xhr, status, error) {
				console.log(error);
			}
		})

	})
}


function darDeBaja(){
	$("#baja").click(function(){

		var cancha = {"id_cancha":this.value};

		$.ajax({
			url:"php/suspenderCancha.php",
			data: cancha,
			type:"post",
			dataType:"text",
			success:function(result){

				$("#modalSoli").modal("hide");
				$("#cancha_actualizada").modal("show");
				obtenerCanchasInactivas();


			},
			error: function (xhr, status, error) {
				console.log(error);
			}
		})

	})
}