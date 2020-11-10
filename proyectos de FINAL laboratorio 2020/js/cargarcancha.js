
$(document).ready(function()
{
	$("#irACancha").click(function(event) {
		$("#modalCargaCancha").modal("show");
		$("#btnRegistrarCancha").val($("input:radio[name=optradio]:checked").val());
		/* $("input:radio[name=optradio]:checked").val() */
	});
});


function traerMisEstablecimientos(idusuario){
	var parametros={"id_usuario":idusuario};
	$.ajax
	({
		data:parametros,
		url: "php/traerMisEstablecimientos.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$.each(response.datos, function (){
					$('#todosLosEstablecimientos').prepend("<div class='radio'><label><input type='radio' name='optradio' checked value='"+this.ID_ESTABLECIMIENTO+"'>"+this.DISTRITO+"</label> </div>");
				});
			}
			else{

			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function registrarEstablecimiento(idusuario,direccion,distrito,telefono){
	var parametros={"idusuario":idusuario,"direccion":direccion,"distrito":distrito,"telefono":telefono};
	$.ajax
	({
		data:parametros,
		url: "php/registrarEstablecimiento.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("body").append('<div class="modal fade" id="establecimientoRegistradoCorrectamenteEmail" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Registro Correcto</h4></div><div class="modal-body"><h4>Tu establecimiento se registro correctamente.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')
				$("#establecimientoRegistradoCorrectamenteEmail").modal("show");
				$("#queMostrarAPropietario").empty();
				estaActiva($("#idUsuario").val());
			}
			else{

			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


