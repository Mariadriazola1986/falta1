var GDIA = ""; //variable global del calendario.

$(document).ready(function() {
    obtenerDiaActual();
    obtenerCalendario();
    obtenerTipoFutbol();
    $("#formOrganizarPartido").submit(function(event) {
    	event.preventDefault();
    	registrarPartido($("#btnRegistrarPartido").val(),GDIA,$("#horaInicioPartidoOrganizado").val(),$("#tipoFutbol").children('option:selected').val());
    });
});

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







