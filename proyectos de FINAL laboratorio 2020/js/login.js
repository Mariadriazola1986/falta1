
$(document).ready(function()	
{
	$('input').click(function(event) {
		limpiarAdvertenciaLogin();
	});


	$("#formLogin").submit(function(event) {
		
		event.preventDefault();
		loginUsuario( $("#usuarioLogin").val(),$("#inputPasswordLogin").val());

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

function mostrarErrorLogin(span,msje){
	var errores=span;
	errores.removeClass("oculto");
	errores.html(msje);
	
}
function limpiarAdvertenciaLogin() {
	var errores=$("#errorVLoginPHP");
	errores.addClass("oculto");
	errores.html("");
}