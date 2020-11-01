var GDIA = ""; //variable global del calendario.

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('input,select').click(function(event) {
		limpiarAdvertencia();
	});
    obtenerDiaActual();
    obtenerCalendario();
    obtenerTipoFutbol();
    $("#formOrganizarPartido").submit(function(event) {
    	//alert(GDIA);
    	event.preventDefault();
    	if (validarSiFechaNoEsPasada()) {
    		registrarPartido($("#btnRegistrarPartido").val(),GDIA,$("#horaInicioPartidoOrganizado").val(),$("#tipoFutbol").children('option:selected').val());
    	}
    });
});

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