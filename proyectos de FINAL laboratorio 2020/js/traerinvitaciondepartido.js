$(document).ready(function()
{

		misInvitaciones($("#btnRegistrarPartido").val());
});


function misInvitaciones(idusuario){
	var parametros={"id_usuario":idusuario};
	$.ajax
	({
		data:parametros,
		url: "php/verInvitacionAPartidoDelGrupo.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {	
			if (response.error=="NO") {
				$("#cantInvitaciones").text("Mis invitaciones");
				$("#cantInvitaciones").append("<span class='badge'>"+response.datos.length+"</span>");
				$("body").append('<div class="modal fade" id="hoyJuego" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Te invitaron a jugar a estos partidos:</h4></div><div class="modal-body"><div class="panel panel-default"><div class="panel-body"><div class="table-responsive"><table class="table"><thead><tr><th>Fecha</th><th>Hora de inicio</th><th>Hora de fin</th><th>Tipo de Futbol</th><th>jugadores actuales</th><th>Unirte</th></tr></thead><tbody id="partidosQueHoyJuego"><tr></tr></tbody></table></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#partidosQueHoyJuego").empty();
				
				$.each(response.datos, function (){
					
					$("#partidosQueHoyJuego").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse_a_invitacion' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>")/*'<tr class="success"><td>'+this.FECHA+'</td><td>'+this.HORA+'</td><td>'+this.HORA_FIN+
						'</td><td>'+this.TIPO+'</td><td>'+this.CANTIDAD_DE_JUGADORES_ACTUALES+'/'
						+this.JUGADORES_MINIMOS_REQUERIDOS+'</td></tr>');*/

				});

				$("#cantInvitaciones").click(function(event) {
					$("#hoyJuego").modal("show");
				});


				$("[name=boton_unirse_a_invitacion]").click(function(event) {
				unirseAPartidoInvitado($("#btnRegistrarPartido").val(),$(this).val());
    			//alert($(this).val());

    		});
			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


function unirseAPartidoInvitado(id_user,id_partido){
	var parametros={"id_usuario":id_user,"id_partido":id_partido};
	$.ajax
	({
		data: parametros,
		url: "php/unirseAPartido.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
					//$("body").append('<div id="myModal" class="modal fade in" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>')
					
					
					$("#hoyJuego").modal("hide");
					$("#agregado_al_partido_exito").modal("show");
					
					setTimeout(function(){
					  $("#agregado_al_partido_exito").modal('hide');
					}, 7000);

			}
			else{
				var message = $('<div class="alert alert-danger  alert-dismissible text-center error_message"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+response.error+'</div>');
				message.appendTo($('#UnirseAPartido')).fadeIn(300).delay(5000).fadeOut(500);
			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}
