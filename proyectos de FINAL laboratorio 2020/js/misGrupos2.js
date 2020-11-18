$(document).ready(function(){
	
	verGrupo();

	$.ajax({
		type: "POST",
		url: "php/jugadoresEngrupo.php",
		dataType: "json",
		success: function(result){
	 		$.each(result,function(){
				$("#list").append($("<li></li>").attr("class", "list-group-item").text(this.NOMBRE));
	 		})
			
	 	}
	})


	//---------------------------------------------


	$("#esAdmin").click(function(){
		$.ajax({
			url:"php/esCreador.php",
			type:"post",
			dataType:"text",
			success: function(event){
				if (event==false) {
					$("#panelModificar").html("<div id='nohay' class='alert alert-info'><strong>No Tiene los derechos para modificar este grupo</strong></div>");
				}
			},
			error: function (xhr, status, error) {
				console.log(error);
			}
		})

	})

	//----------------------------------------------


	$("#modificar").submit(function(event){
		event.preventDefault();
		modificarGrupo();
	})


	//---------------------------------------------------




	//----------------------------------------------------

})

function modificarGrupo(){
	var archivos = document.getElementById("fotoG");
	var archivo = archivos.files; 
	var archivos = new FormData();

	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i],);
	}
    
	archivos.append("nombre",$("#nombreGrupo").val());
	

	$.ajax({
		url: "php/actualizarGrupo.php",
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

function verGrupo(){
	$.ajax({
		url:"php/recargarGrupo.php",
		type:"post",
		dataType:"json",
		success:function(event){
			$("#Dimg").append($("<img alt='aca va algo'>").attr("src","imagenes/"+event[0].RUTA));
			$("#Dnom").prepend($("<h3></h3>").text(event[0].CANT_MIEMBROS+"/25"));
			$("#Dnom").prepend($("<h1></h1>").text(event[0].NOMBRE));
		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("ah shit, here we go again");
		}
	})
}
