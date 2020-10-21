$(document).ready(function(){

	$.ajax({
		type: "POST",
		url: "json/grupos.json",
		dataType: "json",
		success: function(result){
			$.each(result, function(){
				
				$("#T").append($("<tr></tr>").append(
					$("<img>").attr("src", "imagenes/"+this.Gimg),
					$("<td></td>").text(this.nomgrupo),
					$("<td></td>").text(this.cantidad),
					$("<button></button>").attr("id", this.idgrupo).attr("class", "btn-default btn-lg").text("Ver Grupo")
					));



			})
		}

	})








	
})