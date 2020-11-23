
$(document).ready(function()	
{
	$('input').click(function(event) {

		limpiarAdvertenciaRegistro();
	});
	$("#btnJugador").click(function(event) {
		$("#btnRegistrar").val(1);
	});
	$("#btnPropietario").click(function(event) {
		$("#btnRegistrar").val(2);
	});


	$("#formUsuario").submit(function(event) {
		event.preventDefault();
		if (validarRegistro()) {
			altaUsuario( $("#usuario").val(),$("#inputPassword").val(),$("#inputRepetirPassword").val(),$("#email").val(),$("#btnRegistrar").val());
		}

	});

});

function altaUsuario(usuario,password,passwordR,email,id_tipo)
{
	var parametros={"usuario":usuario,"password":password,"passwordR":passwordR,"email":email,"tipousuario":id_tipo};
	$.ajax
	({
		data: parametros,
		url: "php/registrarusuario.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {
			$("#contenedor_carga").addClass('contenedor_carga');
			$("#carga").addClass('carga');
		},
		success:  function (response) {
			if (response.error=="NO") {
					$("#contenedor_carga").removeClass('contenedor_carga');
					$("#carga").removeClass('carga');
					$("#modalRegistro").modal("hide");
					$("#modalDeSeleccion").modal("hide");

					$("#actualizacion_correcta").modal("show");
					$("form")[0].reset();
					setTimeout(function(){ 
					  $("#actualizacion_correcta").modal('hide');
					}, 9000);
					
			}
			else{
				$("#contenedor_carga").removeClass('contenedor_carga');
				$("#carga").removeClass('carga');
				mostrarErrorRegistro($("#errorVRegistroPHP"),response.error);
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function validarRegistro(){

	if (!estaVacioRegistro($("#usuario").val())||$("#usuario").val()==undefined) {
		mostrarErrorRegistro($("#errorRegistroUsuario"),"El campo usuario no debe quedar vacio.");
		return false;
	}

	else if (!estaVacioRegistro($("#inputPassword").val())||$("#inputPassword").val()==undefined) {
		mostrarErrorLogin($("#errorPasswordPassword1"),"El campo contraseña no debe quedar vacio.");
		return false;
		}
	else if (!estaVacioRegistro($("#inputRepetirPassword").val())||$("#inputRepetirPassword").val()==undefined) {
		mostrarErrorLogin($("#errorPasswordPassword2"),"El campo confirmar contraseña no debe quedar vacio.");
		return false;
		}
	else if ($("#inputPassword").val()!=$("#inputRepetirPassword").val()) {
		mostrarErrorLogin($("#errorPasswordPassword2"),"Las contraseñas no coinciden.");
		return false;
		}
	else if (!estaVacioRegistro($("#email").val())||$("#email").val()==undefined) {
		mostrarErrorLogin($("#errorEmail"),"El campo email no debe quedar vacio.");
		return false;
		}
	else if (!validarMail($("#email").val())) {
		mostrarErrorLogin($("#errorEmail"),"El formato del email no es el correcto.");
		return false;
		}

	else{
		return true;
	}
}

function validarMail(input_mail) {
	var mail=input_mail;
	//var expresion=/^[\w]+@[\w]+\.[a-z]+/;
	
	// Basicamente, le estoy diciendo que tome todo tipo de letra y/o caracter especial, pero esta condicionado si o si que agregues el "@"" y el "." del final
	//EJ: "cualquierNumer0ocaracter_especial@cualquierNumer0ocaracter_especial.cualquierNumer0ocaracter_especial"
	var expresion = /\S+@\S+\.\S+/;
	
	if (!expresion.test(mail)){
		var resultado1=false;
		console.log(resultado1);
		return resultado1;
	}
	else{
		resultado1 = true;
		console.log(resultado1);
		return resultado1;
	}
	
}





function estaVacioRegistro(valor){
	var expresion=/\S+/g;//expresion que da false cuando solo hay espacios inclusive si apretas muchas vece la barra espaciadora.
	resultado=expresion.test(valor);
	return resultado;
}



function mostrarErrorRegistro(parrafo,msje){
	var errores=parrafo;
	errores.removeClass("oculto");
	errores.html(msje);
	
}
function limpiarAdvertenciaRegistro(){
	var errores=[$("#errorVRegistroPHP"),$("#errorEmail"),$("#errorPasswordPassword2"),$("#errorPasswordPassword1"),$("#errorRegistroUsuario")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});
}