var GDIA = ""; //variable global del calendario.

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('input,select').click(function(event) {
		limpiarAdvertencia();
	});
    obtenerDiaActual();
    obtenerCalendario();
    obtenerTipoFutbol();
    obtenerMisPartidos($("#btnRegistrarPartido").val());
    $("#formOrganizarPartido").submit(function(event) {
    	//alert(GDIA);
    	event.preventDefault();
    	if (validarSiFechaNoEsPasada()) {
    		registrarPartido($("#btnRegistrarPartido").val(),GDIA,$("#horaInicioPartidoOrganizado").val(),$("#tipoFutbol").children('option:selected').val());
    	}
    });
});



function obtenerMisPartidos(id_user){
	var parametros={"id_usuario":id_user};
	$.ajax
	({
		data: parametros,
		url: "php/traerMisPartidos.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function(){

					if (this.ID_TIPO==4 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=8 && this.CANTIDAD_DE_JUGADORES_ACTUALES<16) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info'value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==4 && this.CANTIDAD_DE_JUGADORES_ACTUALES==16) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success'value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==1 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=11 && this.CANTIDAD_DE_JUGADORES_ACTUALES<22) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==1 && this.CANTIDAD_DE_JUGADORES_ACTUALES==22){
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==2 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==2 && this.CANTIDAD_DE_JUGADORES_ACTUALES==10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==3 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=7 && this.CANTIDAD_DE_JUGADORES_ACTUALES<14) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==3 && this.CANTIDAD_DE_JUGADORES_ACTUALES==14) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==5 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==5 && this.CANTIDAD_DE_JUGADORES_ACTUALES==10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else{
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-danger role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:20%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					
				});

				$("[name=boton_publicar]").click(function(event) {
						$("#btnFormModalPublicar").val($(this).val());
    					$("#PublicarPartido").modal("show");
    					$("#formPublicarPartido").submit(function(event) {
    						event.preventDefault();
    						PublicarMiPartido($("#btnFormModalPublicar").val(),$("#commedetalles").val());
    						
    					});

    				});
				$("[name=boton_invitar]").click(function(event) {
						var id=($(this).val());
    					$("#MAquienVasAInvitar").modal("show");
    					$("#seleccionoAmigo").click(function(event) {
    						$("#MenviarAAmigo").modal("show");
    						$("#btnEnviarEmailAAmigo").val(id);
    					});
    					/*$("#formPublicarPartido").submit(function(event) {
    						event.preventDefault();
    						PublicarMiPartido($("#btnFormModalPublicar").val(),$("#commedetalles").val());
    						
    					});*/

    				});

		}
			,
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function PublicarMiPartido(idpartido,comentarios){
	parametros={"id_partido":idpartido,"comentarios":comentarios};
	$.ajax
	({
		data: parametros,
		url: "php/PublicarMiPartido.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#PublicarPartido").modal("hide");
				$("#formPublicarPartido")[0].reset();
				$("#PublicacionExitosa").modal("show");
				setTimeout(function(){
					  $("#PublicacionExitosa").modal('hide');
					}, 2000);
				$("#misPartidos>tr").empty();
				obtenerMisPartidos($("#btnRegistrarPartido").val());
			}
						
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

}




function validarSiFechaNoEsPasada(){
	var fechahoy=new Date();//fecha de hoy
	var fechaingresada=GDIA;
	var fechaingresadasplit=fechaingresada.split("-")//spliteo la fecha string con el -
	var fechaingresadaobjeto=new Date();//creo un objeto date
	fechaingresadaobjeto.setFullYear(fechaingresadasplit[0],fechaingresadasplit[1]-1,fechaingresadasplit[2]);//no olvidar restar 1 al mes para poder comparar
	// agregar los datos spliteados al objeto fecha.


	var expresion = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
	var resultado=expresion.test(fechaingresada);
	if (!estaVacio(fechaingresada)) {
		mostrarError($("#errorDeFechaseleccionada"),"La fecha no debe quedar vacia");
		return false;

	}
	else if (fechaingresadaobjeto<=fechahoy) //se compara dos objetos de tipo Date
	{
		mostrarError($("#errorDeFechaseleccionada"),"La fecha del partido debe ser superior a la de hoy");
		return false;
	}

	else if (!resultado) {
		mostrarError($("#errorDeFechaseleccionada"),"La sintaxis de la fecha es incorrecta");
		return false;
	}
	else {
		return true;
	}
}


function registrarPartido(id_user,date,time,futbol_type){
	var parametros={"id_usuario":id_user,"dia":date,"hora":time,"tipo_de_futbol":futbol_type};
	$.ajax
	({
		data: parametros,
		url: "php/registrarPartido.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#formOrganizarPartido")[0].reset();
				$("#MRegistroCorrectoPartido").modal("show");
				setTimeout(function(){
					  $("#MRegistroCorrectoPartido").modal('hide');
					}, 2000);
				$("#misPartidos>tr").empty();
				obtenerMisPartidos($("#btnRegistrarPartido").val());
			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

}

function obtenerDiaActual()
{
	var date = new Date();
	GDIA = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function obtenerCalendario()
{
	$("#CalendarioWeb").fullCalendar
	({
		dayClick:function (dia,jsEvent,view)
		{
			limpiarAdvertencia();
			GDIA=dia.format();
			$("td").removeClass('diaseleccionado');//agregar estilos a los dias cuando se seleccionan
			$(this).addClass('diaseleccionado');
		}
	});
}

function obtenerTipoFutbol()
{
	var parametros={"funcion":"traerLasTiposDeFutbol"};
	$.ajax
	({
		data: parametros,
		url: "php/traerTiposDeFutbol.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
				 $("#tipoFutbol").append('<option value='+this.ID_TIPO+'>'+this.TIPO+'</option>');
			});
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}





function estaVacio(valor){
	var expresion=/\S+/g;//expresion que da false cuando solo hay espacios inclusive si apretas muchas vece la barra espaciadora.
	resultado=expresion.test(valor);
	return resultado;
} 

function mostrarError(idspan,msje){
	var errores=idspan;
	errores.removeClass("oculto");
	errores.html(msje);

}
function limpiarAdvertencia () {
	var errores=[$("#errorDeFechaseleccionada"),$("#errorDeHoraseleccionada"),$("#errorDeFutbolseleccionado")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});
	
}