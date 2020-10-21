$(document).ready(function(){
	$("#R").hide();

	$("#bus").click(function(){
		$("#R").hide();
		//vaciar la tabla
		$("#T").html("");

		var x = $("#nombre").val();

		$.ajax({
			type: "POST",
			url: "json/grupos.json",
			dataType: "json",
			success: function(result){
				$.each(result, function(){
					if (x == this.nomgrupo) {
						$("#T").append($("<tr></tr>").append(
							$("<img>").attr("src", "imagenes/"+this.Gimg),
							$("<td></td>").text(this.nomgrupo),
							$("<td></td>").text(this.cantidad),
							$("<button></button>").attr("id", this.idgrupo).attr("class", "btn-info btn-lg").text("Solicitar Unirse")
						));
					}
				})

				if ($("#T").html()=="") {
					$("#R").show();
					console.log('No hay nada');
				}
			}
		})		
	})
})