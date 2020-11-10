
$(document).ready(function()
{
	estaActiva($("#idUsuario").val());
});


function estaActiva(idusuario){
	var parametros={"idusuario":idusuario};
	$.ajax
	({
		data:parametros,
		url: "php/verificarSiUsuarioRegistroEstablecimiento.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {

				if (response.datos=="ok") {
					$("#queMostrarAPropietario").append('<div class="row"><div class="panel panel-primary"><div class="panel-heading"><h4>Hola '+$("#nombreUsuario").val()+' aca podes elegir que hacer con tu cancha y las reservas de las mismas:</h4></div><div class="panel-body"><button type="button" class="btn btn-default" id="registrarCancha">Registra una nueva Cancha</button><button type="button" class="btn btn-default" id="verCanchas">Ver mis Canchas</button><button type="button" class="btn btn-default" id="administrarReservas">Administrar Reservas</button><button type="button" class="btn btn-default" id="registrarOtroestablecimiento">Registrar Otro Establecimiento</button></div></div></div>');
					$("#registrarCancha").click(function(event) {
						$("#modalDeSeleccionEstablecimiento").modal("show");
						$('#todosLosEstablecimientos').empty();
						traerMisEstablecimientos($("#idUsuario").val());
					});
				}
				else if (response.datos=="fail") {
					$("#queMostrarAPropietario").append('<div class="row"><div class="panel panel-primary"><div class="panel-heading"><h4>Bienvenido '+$("#nombreUsuario").val()+' a falta1.com, registra tu primer establecimiento para luego poder subir las canchas que queres poner en alquiler.</h4></div><div class="panel-body"><div class="col-md-6 col-md-offset-3"><div class="panel panel-primary"><form action="#" id="formularioRegistroEstablecimiento"><div class="form-group"><label for="Direccion">Direccion Del Establecimiento:</label><input type="text" class="form-control" id="Direccion" required></div><div class="form-group"><label for="Distrito">Distrito:</label><input type="text" class="form-control" id="Distrito" required></div><div class="form-group"><label for="Telefono">Telefono:</label><input type="number" class="form-control" id="Telefono" required></div><button type="submit" class="btn btn-success">Enviar</button></form></div></div></div></div></div>');
					$("#formularioRegistroEstablecimiento").submit(function(event) {
						event.preventDefault();
						registrarEstablecimiento($("#idUsuario").val(),$("#Direccion").val(),$("#Distrito").val(),$("#Telefono").val());
					});
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


