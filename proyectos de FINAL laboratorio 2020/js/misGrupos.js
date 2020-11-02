$(document).ready(function(){

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
				url: "json/jugadores.json",
				dataType: "json",
				success: function(result){
					$.each(result, function(){
						if (this.nombreJ.includes(x)) {
							$("#algo").append(
								$("<li class='list-group-item'></li>").append(
									$("<input type='checkbox'>").attr("id",this.nombreJ).attr("name",this.nombreJ),
									$("<label></label>").text(this.nombreJ).attr("for",this.nombreJ)
							));
						}
					});
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