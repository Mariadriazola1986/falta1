$(document).ready(function(){

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

