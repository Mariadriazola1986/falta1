
$(document).ready(function()
{
	obtenerTipoCanchas();

});

function obtenerTipoCanchas()
{
	var parametros={"funcion":"traerLosTiposUsuarios"};
	$.ajax
	({
		data: parametros,
		url: "php/traerLosTiposUsuarios.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
				 $("#tipousuario").append('<option value='+this.ID_TIPO+'>'+this.NOMBRE_TIPO+'</option>');
			});
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}
