$(document).ready(function(){

	verGrupos();

	$("#crearGrupo").submit(function(event){
		event.preventDefault();	
		creandoGrupo();
	})

	$("#cargarGrupos").click(function(){
		verGrupos();
	})

	//-------------------------------------------------------
	//PARA BUSCAR JUGADORES
	$("#buscador2").click(function(){
		$("#algo").html("");
		var x = $("#buscador").val().toLowerCase()
		if (x!="") {
			$.ajax({
				type: "POST",
				url: "php/traerJugadores.php",
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

	//--------------------------------------------------
	//PARA BUSCAR GRUPOS
	$("#sinGrupos").hide();

	$("#bus").click(function(){
		if ($("#nombre").val()=="") {
			$("#sinGrupos").show();
			$("#Tablabuscada").html("");
		}
		else{
			$("#sinGrupos").hide();
			//vaciar la tabla
			$("#Tablabuscada").html("");

			var x = $("#nombre").val().toLowerCase();

			$.ajax({
				type: "POST",
				url: "php/busquedaDeGrupos.php",
				dataType: "json",
				success: function(result){

					$.each(result, function(){
						var z = this.NOMBRE.toLowerCase();
						if (z.includes(x)) {
							$("#Tablabuscada").append($("<tr></tr>").append(
								$("<img>").attr("src", "imagenes/"+this.RUTA),
								$("<td></td>").text(this.NOMBRE),
								$("<td></td>").text(this.CANT_MIEMBROS),
								$("<button></button>").attr("class", "btn-info btn-lg").text("Solicitar Unirse")
							));
						}
					})

					if ($("#Tablabuscada").html()=="") {
						$("#sinGrupos").show();
						console.log('No hay nada');
					}
				}
			})	
		}
			
	})
	
	//-----------------------------------------


})

function esteGrupo(){
	$("table tbody tr button").click(function(){
		var flash = this.id;
		var final = flash.slice(3);
		var zoom = {"elgrupo":final};
		$.ajax({
			url:"php/marcarGrupo.php",
			dataType:"text",
			type:"post",
			data: zoom,
			success: function(event){
				$(location).attr('href',"misGrupos2.php");
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("Otro error del que no tengo idea");
			}
		})
		

	})	
}


function creandoGrupo(){
	var archivos = document.getElementById("fotoG");
	var archivo = archivos.files; 
	var archivos = new FormData();

	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i],);
	}
    
	archivos.append("nombre",$("#nombreGrupo").val());
	archivos.append("idusuario",$("#Botonazo").val());

	$.ajax({
		url: "php/crearGrupo.php",
		dataType: "text",
		data: archivos,
		type: "post",
		processData:false,
        cache:false,
        contentType: false,
		success: function(response){
			$("#modalCrear").modal("hide");
			$("#grupo_creado").modal('show');
			$("form")[1].reset();
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	})

}


function verGrupos(){
	$("#tablaG").html("");
	var bot = {"Batman":$("#Botonazo").val()};

	$.ajax({
		data: bot,
		type: "POST",
		url: "php/traerMisGrupos.php",
		dataType: "json",
		success: function(result){
			if (result=="") {
				console.log("esta vacio");
				$("#latabla").hide();
			}
			else{
				$("#latabla").show();
				$("#nohay").hide();
				$.each(result, function(){
				$("#tablaG").append($("<tr></tr>").append(
					$("<img>").attr("src", "imagenes/"+this.RUTA),
					$("<td></td>").text(this.NOMBRE),
					$("<td></td>").text(this.CANT_MIEMBROS+"/25"),

					$("<button></button>").attr("value",this.NOMBRE).attr("name",this.NOMBRE).attr("id","ver"+this.ID_GRUPO).attr("class", "btn-default btn-lg").text("Ver Grupo")

					));
				})
				esteGrupo();
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("Se rompio todo y no se por que");
		}
	})
}