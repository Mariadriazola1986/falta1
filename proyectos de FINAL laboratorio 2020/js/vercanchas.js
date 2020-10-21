
$(document).ready(function()
{
	obtenerTipoCanchas();

});

function obtenerTipoCanchas()
{
	var parametros={"funcion":"traerLasTiposCanchas"};
	$.ajax
	({
		data: parametros,
		url: "php/traercanchas.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
				 $("#tipo").append('<option value='+this.ID_TIPO+'>'+this.TIPO+'</option>');
			});
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}
