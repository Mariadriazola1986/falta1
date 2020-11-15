
$(document).ready(function()	
{
	$('input').click(function(event) {
		limpiarAdvertenciaLogin();
	});


	$("#formLogin").submit(function(event) {
		
		event.preventDefault();
		if (validar()) {
			loginUsuario( $("#usuarioLogin").val(),$("#inputPasswordLogin").val());
		}
		

	});

});

function loginUsuario(usuario,password)
{
	var parametros={"usuario":usuario,"password":password};
	$.ajax
	({
		data: parametros,
		url: "php/login.php",
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
					$(location).attr('href',response.datos);
					
			}
			else{
				$("#contenedor_carga").removeClass('contenedor_carga');
				$("#carga").removeClass('carga');
				mostrarErrorLogin($("#errorVLoginPHP"),response.error);
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function validar(){

	if (!estaVacio($("#usuarioLogin").val())||$("#usuarioLogin").val()==undefined) {
		mostrarErrorLogin($("#errorLoginUsuario"),"El campo usuario no debe quedar vacio.");
		return false;
	}

	else if (!estaVacio($("#inputPasswordLogin").val())||$("#inputPasswordLogin").val()==undefined) {
		mostrarErrorLogin($("#errorLoginPassword"),"El campo password no debe quedar vacio.");
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

function mostrarErrorLogin(parrafo,msje){
	var errores=parrafo;
	errores.removeClass("oculto");
	errores.html(msje);
	
}

function limpiarAdvertenciaLogin() {
	var errores=[$("#errorVLoginPHP"),$("#errorLoginUsuario"),$("#errorLoginPassword")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});
	
}