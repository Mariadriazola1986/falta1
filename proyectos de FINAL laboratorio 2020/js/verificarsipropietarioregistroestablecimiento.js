
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
					$("#tituloCancha").removeClass('oculto');
					$("#contenedorFiltroCancha").removeClass('oculto');
					$("#queMostrarAPropietario").append('<div class="row"><div class="panel panel-primary"><div class="panel-heading"><h4>Hola '+$("#nombreUsuario").val()+' aca podes elegir que hacer con tu cancha y las reservas de las mismas:</h4></div><div class="panel-body"><button type="button" class="btn btn-default" id="registrarCancha">Registra una nueva Cancha</button><button type="button" class="btn btn-default" id="administrarReservas">Administrar Reservas</button><button type="button" class="btn btn-default" id="registrarOtroestablecimiento">Registrar Otro Establecimiento</button></div></div></div>');
					$("#registrarCancha").click(function(event) {
						$("#modalDeSeleccionEstablecimiento").modal("show");
						$('#todosLosEstablecimientos').empty();
						traerMisEstablecimientosCargados($("#idUsuario").val());
					});
					$("#registrarOtroestablecimiento").click(function(event) {
						traerProvincias();
						$("#provincia").change(function(event) {
						if($(this).children('option:selected').val()!=0){
							$("#localidad").children().remove();

							traerLocalidad($(this).children('option:selected').val());

						}
						else{
							$("#localidad").children().remove();
						}

					});
					$("#modalNuevoEstablecimiento").modal("show");

					});

					$("#formularioRegistroNuevoEstablecimiento").submit(function(event) {

							event.preventDefault();
							if (validarFormulario()) {
								registrarOtroEstablecimiento($("#idUsuario").val(),$("#Direccion").val(),$("#localidad").children('option:selected').val(),$("#barrio").val(),$("#Telefono").val());
								$("#formularioRegistroNuevoEstablecimiento")[0].reset();
							}
						});
					$("select,input").click(function(event){
						limpiarAdvertencia();
					});

				}
				else if (response.datos=="fail") {
					traerProvincias();

					$("#tituloCancha").addClass('oculto');
					$("#contenedorFiltroCancha").addClass('oculto');
					$("#queMostrarAPropietario").append('<div class="row"><div class="panel panel-primary"><div class="panel-heading"><h4>Bienvenido '+$("#nombreUsuario").val()+' a falta1.com, registra tu primer establecimiento para luego poder subir las canchas que queres poner en alquiler.</h4></div><div class="panel-body"><div class="col-md-6 col-md-offset-3"><div class="panel panel-primary"><form action="#" id="formularioRegistroEstablecimiento"><div class="form-group"><label for="Direccion">Direccion Del Establecimiento:</label><input type="text" class="form-control" id="Direccion" required><p class="bg-danger oculto" id="errorDireccionNewEstablecimiento"></p></div><div class="form-group"><div class="form-group"><label for="provincia">provincia:</label><select class="form-control" id="provincia" required=""><option value="0">seleccione una provincia</option></select><p class="bg-danger oculto" id="errorProvinciaNewEstablecimiento"></p></div><div class="form-group"><label for="localidad">localidad:</label><select class="form-control" id="localidad" required="" ></select><p class="bg-danger oculto" id="errorLocalidadNewEstablecimiento"></p></div><div class="form-group"><label for="barrio">barrio:</label><input type="text" id="barrio" required="" class="form-control" minlength="7" maxlength="200"><p class="bg-danger oculto" id="errorBarrioNewEstablecimientoN"></p></div><div class="form-group"><label for="Telefono">Telefono:</label><input type="number" class="form-control" id="Telefono" required><p class="bg-danger oculto" id="errorTelefonoNewEstablecimiento"></p></div><button type="submit" class="btn btn-success">Enviar</button></form><p class="bg-danger oculto" id="errorServidorNewEstablecimiento"></p></div></div></div></div></div>');
					$("#provincia").change(function(event) {
						if($(this).children('option:selected').val()!=0){
							$("#localidad").children().remove();

							traerLocalidad($(this).children('option:selected').val());

						}
						else{
							$("#localidad").children().remove();
						}

					});


					$("#formularioRegistroEstablecimiento").submit(function(event) {
						event.preventDefault();
						if (validarFormulario()){
							registrarEstablecimientoNuevo($("#idUsuario").val(),$("#Direccion").val(),$("#localidad").children('option:selected').val(),$("#barrio").val(),$("#Telefono").val());
						}
					});
					$("select,input").click(function(event){
						limpiarAdvertencia();
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

function validarFormulario(){
	if (!estaVacio($("#Direccion").val()) || $("#Direccion").val()==undefined) {
		mostrarError($("#errorDireccionNewEstablecimiento"),"EL campo Direccion no debe quedar vacio.");
		return false;
	}
	else if (!estaVacio($("#provincia").val())||$("#provincia").val()==undefined) {
		mostrarError($("#errorProvinciaNewEstablecimiento"),"El campo provincia no debe quedar vacio.");
		return false;
	}
	else if (!estaVacio($("#localidad").val())||$("#localidad").val()==undefined) {
		mostrarError($("#errorLocalidadNewEstablecimiento"),"El campo localidad no debe quedar vacio.");
		return false;
	}
	else if (!estaVacio($("#barrio").val())||$("#barrio").val()==undefined) {
		mostrarError($("#errorBarrioNewEstablecimiento"),"El campo barrio no debe quedar vacio.");
		return false;
	}
	else if (!estaVacio($("#Telefono").val())||$("#Telefono").val()==undefined) {
		mostrarError($("#errorTelefonoNewEstablecimiento"),"El campo Telefono no debe quedar vacio.");
		return false;
	}
	else if (isNaN($("#Telefono").val())) {
		mostrarError($("#errorTelefonoNewEstablecimiento"),"El Telefono ingresado no es valido.");
		return false;
	}

	else{
		return true;
	}

}


function estaVacio(valor){
	var expresion=/\S+/g;//expresion que da false cuando solo hay espacios inclusive si apretas muchas vece la barra espaciadora.
	resultado=expresion.test(valor);
	return resultado;
}

function mostrarError(idspan,msje){
	var errores=idspan;
	errores.removeClass("oculto");
	errores.html(msje);

}
function limpiarAdvertencia () {
	var errores=[$("#errorDireccionNewEstablecimiento"),$("#errorProvinciaNewEstablecimiento"),$("#errorLocalidadNewEstablecimiento"),$("#errorBarrioNewEstablecimiento"),$("#errorTelefonoNewEstablecimiento")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});

}


function registrarOtroEstablecimiento(idusuario,direccion,localidad,barrio,telefono){
	var parametros={"idusuario":idusuario,"direccion":direccion,"localidad":localidad,"barrio":barrio,"telefono":telefono};
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
				$("body").append('<div class="modal fade" id="establecimientoRegistradoCorrectamenteEmail" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Registro Correcto</h4></div><div class="modal-body"><h4>Tu establecimiento se registro correctamente.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
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





function registrarEstablecimientoNuevo(idusuario,direccion,localidad,barrio,telefono){
	var parametros={"idusuario":idusuario,"direccion":direccion,"localidad":localidad,"barrio":barrio,"telefono":telefono};
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
				$("body").append('<div class="modal fade" id="establecimientoRegistradoCorrectamenteEmail" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Registro Correcto</h4></div><div class="modal-body"><h4>Tu establecimiento se registro correctamente.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
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

function traerLocalidad(idprovincias){

	var parametros={"idprovincias":idprovincias};
	$.ajax
	({
		data:parametros,
		url:   'php/traerLocalidades.php',
		type:  "POST",
		dataType:"json",

		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$.each(response.datos, function() {
				 $("#localidad").append('<option value='+this.id+'>'+this.nombre+'</option>');
			});
			}
			else{
				mostrarError(3,response.error);
			}



		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}




function traerProvincias(){
	$.ajax
	({
		url:   'php/traerProvincias.php',
		type:  "POST",
		dataType:"json",

		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$.each(response.datos, function() {
					 $("#provincia").append('<option value='+this.id+'>'+this.nombre_provincias+'</option>');
				});
			}


		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function traerMisEstablecimientosCargados(idusuario){
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
					$('#todosLosEstablecimientos').prepend("<div class='radio'><label><input type='radio' name='optradio' checked value='"+this.ID_ESTABLECIMIENTO+"'>"+this.BARRIO+" ("+this.nombre+","+this.nombre_provincias+" )</label> </div>");
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




