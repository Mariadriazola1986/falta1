var grupolista=new Array();

$(document).ready(function(){

	verGrupos();

	$("#crearGrupo").submit(function(event){
		event.preventDefault();	
		existeGrupo(grupolista);

		var supe = $("#nombreGrupo").val();

		if (revisar(supe)) {
			$("#error_nombre").addClass("oculto");
			$("#error_nombre").text("");
			creandoGrupo();

		}
		else{
			$("#error_nombre").removeClass("oculto");
			$("#error_nombre").text("El nombre de grupo ya existe");
			grupolista= new Array();
		}
	})





	//--------------------------------------------------
	//PARA BUSCAR GRUPOS
	$("#sinGrupos").hide();
	$("#tablaThead").hide();

	$("#bus").click(function(){
		if ($("#nombre").val()=="") {
			$("#sinGrupos").show();
			$("#Tablabuscada").html("");
			$("#tablaThead").hide();
		}
		else{
			$("#sinGrupos").hide();
			$("#tablaThead").show();
			//vaciar la tabla
			$("#Tablabuscada").html("");

			var x = $("#nombre").val().toLowerCase();
			var parametros={"funcion":"traerLasTiposCanchas"};
			$.ajax({
				data:parametros,
				type: "POST",
				url: "php/busquedaDeGrupos.php",
				dataType: "json",
				success: function(result){
					if (result.error=="NO") {
						$.each(result.datos, function(){
							var z = this.NOMBRE.toLowerCase();
							if (z.includes(x)) {
								$("#Tablabuscada").append($("<tr></tr>").append(
									$("<img>").attr("src", "imagenes/"+this.RUTA),
									$("<td></td>").text(this.NOMBRE),
									$("<td></td>").text(this.CANT_MIEMBROS+"/25"),
									$("<button value="+this.ID_GRUPO+"></button>").attr("class", "btn-info btn-lg").text("Solicitar Unirse")
								));
							}
						})
					}
					
					enviarSolicitudJugador();
					comprobarSolicitud();

					if ($("#Tablabuscada").html()=="") {
						$("#sinGrupos").show();
						$("#tablaThead").hide();
					}
				}
			})	
		}
			
	})
	
	//-----------------------------------------

	verSolicitudes();
	

	//--------------------------------


})

function existeGrupo(grupolista){
	var parametros={"funcion":"traergrupos"};
	$.ajax({
		data:parametros,
		type: "POST",
		url: "php/busquedaDeGrupos.php",
		dataType: "json",
		success: function(result){
			$.each(result.datos, function(){
				grupolista.push(this.NOMBRE);
			})
			return grupolista;
		}
	})
}

function revisar(supe){
	var num = grupolista.length;
	var ok=0;
	for (i in grupolista) {	
		console.log(grupolista[i]);
		if (grupolista[i]==supe) {
			ok=1;
		}		
	}
	if (ok==1) {
		return false;
	}
	else{
		return true;
	}

	
}


function enviarSolicitudJugador(){
	$("#Tablabuscada button").click(function(){
		
		var gato ={"grupoEntrar":this.value};

		$.ajax({
			url:"php/enviarSolicitudJugador.php",
			type:"post",
			dataType:"json",
			data:gato,
			success: function(echo){
				if (echo.error=="NO") {
					$("#Tablabuscada button[value="+gato.grupoEntrar+"]").text("En Espera").attr("disabled","");
					$("#solicitud_enviada").modal("show");
				}
				
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("ah shit, here we go again puta madre");
			}
		})		
	})
}

function comprobarSolicitud(){

	for (var i = $("#Tablabuscada button").length - 1; i >= 0; i--) {

		
		var algo={"grupo":$($("#Tablabuscada button")[i]).val()};
		var neko=$($("#Tablabuscada button")[i]).val();

		$.ajax({
			url:"php/EstadoDeSolicitud.php",
			type:"post",
			dataType:"json",
			data:algo,
			success:function(result){
				if (result[0]==false) {
				}
				else{
					if (result[0].ESTADO_SOLICITUD==4) {
					$("#Tablabuscada button[value="+neko+"]").text("En Espera").attr("disabled","");
					}
					if (result[0].ESTADO_SOLICITUD==1) {
						$("#Tablabuscada button[value="+neko+"]").text("Ya en grupo").attr("disabled","");
					}
				}

				
				
				
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("ah shit, here we go again en estado lpm");
			}
		})

		$.ajax({
			url:"php/esCreadorBuscador.php",
			type:"post",
			dataType:"json",
			data:algo,
			success:function(result){
				if (result[0]==true) {
					$("#Tablabuscada button[value="+neko+"]").text("Ya en grupo").attr("disabled","");
				}
			},
			error: function (xhr, status, error) {
				console.log(error);
				console.log("ah shit, here we go again en estado lpm");
			}
		})
	}
}


function verSolicitudes(){
	$("#sol").html("");

	$.ajax({
		url:"php/verSolicitudes.php",
		type:"post",
		dataType:"json",
		success:function(result){
			
			$("#cantSol").text("Solicitudes ");
			$("#cantSol").append("<span class='badge'>"+result.length+"</span>");
			var cantS=result.length;

			$.each(result, function(){
				$("#sol").append($("<div class='row'></div>").append(
					$("<div class='col-sm-1'></div>").append("<img class='img-responsive' src=imagenes/"+this.RUTA+" alt='Imagen de grupo'>"),
					$("<div class='col-sm-2'></div>").append("<h4>Has sido invitado al grupo "+this.NOMBRE+"</h4>"),
					$("<div class='col-sm-1'></div>").append("<button value=1 id=s"+this.ID_GRUPO+" class='btn-success'>Aceptar</button>"),
					$("<div class='col-sm-1'></div>").append("<button value=0 id=n"+this.ID_GRUPO+" class='btn-danger'>Rechazar</button>")));
			})
			aceptarOrechazar();

			//----------------------------------------------

			$("#sol2").html("");

			$.ajax({
				url:"php/verSolicitudesJugadores.php",
				type:"post",
				dataType:"json",
				success:function(result2){
			
					$("#cantSol").text("Solicitudes ");
					var cant2=cantS+result2.length;
					$("#cantSol").append("<span class='badge'>"+cant2+"</span>");

					for (var i = result2.length - 1; i >= 0; i--) {
						
						$("#sol2").append($("<div class='row'></div>").append(
							$("<div class='col-sm-1'></div>").append("<img class='img-responsive' src=imagenes/"+result2[i].RUTA+" alt='Imagen de grupo'>"),
							$("<div class='col-sm-2'></div>").append("<h4>El Jugador "+result2[i].NOMBRE+" quiere unirse al grupo "+result2[i].gruponombre+"</h4>"),
							$("<div class='col-sm-1'></div>").append("<button value=a"+result2[i].ID_USUARIO+" id=s"+result2[i].ID_GRUPO+" class='btn-success'>Aceptar</button>"),
							$("<div class='col-sm-1'></div>").append("<button value=0"+result2[i].ID_USUARIO+" id=n"+result2[i].ID_GRUPO+" class='btn-danger'>Rechazar</button>")));
					}
					aceptarOrechazarCreador();

				},
				error: function (xhr, status, error) {
					console.log(error);
					console.log("Hakuna matata");
				}
			})
		},
		error: function (xhr, status, error) {
			console.log(error);
			console.log("Hakuna matata");
		}
	})
}

function aceptarOrechazarCreador(){
	$("#sol2 button").click(function(){
		
		if ($(this).hasClass("btn-success")) {

			var archivos = new FormData();
			
			var idg = this.id;
			archivos.append("acagrupo",idg.substring(1));

			var idj = this.value;
			archivos.append("acajugador",idj.substring(1));

			archivos.append("tipo","Acepto");

			$.ajax({
				url:"php/aceptarSolicitudGrupoJugador.php",
				type:"post",
				dataType:"text",
				data:archivos,
				processData:false,
        		cache:false,
        		contentType: false,
				success:function(result){
					$("#union_exitosa").modal("show");
					verGrupos();
					verSolicitudes();
				},
				error: function (xhr, status, error) {
					console.log(error);
					console.log("Otra vez fallo y no se por que");
				}
			})

		}
		else{
			var archivos = new FormData();
			
			var idg = this.id;
			archivos.append("acagrupo",idg.substring(1));

			var idj = this.value;
			archivos.append("acajugador",idj.substring(1));

			archivos.append("tipo","Rechazo");

			$.ajax({
				url:"php/aceptarSolicitudGrupoJugador.php",
				type:"post",
				dataType:"text",
				data:archivos,
				processData:false,
        		cache:false,
        		contentType: false,
				success:function(result){
					$("#rechazo_exitosa").modal("show");
					verGrupos();
					verSolicitudes();
				},
				error: function (xhr, status, error) {
					console.log(error);
					console.log("Otra vez fallo y no se por que");
				}
			})
		}

	})
}



function aceptarOrechazar(){
	$("#sol button").click(function(){
		
		if ($(this).hasClass("btn-success")) {
			var unido = new FormData();

			var idg = this.id;

			unido.append("tipo","Acepto");

			unido.append("acagrupo",idg.substring(1));
			
			$.ajax({
				url:"php/aceptarSolicitudGrupo.php",
				type:"post",
				dataType:"text",
				data:unido,
				processData:false,
        		cache:false,
        		contentType: false,
				success:function(result){
					$("#union_exitosa").modal("show");
					verGrupos();
					verSolicitudes();
				},
				error: function (xhr, status, error) {
					console.log(error);
					console.log("Otra vez fallo y no se por que");
				}
			})

		}
		else{
			var unido = new FormData();

			var idg = this.id;

			unido.append("tipo","Rechazo");

			unido.append("acagrupo",idg.substring(1));
			
			$.ajax({
				url:"php/aceptarSolicitudGrupo.php",
				type:"post",
				dataType:"text",
				data:unido,
				processData:false,
        		cache:false,
        		contentType: false,
				success:function(result){
					$("#rechazo_exitosa").modal("show");
					verGrupos();
					verSolicitudes();
				},
				error: function (xhr, status, error) {
					console.log(error);
					console.log("Otra vez fallo y no se por que");
				}
			})
		}

	})
}




function esteGrupo(){
	$("table tbody tr button").click(function(){
		var flash = this.id;
		var final = flash.slice(3);
		var zoom = {"elgrupo":final};
		$.ajax({
			url:"php/marcarGrupo.php",
			dataType:"json",
			type:"post",
			data: zoom,
			success: function(event){
				if (event.error=="NO"){
					$(location).attr('href',"misGrupos2.php");
				}
				
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
			verGrupos();
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	})

}


function verGrupos(){
	$("#tablaG").html("");

	$.ajax({
		type: "POST",
		url: "php/traerMisGrupos.php",
		dataType: "json",
		success: function(result){
			if (result=="") {
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