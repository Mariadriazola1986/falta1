$(document).ready(function(){

	// $.ajax({
	// 	type: "POST",
	// 	url: "php/traerJugadores.php",
	// 	dataType: "json",
	// 	success: function(result){
	// 		$.each(result,function(){
	// 			$("#list").append($("<li></li>").attr("class", "list-group-item").text(this));
	// 		})
			
	// 	}
	// })

	// $("#algo").click(function(){
		
	// 	for (var i = $("#list li").length - 1; i >= 0; i--) {
			
	// 		var z = $($("#list li")[i]).val();

	// 		console.log(z);		
	// 	}
		
	// })

	$("#esAdmin").click(function(){
		if ($("#modalEditar").val()!=$("#idSesion").val()) {
			$("#panelModificar").html("<div id='nohay' class='alert alert-info'><strong>No Tiene los derechos para modificar este grupo</strong></div>");
		}
		console.log($("#idSesion").val());
	})

	$("#modificar").submit(function(event){
		event.preventDefault();
		modificarGrupo();
	})

})

function modificarGrupo(){
	var archivos = document.getElementById("fotoG");
	var archivo = archivos.files; 
	var archivos = new FormData();

	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i],);
	}
    
	archivos.append("nombre",$("#nombreGrupo").val());
	archivos.append("idgrupo",$("#buscador").val());

	$.ajax({
		url: "php/esteGrupo.php",
		dataType: "text",
		data: archivos,
		type: "post",
		processData:false,
        cache:false,
        contentType: false,
		success: function(response){
			$("#modalEditar").modal("hide");
			$("#grupo_creado").modal('show');
			//$("form")[1].reset();
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	})
}
