
$(document).ready(function()	
{
	
	$("#formInvitacionAAmigo").submit(function(event) {
		event.preventDefault();
		enviarEmailAMiAmigo( $("#btnEnviarEmailAAmigo").val(),$("#emaideamigo").val(),$("#seleccionoAmigo").val(),$("#districtoBarrio").val());

	});

});

function enviarEmailAMiAmigo(id_partido,email,nombre,districtoybarrio)
{
	var parametros={"id_partido":id_partido,"email":email,"nombre":nombre,"districtoybarrio":districtoybarrio};
	$.ajax
	({
		data: parametros,
		url: "php/enviarInvitacion.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {
			$("#contenedor_carga_jugador").addClass('contenedor_carga');
			$("#carga_jugador").addClass('carga');
		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#contenedor_carga_jugador").removeClass('contenedor_carga');
					$("#carga_jugador").removeClass('carga');
				$("body").append('<div class="modal fade" id="invitacioncorrecta" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Envio Correcto de email</h4></div><div class="modal-body"><h4>Se envio el email de invitacion a tu amigo correctamente</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#invitacioncorrecta").modal("show");
					$("#formInvitacionAAmigo")[0].reset();
					setTimeout(function(){ 
					  $("#invitacioncorrecta").modal('hide');
					}, 9000);
					
			}
			else{
				$("#contenedor_carga_jugador").removeClass('contenedor_carga');
				$("#carga_jugador").removeClass('carga');
				
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}
