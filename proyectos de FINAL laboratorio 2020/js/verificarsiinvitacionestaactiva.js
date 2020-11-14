
$(document).ready(function()
{
	estaActiva($("#partidoTraido").val());
});


function estaActiva(idpartido){
	var parametros={"idpartido":idpartido};
	$.ajax
	({
		data:parametros,
		url: "php/verificarSiPartidoEstaActivo.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {

				if (response.datos=="activo") {
					$("#queTraer").append('<div class="row"><div class="col-md-6 col-lg-offset-4"><h1 class="bienvenido">ingresa tus datos</h1></div></div><div class="row"><div class="col-md-8 col-lg-offset-2"><form action="#" method="POST" id="formInvitadoEmail"><div class="form-group"><label for="inputnombreinvitado" class="control-label">Nombre:</label><input type="text" class="form-control" id="inputnombreinvitado" placeholder="Ingrese su nombre" required></div><div class="form-group"><label for="inputapellidoivitado" class="control-label">Apellido:</label><input type="text" class="form-control" id="inputapellidoinvitado" placeholder="Ingrese su apellido"required></div><div class="form-group"><label for="inputdniinvitado" class="control-label">DNI:</label><input type="number" class="form-control" id="inputdniinvitado" placeholder="Ingrese su DNI"required></div><div class="form-group"><label for="inputtelefonoinvitado" class="control-label">Telefono:</label><input type="number" class="form-control" id="inputtelefonoinvitado" placeholder="Ingrese su telefono"required></div><br><div class="form-group"><button type="submit" class="btn btn-success" id="btnregistrarinvitado" value='+idpartido+'>Enviar Datos</button></div></form></div></div>');
					$("#formInvitadoEmail").submit(function(event) {
						event.preventDefault();
						if (validarUnavezMas($("#btnregistrarinvitado").val())) {
							registrarAInvitadoEmail($("#inputnombreinvitado").val(),$("#inputapellidoinvitado").val(),$("#inputdniinvitado").val(),$("#inputtelefonoinvitado").val(),$("#btnregistrarinvitado").val());
						}
					});
				}
				else if (response.datos=="inactivo") {
					$("#queTraer").append('<div class="alert alert-danger"><strong>Uppps!</strong> El partido no esta disponible es posible que:</div><ul class="list-group"><li class="list-group-item list-group-item-danger">El partido que intentas acceder ya paso la fecha y hora establecido.</li><li class="list-group-item list-group-item-danger">El partido ya se esta jugando.</li><li class="list-group-item list-group-item-danger">Se completo el numero requerido de jugadores para este partido.</li></ul>');
				}
			}
			else{
				console.log(response.error);
			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function registrarAInvitadoEmail(nombre,apellido,dni,telefono,idpartido){
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
			$("#queTraer").remove();
			if(response.error=="NO"){
				//$("body").append('<div class="modal fade" id="invitadoRegistradoCorrectamenteEmail" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Te Registraste Correctamente</h4></div><div class="modal-body"><h4>Se te contactara por telefono una vez confirmado el partido y la cancha.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')
				modalInvitadoPorMailMensaje("Te Registraste Correctamente","Se te contactara por telefono una vez confirmado el partido y la cancha");
				$("#invitadoRegistrado").modal("show");
			}
			else {
				modalInvitadoPorMailMensaje("Error",response.error);
				$("#invitadoRegistrado").modal("show");
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function modalInvitadoPorMailMensaje(titulo,contenido){
		$("body").append('<div class="modal fade" id="invitadoRegistrado" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+titulo+'</h4></div><div class="modal-body"><h4>'+contenido+'.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')

}

function validarUnavezMas(idpartido) {
	var parametros={"idpartido":idpartido};
	var valor=true;
	$.ajax
	({
		data:parametros,
		url: "php/verificarSiPartidoEstaActivo.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		async: false, //cuando queres que primero te valide la respuesta traida desde el php y no se ejecute el resto de codigo js tenes que poner en asincronico false
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				if (response.datos=="inactivo") {
					$("#formInvitadoEmail").remove();
					$("#queTraer").append('<div class="alert alert-danger"><strong>Uppps!</strong> El partido no esta disponible es posible que:</div><ul class="list-group"><li class="list-group-item list-group-item-danger">El partido que intentas acceder ya paso la fecha y hora establecido.</li><li class="list-group-item list-group-item-danger">El partido ya se esta jugando.</li><li class="list-group-item list-group-item-danger">Se completo el numero requerido de jugadores para este partido.</li></ul>');
					valor=false;
				}
				
			}
			else{
				console.log(response.error);
			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

	return valor;
}