
$(document).ready(function() {	
    $("#btnUnirseAPartido").click(function(event) {
    	$("#partidosDisponiblesAUnirse>tr").empty();
    	obtenerPartidosDisponibles($("#btnRegistrarPartido").val());    	
    });
});


function obtenerPartidosDisponibles(id_user)
{
	var parametros={"id_usuario":id_user};
	$.ajax
	({
		data: parametros,
		url: "php/traerPartidosDisponibles.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
					if (this.ID_TIPO==4 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=8 && this.CANTIDAD_DE_JUGADORES_ACTUALES<16) {
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
					else if (this.ID_TIPO==1 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=11 && this.CANTIDAD_DE_JUGADORES_ACTUALES<22) {
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
					else if (this.ID_TIPO==2 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
					else if (this.ID_TIPO==3 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=7 && this.CANTIDAD_DE_JUGADORES_ACTUALES<14) {
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
					else if (this.ID_TIPO==5 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
					else{
						$("#partidosDisponiblesAUnirse").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-danger role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:20%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' name='boton_unirse' class='btn btn-info' value="+this.ID_PARTIDO+">Unirte Al Partido</button></td></tr>");
					}
			});
			
			$("[name=boton_unirse]").click(function(event) {
				unirseAPartido($("#btnRegistrarPartido").val(),$(this).val());
    			//alert($(this).val());

    		});
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


function unirseAPartido(id_user,id_partido){
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
					$("#partidosDisponiblesAUnirse>tr").empty();
					obtenerPartidosDisponibles($("#btnRegistrarPartido").val()); 
					$("#agregado_al_partido_exito").modal("show");
					$("form")[0].reset();
					setTimeout(function(){ 
					  $("#agregado_al_partido_exito").modal('hide');
					}, 7000);

			}
			else{
				
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}