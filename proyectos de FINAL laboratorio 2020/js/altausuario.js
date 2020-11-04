
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

function mostrarErrorRegistro(span,msje){
	var errores=span;
	errores.removeClass("oculto");
	errores.html(msje);
	
}
function limpiarAdvertenciaRegistro(){
	var errores=$("#errorVRegistroPHP");
	errores.addClass("oculto");
	errores.html("");
}