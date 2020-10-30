
$(document).ready(function()	
{
	$('input').click(function(event) {
		limpiarAdvertencia();
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


		},
		success:  function (response) {
			if (response.error=="NO") {
					$(location).attr('href',response.datos);
					
			}
			else{
				
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
function limpiarAdvertencia () {
	var errores=$("span");
	errores.addClass("oculto");
	errores.html("");
}