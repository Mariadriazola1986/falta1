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
			dataType:"json",
			success: function(event){
				if (event[0]==false) {
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

	$("#noEncontro").hide();

	$("#botonazo").click(function(){
		buscandoJugadores();
	})

	//----------------------------------------------------

	$("#abandono").click(function(){
		abandonarGrupo();
	})


})

function abandonarGrupo(){
	$.ajax({
		url:"php/abandonarGrupo.php",
		type:"post",
		dataType:"text",
		success:function(result){
			$(location).attr('href',"misGrupos.php");
		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("toca averiguar por que");
		}
	})
}


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
			$("#modificacion_echa").modal('show');
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

function buscandoJugadores(){

	if ($("#buscador").val()=="") {
		$("#noEncontro").show();
		$("#listAgregar").html("");
	}
	else{
		$("#noEncontro").hide();
		$("#listAgregar").html("");
		var michi = $("#buscador").val().toLowerCase();

		$.ajax({
			url:"php/traerJugadores.php",
			type:"post",
			dataType:"json",
			success:function(event){
				$.each(event, function(){
					var nom = this.NOMBRE.toLowerCase();
					if (nom.includes(michi)) {
						$("#listAgregar").append($("<div class='row'></div>").append(
							$("<div class='col-sm-8'></div>").append("<li class='list-group-item'>"+this.NOMBRE+"</li>"),
							$("<div class='col-sm-4'></div>").append("<button class='btn btn-primary' value="+this.ID_USUARIO+">Invitar al grupo</button>")));
					
					}
					
				});
				if ($("#listAgregar").html()=="") {
					$("#noEncontro").show();
				}
				comprobarSolicitud();
				enviarSolicitud();
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("ah shit, here we go again en traer jugadores");
			}
		})
	}
	
}

function enviarSolicitud(){
	$("#listAgregar button").click(function(){
		
		var gato ={"jugador":this.value};

		$.ajax({
			url:"php/enviarSolicitud.php",
			type:"post",
			dataType:"text",
			data:gato,
			success: function(echo){
				$("[value="+gato.jugador+"]").text("En Espera").attr("disabled","");
				$("#invitacion_enviada").modal("show");
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("ah shit, here we go again puta madre");
			}
		})		
	})
}

function comprobarSolicitud(){

	$.ajax({
		url:"php/SolicitudEnEspera.php",
		type:"post",
		dataType:"json",
		success:function(result){
			$.each(result,function(){
				var neko = this.ID_USUARIO;
				for (var i = $("#listAgregar button").length - 1; i >= 0; i--) {
					if ($($("#listAgregar button")[i]).val()==neko) {
						$("[value="+neko+"]").text("En Espera").attr("disabled","");
					}
				}
			})
		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("ah shit, here we go again es como la quinta");
		}
	})
}
