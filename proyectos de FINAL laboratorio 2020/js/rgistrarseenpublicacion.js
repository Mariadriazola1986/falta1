
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
			if (response.error=="NO") {
				$("#invitadoRegistradoCorrectamente").modal("show");
				$("#anotarteAPublicacion").modal("hide");
				//$("#formInvitado")[0].reset();
					setTimeout(function(){ 
					  $("#invitadoRegistradoCorrectamente").modal('hide');
					}, 9000);
			}
			else{
				$("body").append('<div id="ModalErrorRegistroPublicacion" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Error</h4></div><div class="modal-body"><p>'+response.error+'.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#ModalErrorRegistroPublicacion").modal("show");
				$("#anotarteAPublicacion").modal("hide");
				setTimeout(function(){ 
					  $("#ModalErrorRegistroPublicacion").modal('hide');
					}, 9000);
			}
			

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


