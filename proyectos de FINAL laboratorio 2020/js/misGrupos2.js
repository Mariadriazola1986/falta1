$(document).ready(function(){

	$.ajax({
		type: "POST",
		url: "json/grupos.json",
		dataType: "json",
		success: function(result){

			$("#Dimg").append($("<img>").attr("src", "imagenes/"+result[0].Gimg));		
			$("#Dnom").prepend(result[0].cantidad + "<br>");
			$("#Dnom").prepend(result[0].nomgrupo + "<br>");
			$("#Dbut").append($("<button></button>").attr("class", "btn-danger btn-lg").text("Abandonar Grupo"));

		}
	})

	/*$.ajax({
		type: "POST",
		url: "json/jugadores.json",
		dataType: "json",
		success: function(result){

			$.each(result, function(){
				$("#list").append($("<li></li>").attr("class", "list-group-item").text(this.nombreJ));
			})

		}
	})
	*/

	$.ajax({
		type: "POST",
		url: "php/misGrupos2.php",
		dataType: "json",
		success: function(result){
			$.each(result,function(){
				$("#list").append($("<li></li>").attr("class", "list-group-item").text(this));
			})
			
		}
	})






})