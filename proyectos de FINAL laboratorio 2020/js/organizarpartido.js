var GDIA = ""; //variable global del calendario.

var IDPARTIDOLPM="";
var DROPDOWNBUSCARVAL="";
var CANCHAIDBUSCAR="";

//-------

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('input,select').click(function(event) {
		limpiarAdvertencia();
	});

	actualizarDrop();



    obtenerDiaActual();
    obtenerCalendario();
    obtenerTipoFutbol();
    obtenerMisPartidos($("#btnRegistrarPartido").val());
    $("#formOrganizarPartido").submit(function(event) {
    	//alert(GDIA);
    	event.preventDefault();
    	if (validarSiFechaNoEsPasada()) {
    		registrarPartido($("#btnRegistrarPartido").val(),GDIA,$("#horaInicioPartidoOrganizado").val(),$("#tipoFutbol").children('option:selected').val());
    	}
    });
});



function obtenerMisPartidos(id_user){
	var parametros={"id_usuario":id_user};
	$.ajax
	({
		data: parametros,
		url: "php/traerMisPartidos.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.length>0) {
			$.each(response, function(){
				


					if (this.ID_TIPO==4 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=8 && this.CANTIDAD_DE_JUGADORES_ACTUALES<16) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info'value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==4 && this.CANTIDAD_DE_JUGADORES_ACTUALES==16) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success'value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==1 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=11 && this.CANTIDAD_DE_JUGADORES_ACTUALES<22) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==1 && this.CANTIDAD_DE_JUGADORES_ACTUALES==22){
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==2 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==2 && this.CANTIDAD_DE_JUGADORES_ACTUALES==10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==3 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=7 && this.CANTIDAD_DE_JUGADORES_ACTUALES<14) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==3 && this.CANTIDAD_DE_JUGADORES_ACTUALES==14) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else if (this.ID_TIPO==5 && this.CANTIDAD_DE_JUGADORES_ACTUALES>=5 && this.CANTIDAD_DE_JUGADORES_ACTUALES<10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-warning role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:50%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					else if (this.ID_TIPO==5 && this.CANTIDAD_DE_JUGADORES_ACTUALES==10) {
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-success role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:100%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-success' value="+this.ID_PARTIDO+" name='boton_reservar'>Reservar Cancha</button></td></tr>");
					}
					else{
						$("#misPartidos").append("<tr><td>"
						+this.FECHA+
						"</td><td>"
						+this.HORA+
						"</td><td>"
						+this.HORA_FIN+
						"</td><td>"
						+this.TIPO+
						"</td><td><div class='progress'><div class='progress-bar progress-bar-danger role=progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:20%'>"+this.CANTIDAD_DE_JUGADORES_ACTUALES+"/"
						+this.JUGADORES_MINIMOS_REQUERIDOS+"</div></td><td><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_publicar'>Publicar</button><button type='button' class='btn btn-info' value="+this.ID_PARTIDO+" name='boton_invitar'>Invitar</button></td></tr>");
					}
					
				});
			}
			else{
				$("#misPartidos").append('<tr><td colspan="6"><div class="alert alert-info"><strong>No tenes partidos organizados.</strong></div></td></tr>');
			}

				$("[name=boton_publicar]").click(function(event) {
					if (verSiEstapublicado($(this).val())) {
						$("#btnFormModalPublicar").val($(this).val());
    					$("#PublicarPartido").modal("show");
    					$("#formPublicarPartido").submit(function(event) {
    						event.preventDefault();
    							if (validarPublicacion()) {
    								$("#btnFormModalPublicar").attr("disabled",true); 
    								PublicarMiPartido($("#btnFormModalPublicar").val(),$("#commedetalles").val());
    							}
    							else{
    								$("#btnFormModalPublicar").attr("disabled",false);
    							}		
    						
    					});
    					$("textarea").click(function(event) {
    						limpiarAdvertencia();
    					});
    				}

    			});
					

				$("[name=boton_invitar]").click(function(event) {
						var id=($(this).val());
    					$("#MAquienVasAInvitar").modal("show");
    					$("#seleccionoAmigo").click(function(event) {
    						$("#MenviarAAmigo").modal("show");
    						$("#btnEnviarEmailAAmigo").val(id);
    					});
    					$("#seleccionoGrupo").click(function(event) {
    						$("#modalBusqueda").modal("show");
    						$("#busquedaGrupoAInvitar").val(id);
    						$("#busquedaGrupoAInvitar").click(function(event) {
    							invitarGrupo();
    						
    						});

    					});



    			});
    			$("[name=boton_reservar]").click(function(event) {
						var idPartido=($(this).val());
						IDPARTIDOLPM=idPartido;
						$("#MReservarCancha").modal("show");
						
    					$("#btnBuscar").click(function(event) {
							if (validarParametroBusqueda($("#canchaABuscar").val())) {
								DROPDOWNBUSCARVAL=$("#btnDropDownsBuscar").val();
								CANCHAIDBUSCAR=$("#canchaABuscar").val()
								load(1);
					}
				});

    			});

		}
			,
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}
//-nuevo
function load(page){
	parametros={"valor":DROPDOWNBUSCARVAL,"dato":CANCHAIDBUSCAR,"action":"ajax","page":page,"idPartido":IDPARTIDOLPM};
	$.ajax({
			url:'php/buscarCanchasAReservar.php',
			data: parametros,
			type: "POST",
			 beforeSend: function(objeto){

			},
			success:function(data){
				$("#canchasBuscadaDisponibles").empty();
				$("#canchasBuscadaDisponibles").append(data);
				$("[name=btn_mas_info]").click(function(event) {
					obtenerDatosCanchaAReservar($(this).val());
    			});


    			$("#busquedaBarrio").click(function(event) {
    				$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");

				});
				$("#busquedaDireccion").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("#busquedaLocalidad").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("input").click(function(event) {
					limpiarAdvertencia();
				});

			}



		})
}

function obtenerDatosCanchaAReservar(id_cancha)//todos los datos inclusive las imagenes
{

	var parametros={"id_cancha":id_cancha};
	$.ajax
	({
		data: parametros,
		url: "php/traerDatosCancha.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {
		},
		success:  function (response) {
			if (response.error=="NO") {

				$("#contenedorcarrusel").empty();
				$("#contenedorcarrusel").append('<div id="carrusel" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators" id="indicadorCancha"></ol><div class="carousel-inner" id="imagenesCancha"></div><a href="#carrusel" class="left carousel-control" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a href="#carrusel" class="right carousel-control" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div>');
				var cantidad=0;
				$("#liProvincia").html("Provincia: "+response.datos[0].nombre_provincias+"");
				$("#liLocalidad").html("Localidad: "+response.datos[0].nombre+"");
				$("#liBarrio").html("Barrio: "+response.datos[0].BARRIO+"");
				$("#liDireccion").html("Direccion: "+response.datos[0].DIRECCION+"");
				$("#liTipoFutbol").html("Tipo De Futbol: "+response.datos[0].TIPO+"");
				$("#liPrecio").html("Precio por Juego: "+"$"+response.datos[0].PRECIO+"");
				$("#liTelefono").html("Telefono: "+response.datos[0].TELEFONO+"");

				$.each(response.datos, function() {
					if (cantidad==0)
					{
						$("#indicadorCancha").append('<li data-target="#carrusel" data-slide-to='+cantidad+' class="active"></li>');
						$("#imagenesCancha").append('<div class="item active"><img src="imagenes/'+this.RUTA+'" alt="'+this.RUTA+'"></div>');
					}
					else{
						$("#indicadorCancha").append('<li data-target="#carrusel" data-slide-to='+cantidad+'></li>');
						$("#imagenesCancha").append('<div class="item"><img src="imagenes/'+this.RUTA+'" alt="'+this.RUTA+'"></div>');
					}
				 	cantidad++;

				});
				$("#modalMasInfoCancha").modal("show");


			}

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}




function actualizarDrop(){
    			$("#busquedaBarrio").click(function(event) {
    				$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");

				});
				$("#busquedaDireccion").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("#busquedaLocalidad").click(function(event) {
					$("#btnDropDownsBuscar").val($(this).parent().val());
    				$("#btnDropDownsBuscar").html($(this).text()+"                        <span class='caret'></span>");
				});
				$("input").click(function(event) {
					limpiarAdvertencia();
				});

}




function validarParametroBusqueda(nombre){
	if(!estaVacio(nombre)) {
		mostrarError($("#errorDeBusquedaCancha"),"El campo de busqueda no debe quedar vacio.");
		return false;
	}
	else{
		return true;
	}



}



function validarPublicacion(){
	
	if (!estaVacio($("#commedetalles").val())) {
		mostrarError($("#errorDetallePublicacion"),"La descripcion no debe quedar vacio.");
		return false;
	}
	else if ($("#commedetalles").val().length<174) {
		mostrarError($("#errorDetallePublicacion"),"La descripcion del partido es demasiado corta, por favor ingrese mas detalle.");
		return false;
	}

	else if ($("#commedetalles").val().length>740) {
		mostrarError($("#errorDetallePublicacion"),"La descripcion supero la cantidad de caracteres permitidos.");
		return false;
	}
	else{
		return true;

	}
}



function invitarGrupo(){
	$("#Tablabuscada").empty();

	var x = $("#nombre").val().toLowerCase();
			$.ajax({
				type: "POST",
				url: "php/busquedaDeGrupos.php",
				dataType: "json",
				success: function(result){

					$.each(result, function(){
						var z = this.NOMBRE.toLowerCase();
						if (z.includes(x)) {
							$("#Tablabuscada").append('<tr><td><img class="img-responsive" src=imagenes/'+this.RUTA+
								'></td><td>'+this.NOMBRE+'</td><td>'+this.CANT_MIEMBROS+'</td><td><button type="button" class="btn btn-success btn-lg" value='+this.ID_GRUPO+' id="btnYaEnviarInvitacion" name="btnYaInvitarGrupo">Invitar</button></td></tr>');
							
				
						}
					})
					$("[name=btnYaInvitarGrupo]").click(function(event) {
						// id partido alert($("#busquedaGrupoAInvitar").val());
						// id Grupo alert($(this).val());
						guardarInvitacionAGrupo($("#busquedaGrupoAInvitar").val(),$(this).val());
							});

					if ($("#Tablabuscada").html()=="") {
						var message = $('<div class="well text-center error_message">No se encontro resultados.<button type="button" class="close" data-dismiss="alert">&times</button></div>');
						message.appendTo($('#mensajeErrorBusqueda')).fadeIn(300).delay(5000).fadeOut(500);
						console.log('No hay nada');
					}
				}
			})	
		
			
	

}


function guardarInvitacionAGrupo(id_partido,id_grupo){
	var parametros={"id_partido":id_partido,"id_grupo":id_grupo};
	$.ajax
	({
		data: parametros,
		url: "php/enviarInvitacionAGrupo.php",
		type: "POST",
		dataType: "json",
		beforeSend: function () {
			$("#contenedor_carga_jugador").addClass('contenedor_carga');
			$("#carga_jugador").addClass('carga');
		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#Tablabuscada").empty();
				$("#contenedor_carga_jugador").removeClass('contenedor_carga');
					$("#carga_jugador").removeClass('carga');
				$("body").append('<div class="modal fade" id="invitacioncorrectaAGrupo" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Envio correcto de invitacion</h4></div><div class="modal-body"><h4>Se envio la invitacion al grupo correctamente</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
				$("#invitacioncorrectaAGrupo").modal("show");
					setTimeout(function(){ 
					  $("#invitacioncorrectaAGrupo").modal('hide');
					}, 9000);
					
			}
			else{
				$("#contenedor_carga_jugador").removeClass('contenedor_carga');
				$("#carga_jugador").removeClass('carga');
				
			}
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

}




function verSiEstapublicado(idpartido){
	var booleano=true;
	var parametros={"idpartido":idpartido};
	$.ajax
	({
		data:parametros,
		url:   'php/verSiEstapublicado.php',
		type:  "POST",
		dataType:"json",
		async: false, 
		beforeSend: function () {
			
		},
		success:  function (response) {
			if (response.error=="NO") {
				if (response.datos=="publicado") {
					
					var message = $('<div class="well text-center error_message">Este partido ya lo publicaste<button type="button" class="close" data-dismiss="alert">&times</button></div>');
				message.appendTo($('tbody')).fadeIn(300).delay(5000).fadeOut(500);
					booleano=false;
					
				}
				else{
					booleano=true;
				}

			}
			else{
				console.log(response.error);
			}
			
			
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

		
	return booleano;
}







function PublicarMiPartido(idpartido,comentarios){
	parametros={"id_partido":idpartido,"comentarios":comentarios};
	$.ajax
	({
		data: parametros,
		url: "php/PublicarMiPartido.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#PublicarPartido").modal("hide");
				$("#formPublicarPartido")[0].reset();
				$("#PublicacionExitosa").modal("show");
				$("#btnFormModalPublicar").attr("disabled",false);
				setTimeout(function(){
					  $("#PublicacionExitosa").modal('hide');
					}, 6000);
				$("#misPartidos>tr").empty();
				obtenerMisPartidos($("#btnRegistrarPartido").val());
			}
						
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

}




function validarSiFechaNoEsPasada(){
	var fechahoy=new Date();//fecha de hoy
	var fechaingresada=GDIA;
	var fechaingresadasplit=fechaingresada.split("-")//spliteo la fecha string con el -
	var fechaingresadaobjeto=new Date();//creo un objeto date
	fechaingresadaobjeto.setFullYear(fechaingresadasplit[0],fechaingresadasplit[1]-1,fechaingresadasplit[2]);//no olvidar restar 1 al mes para poder comparar
	// agregar los datos spliteados al objeto fecha.


	var expresion = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
	var resultado=expresion.test(fechaingresada);
	if (!estaVacio(fechaingresada)) {
		mostrarError($("#errorDeFechaseleccionada"),"La fecha no debe quedar vacia");
		return false;

	}
	else if (fechaingresadaobjeto<=fechahoy) //se compara dos objetos de tipo Date
	{
		mostrarError($("#errorDeFechaseleccionada"),"La fecha del partido debe ser superior a la de hoy");
		return false;
	}

	else if (!resultado) {
		mostrarError($("#errorDeFechaseleccionada"),"La sintaxis de la fecha es incorrecta");
		return false;
	}
	else {
		return true;
	}
}


function registrarPartido(id_user,date,time,futbol_type){
	var parametros={"id_usuario":id_user,"dia":date,"hora":time,"tipo_de_futbol":futbol_type};
	$.ajax
	({
		data: parametros,
		url: "php/registrarPartido.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("#formOrganizarPartido")[0].reset();
				$("#MRegistroCorrectoPartido").modal("show");
				setTimeout(function(){
					  $("#MRegistroCorrectoPartido").modal('hide');
					}, 2000);
				$("#misPartidos>tr").empty();
				obtenerMisPartidos($("#btnRegistrarPartido").val());
			}
			else{
				mostrarError($("#errorDeFechaseleccionada"),response.error);
			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});

}

function obtenerDiaActual()
{
	var date = new Date();
	GDIA = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function obtenerCalendario()
{
	$("#CalendarioWeb").fullCalendar
	({
		dayClick:function (dia,jsEvent,view)
		{
			limpiarAdvertencia();
			GDIA=dia.format();
			$("td").removeClass('diaseleccionado');//agregar estilos a los dias cuando se seleccionan
			$(this).addClass('diaseleccionado');
		}
	});
}

function obtenerTipoFutbol()
{
	var parametros={"funcion":"traerLasTiposDeFutbol"};
	$.ajax
	({
		data: parametros,
		url: "php/traerTiposDeFutbol.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
				 $("#tipoFutbol").append('<option value='+this.ID_TIPO+'>'+this.TIPO+'</option>');
			});
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}





function estaVacio(valor){
	var expresion=/\S+/g;//expresion que da false cuando solo hay espacios inclusive si apretas muchas vece la barra espaciadora.
	resultado=expresion.test(valor);
	return resultado;
} 

function mostrarError(idspan,msje){
	var errores=idspan;
	errores.removeClass("oculto");
	errores.html(msje);

}
function limpiarAdvertencia () {
	var errores=[$("#errorDeFechaseleccionada"),$("#errorDeBusquedaCancha"),$("#errorDeHoraseleccionada"),$("#errorDeFutbolseleccionado"),$("#errorDetallePublicacion"),$("#errorPublicacionServidor")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});
	
}