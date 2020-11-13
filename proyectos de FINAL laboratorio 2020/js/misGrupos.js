function creandoGrupo(){
	var archivos = document.getElementById("fotoG");
	var archivo = archivos.files; 
	var archivos = new FormData();

	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i],);
	}
    
	archivos.append("nombre",$("#nombreGrupo").val());

	$.ajax({
		url: "php/crearGrupo.php",
		dataType: "text",
		data: archivos,
		type: "post",
		processData:false,
        cache:false,
        contentType: false,
		success: function(response){

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	})


}


$(document).ready(function(){

	$("#crearGrupo").submit(function(event){
		event.preventDefault();	
		creandoGrupo();
	})




	$.ajax({
		type: "POST",
		url: "json/grupos.json",
		dataType: "json",
		success: function(result){
			$.each(result, function(){
				
				$("#tablaG").append($("<tr></tr>").append(
					$("<img>").attr("src", "imagenes/"+this.Gimg),
					$("<td></td>").text(this.nomgrupo),
					$("<td></td>").text(this.cantidad),
					$("<button></button>").attr("id", this.idgrupo).attr("class", "btn-default btn-lg").text("Ver Grupo")
					));

			})
		}

	})

	$("#buscador2").click(function(){
		$("#algo").html("");
		var x = $("#buscador").val().toLowerCase()
		if (x!="") {
			$.ajax({
				type: "POST",
				url: "php/misGrupos2.php",
				dataType: "json",
				success: function(result){
					$.each(result, function(){
						if (this.includes(x)) {
							$("#algo").append(
								$("<li class='list-group-item'></li>").append(
									$("<input type='checkbox'>").attr("id",this).attr("name",this),
									$("<label></label>").text(this).attr("for",this)
							));
						}
					});
					if ($("#algo").html()=="") {
						$("#algo").append("<h1>No se encontro resultado</h1>")
					}
				}
			})
		}

	})


	$("#cerrar").click(function(){
		$.each($("#modal2 #algo input"),function(){
			if ($(this).is(":checked")) {
				$("#listaJ").append($("<li></li>").text(this.name))
			}
		})
	})
	
})

