
$(document).ready(function()
{
	$("#formInvitado").submit(function(event) {
			event.preventDefault();
			registrarAInvitado($("#inputnombreinvitado").val(),$("#inputapellidoinvitado").val(),$("#inputdniinvitado").val(),$("#inputtelefonoinvitado").val(),$("#btnregistrarinvitado").val());
		});

});


function registrarAInvitado(nombre,apellido,dni,telefono,idpartido){
	var parametros={"nombre":nombre,"apellido":apellido,"dni":dni,"telefono":telefono,"idpartido":idpartido};
	$.ajax
	({
		data:parametros,
		url: "php/registrarInvitado.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$("#invitadoRegistradoCorrectamente").modal("show");
			$("#anotarteAPublicacion").modal("hide");
			//$("#formInvitado")[0].reset();
					setTimeout(function(){ 
					  $("#invitadoRegistradoCorrectamente").modal('hide');
					}, 9000);

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


