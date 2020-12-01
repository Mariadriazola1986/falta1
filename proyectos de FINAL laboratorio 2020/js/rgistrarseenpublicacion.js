
$(document).ready(function()
{
	

	$("#formInvitado").submit(function(event) {
			event.preventDefault();
			if (validarNombre($("#inputnombreinvitado")) && validarApellido($("#inputapellidoinvitado")) && validarDNI($("#inputdniinvitado")) && validarTelefono($("#inputtelefonoinvitado"))) {
				registrarAInvitado($("#inputnombreinvitado").val(),$("#inputapellidoinvitado").val(),$("#inputdniinvitado").val(),$("#inputtelefonoinvitado").val(),$("#btnregistrarinvitado").val());
			}
		});

	$("input").click(function(event) {
		//alert()
		limpiarAdvertencia2();
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



function validarApellido(apellidoinvitado){
	var nombre=apellidoinvitado;
	if (!estaVacio2(nombre.val())||nombre.val()==undefined) {
		mostrarError2($("#errorApellidoRegInvitacion"),"El apellido no debe quedar vacio.");
		return false;
	}
	else if (!validarcaracterespermitidos2(nombre.val())) {
			mostrarError2($("#errorApellidoRegInvitacion"),"El apellido no debe contener caracteres especiales o numeros.");
			return false;
		}
	
	else if (nombre.val().length>10 || nombre.val().length<5 ){
		mostrarError2($("#errorApellidoRegInvitacion"),"El apellido debe contener entre 5 y 10 caracteres.");
		return false;
	}
	else{
		return true;
	}

	
	function validarcaracterespermitidos2(nombre)//valida los caracteres permitidos para el nombre
 	{
 		var expresion=/^[a-z|A-Z|ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚñÑïöüÏÖÜçÇ\s]*$/;
 		var comprobar=expresion.test(nombre);
 		return comprobar;
 	}
	

}

function validarDNI(dni){//validacion del dni
	var dni=dni;
	if (!estaVacio2($(dni.val()))||$(dni).val()==undefined) {
		mostrarError2($("#errorDNIRegInvitacion"),"El dni no debe quedar vacio.");
		return false;
	}
	else if (isNaN($(dni).val())) {
		mostrarError2($("#errorDNIRegInvitacion"),"El dni no es un numero.");
		return false;
	}
	else if ($(dni).val()<1000000 ||$(dni).val()>50000000) {
		mostrarError2($("#errorDNIRegInvitacion"),"El dni no esta en el rango de numeros permitidos.");
		return false;
	}
	else{
		return true;
	}
}

function validarTelefono(telefono){//validacion del telefono
	var dni=telefono;
	if (!estaVacio2($(dni.val()))||$(dni).val()==undefined) {
		mostrarError2($("#errorTelefonoRegInvitacion"),"El telefono no debe quedar vacio.");
		return false;
	}
	else if (isNaN($(dni).val())) {
		mostrarError2($("#errorTelefonoRegInvitacion"),"El telefono no es un numero.");
		return false;
	}
	else if ($(dni).val().length<8 ||$(dni).val().length>13) {
		mostrarError2($("#errorTelefonoRegInvitacion"),"El telefono tiene que tener entre 8 y 13 digitos.");
		return false;
	}
	else{
		return true;
	}
}




function validarNombre(nombreinvitado){
	var nombre=nombreinvitado;
	var expresion=/\S+[$]*/g;
	arraydepalabras=nombre.val().match(expresion);

	if (!estaVacio2(nombre.val())||nombre.val()==undefined) {
		mostrarError2($("#errorNombreRegInvitacion"),"El nombre no debe quedar vacio.");
		return false;
	}
	else if (!validarcaracterespermitidos2(nombre.val())) {
			mostrarError2($("#errorNombreRegInvitacion"),"El nombre no debe contener caracteres especiales o numeros.");
			return false;
		}
	
	else if (arraydepalabras==null || arraydepalabras.length <2)//IMPORTANTE ATRAPAR EL VALOR NULO PARA Q DESPUES NO TIRE ERROR. 
	{
		mostrarError2($("#errorNombreRegInvitacion"),"El nombre debe contener al menos 2 palabras.");//validacion extra no lo pedia
		return false;
	}
	else if (nombre.val().length>25 || nombre.val().length<5 ){
		mostrarError2($("#errorNombreRegInvitacion"),"El nombre debe contener entre 5 y 25 caracteres.");
		return false;
	}
	else{
		return true;
	}

		



	function validarcaracterespermitidos2(nombre)//valida los caracteres permitidos para el nombre
 	{
 		var expresion=/^[a-z|A-Z|ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚñÑïöüÏÖÜçÇ\s]*$/;
 		var comprobar=expresion.test(nombre);
 		return comprobar;
 	}
	

}

function estaVacio2(valor){
	var expresion=/\S+/g;//expresion que da false cuando solo hay espacios inclusive si apretas muchas vece la barra espaciadora.
	resultado=expresion.test(valor);
	return resultado;
} 

function mostrarError2(idspan,msje){
	var errores=idspan;
	errores.removeClass("oculto");
	errores.html(msje);

}
function limpiarAdvertencia2() {
	var errores=[$("#errorApellidoRegInvitacion"),$("#errorDNIRegInvitacion"),$("#errorTelefonoRegInvitacion"),$("#errorDetallePublicacion"),$("#errorNombreRegInvitacion")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});
	
}