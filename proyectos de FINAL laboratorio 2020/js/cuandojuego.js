$(document).ready(function()
{
	$("#cuandoJuego").click(function(event) {
		traercuandoJuego($("#btnRegistrarPartido").val());
	});
});


function traercuandoJuego(idusuario){
	var parametros={"id_usuario":idusuario};
	$.ajax
	({
		data:parametros,
		url: "php/cuandoJuego.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("body").append('<div class="modal fade" id="modalCuandoJuego" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Todos estos partidos tenes para jugar:</h4></div><div class="modal-body"><div class="panel panel-default"><div class="panel-body"><div class="table-responsive"><table class="table"><thead><tr><th>Fecha</th><th>Hora de inicio</th><th>Hora de fin</th><th>Tipo de Futbol</th><th>jugadores actuales</th></tr></thead><tbody id="partidosQuevoyAJugar"><tr></tr></tbody></table></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#partidosQuevoyAJugar").empty();
				$("#modalCuandoJuego").modal("show");
				$.each(response.datos, function (){
					
					$("#partidosQuevoyAJugar").append('<tr><td>'+this.FECHA+'</td><td>'+this.HORA+'</td><td>'+this.HORA_FIN+
						'</td><td>'+this.TIPO+'</td><td>'+this.CANTIDAD_DE_JUGADORES_ACTUALES+'/'
						+this.JUGADORES_MINIMOS_REQUERIDOS+'</td></tr>');

				});
			}
			else{
				$("body").append('<div class="modal fade" id="modalCuandoJuego" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Todos estos partidos tenes para jugar:</h4></div><div class="modal-body"><div class="panel panel-default"><div class="panel-body"><div class="table-responsive"><table class="table"><thead><tr><th>Fecha</th><th>Hora de inicio</th><th>Hora de fin</th><th>Tipo de Futbol</th><th>jugadores actuales</th></tr></thead><tbody id="partidosQuevoyAJugar"><tr></tr></tbody></table></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#partidosQuevoyAJugar").empty();
				$("#modalCuandoJuego").modal("show");
				$("#partidosQuevoyAJugar").append('<tr><td colspan="5"><div class="alert alert-info"><strong>'+response.error+'</strong></div></td></tr>');

			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}



