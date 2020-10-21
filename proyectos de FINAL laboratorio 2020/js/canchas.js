$(document).ready(function(){
	$("#buscarCancha").click(function buscarCanchas(){
		//console.log("entro en el click");
		$("#error").html("");
		$("#resultBusqueda").html("");
		
		var x = $("#busquedaCancha").val();
		($("#tOrganizarPartido").val("1"));
		($("#tUnirsePartido").val("2"));
		($("#tMisPartidos").val("3"));

		$.ajax({
			type: "POST",
			url: "js/canchas.json",
			dataType: "json",
			success: function(canchas){
				//Evaluamos las paginas
				//Si estamos en la pagina de Organizar partidos
				if ($("#tOrganizarPartido").val() == "1") {
					$.each(canchas, function(i, cancha){
						
						if (x == cancha.nombre){
							$("#error").hide();
							$("#resultBusqueda").show();
							
							$("#resultBusqueda").append(
								//creo el <div> para agregar la imagen
								$("<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'></div>").append(
									"<br><img src='imagenes/cancha1-1.jpg' style='height: 75%; width: 90%;'>"),

								//creo el <div> para agregar el textarea junto con los datos del JSON, inputs de fecha y un señect de hora
								$("<div class='col-xs-2 col-sm-3 col-md-4 col-lg-4'></div>").append(
									$("<br><textarea class='informacion' name='informacion' id='informacion' cols='30' rows='10'></textarea><br>").text("Nombre: " + cancha.nombre + "\n\r" + "Tipo de cancha: " + cancha.tipo_cancha + "\n\r" + "Dirección: " + cancha.direccion + "\n\r" + "Precio: " + cancha.precio + "\n\r" + "Teléfono: " + cancha.telefono).attr("disabled",true),
									$("<input type='date' id='fecha' name='fecha'><br>"),
									$("<label for='select-hora'>Seleccione el horario de reserva:</label><br>"),
									$("<select id='horarioDisponible' name='horarioDisponible'><option value='#''></option><option value='hr-1'>14hs</option><option value='hr-2'>15hs</option><option value='hr-3'>16hs</option><br>")
									),
								//creo el <div> para agregar el boton que te lleve al paso 2 de organizar partido
								$("<div class='col-xs-1 col-sm-2'></div>").append(
									$("<br><button class='btn btn-secondary p-1' type='submit' id='btnPaso2'>Siguiente</button><br><br>")
									),
							)
						}
					});
					//En caso de que estemos en la pagina Unirse a Partido
				} else if ($("#tUnirsePartido").val() == "2") {
					$.each(canchas, function(i, cancha){
						//Si es la pantalla "Unirse a partidos, cambio el nombre del boton por Unirse a partodo
						if (x == cancha.nombre){
							$("#error").hide();
							$("#resultBusqueda").show();
							
							$("#resultBusqueda").append(
								//creo el <div> para agregar la imagen
								$("<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'></div>").append(
									"<br><img src='imagenes/cancha1-1.jpg' style='height: 75%; width: 90%;'>"),

								//creo el <div> para agregar el textarea junto con los datos del JSON, inputs de fecha y un señect de hora
								$("<div class='col-xs-2 col-sm-3 col-md-4 col-lg-4'></div>").append(
									$("<br><textarea class='informacion' name='informacion' id='informacion' cols='30' rows='10'></textarea><br>").text("Nombre: " + cancha.nombre + "\n\r" + "Tipo de cancha: " + cancha.tipo_cancha + "\n\r" + "Dirección: " + cancha.direccion + "\n\r" + "Precio: " + cancha.precio + "\n\r" + "Jugadores confirmados: " + cancha.jugadores_confirmados).attr("disabled",true),
									$("<input type='date' id='fecha' name='fecha'><br>"),
									$("<label for='select-hora'>Seleccione el horario de reserva:</label><br>"),
									$("<select id='horarioDisponible' name='horarioDisponible'><option value='#''></option><option value='hr-1'>14hs</option><option value='hr-2'>15hs</option><option value='hr-3'>16hs</option><br>")
									),
								//creo el <div> para agregar el boton que te lleve al paso 2 de organizar partido
								$("<div class='col-xs-1 col-sm-2'></div>").append(
									$("<br><button class='btn btn-secondary p-1' type='submit' id='btnPaso2'>Unirse a partido</button><br><br>")
									),
							)
						}
					});
				} else if ($("#tMisPartidos").val() == "3") {
					$.each(canchas, function(i, cancha){
						//Si es la pantalla "Unirse a partidos, cambio el nombre del boton por Unirse a partodo
						$("#error").hide();
						$("#resultBusqueda").show();
							
						$("#resultBusqueda").append(
							//creo el <div> para agregar la imagen
							$("<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'></div>").append(
								"<br><img src='imagenes/cancha1-1.jpg' style='height: 75%; width: 90%;'>"),

							//creo el <div> para agregar el textarea junto con los datos del JSON, inputs de fecha y un señect de hora
							$("<div class='col-xs-2 col-sm-3 col-md-4 col-lg-4'></div>").append(
								$("<br><textarea class='informacion' name='informacion' id='informacion' cols='30' rows='10'></textarea><br>").text("Nombre: " + cancha.nombre + "\n\r" + "Tipo de cancha: " + cancha.tipo_cancha + "\n\r" + "Dirección: " + cancha.direccion + "\n\r" + "Precio: " + cancha.precio + "\n\r" + "Jugadores confirmados: " + cancha.jugadores_confirmados).attr("disabled",true),
								$("<input type='date' id='fecha' name='fecha'><br>"),
								$("<label for='select-hora'>Seleccione el horario de reserva:</label><br>"),
								$("<select id='horarioDisponible' name='horarioDisponible'><option value='#''></option><option value='hr-1'>14hs</option><option value='hr-2'>15hs</option><option value='hr-3'>16hs</option><br>")
								),
							//creo el <div> para agregar el boton que te lleve al paso 2 de organizar partido
							$("<div class='col-xs-1 col-sm-2'></div>").append(
								$("<br><button class='btn btn-secondary p-1' type='submit' id='btnPaso2'>Unirse a partido</button><br><br>")
								),
						)
						
					});	
				}
				//En caso de que este vacio
				if ($("#resultBusqueda").html() == "") { 
						$("#resultBusqueda").hide();
						$("#error").show();
						$("#error").append(
							$("<h1 class='titulo'>Lo siento, su busqueda no fue encontrada. Por favor vuelva a intentarlo ingresando nombre de la cancha, tipo de cancha, direccion o precio</h1>")
							);
					};
			}


		});
		var info = $("#informacion").val();
		//console.log(info);
		return info;
	});










	
	$("#btnPaso2").submit(function(){
		console.log(buscarCanchas());
	})

	$("#organizarPartido").click(function(e){
		e.preventDefault();
		var gruposInvitados = [];
		$.each($("#grupo:checked"), function(){
			gruposInvitados.push($(this).val() + ", ");
		});
		console.log(gruposInvitados);
		console.log("Enviado!");
	});


	



	//probando parseo de hecha y hora
	$(function parsearFecha(){
		var fechaActual = new Date();
		var dd = fechaActual.getDate(); 
		var mm = fechaActual.getMonth()+1; 
		var yyyy = fechaActual.getFullYear();

		if(dd<10) 
		{
		    dd='0'+dd;
		} 

		if(mm<10) 
		{
		    mm='0'+mm;
		} 

		fechaActual = mm + '/' + dd + '/' + yyyy;
		console.log(fechaActual);
	});

	$(function parsearHora(){
		horaActual = new Date();
		hh = horaActual.getHours();
		mm = horaActual.getMinutes();
		ss = horaActual.getSeconds();
		horaActual = hh + ":" + mm + ":" + ss;	
		console.log(horaActual);
	});

});


//$("<div class='col-sm-5'><img src='imgs/Lo voy a gozar como no lo puedes imaginar.png' style='height: 40%; width: 50%;'></div>")