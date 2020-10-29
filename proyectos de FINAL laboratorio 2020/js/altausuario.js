
$(document).ready(function()	
{
	$('input').click(function(event) {
		limpiarAdvertencia();
	});
	$("#btnJugador").click(function(event) {
		$("#btnRegistrar").val(1);
	});
	$("#btnPropietario").click(function(event) {
		$("#btnRegistrar").val(2);
	});


	$("#formUsuario").submit(function(event) {
		//alert();
		event.preventDefault();
		altaUsuario( $("#usuario").val(),$("#inputPassword").val(),$("#inputRepetirPassword").val(),$("#email").val(),$("#btnRegistrar").val());

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


		},
		success:  function (response) {
			if (response.error=="NO") {
					$("#modalRegistro").modal("hide");
					$("#modalDeSeleccion").modal("hide");

					$("#actualizacion_correcta").modal("show");
					$("form")[0].reset();
					setTimeout(function(){ 
					  $("#actualizacion_correcta").modal('hide');
					}, 9000);
					
			}
			else{
				mostrarError(0,response.error);
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function mostrarError(posicion,msje){
	var errores=$("span");
	errores.removeClass("oculto");
	errores.eq(posicion).html(msje);
	
}
function limpiarAdvertencia () {
	var errores=$("span");
	errores.addClass("oculto");
	errores.html("");
}