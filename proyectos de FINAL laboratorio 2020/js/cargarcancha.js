
$(document).ready(function()
{
	traertodasMisCanchas($("#idUsuario").val());
	//validarImagenes();
	$("#formCargaCancha").submit(function(event) {
		event.preventDefault();
				if (validarCancha()) {
					cargarCanchaNueva();
				}
				});
	$("select,input").click(function(event){
						limpiarAdvertencia();
					});
	$('[data-toggle="tooltip"]').tooltip();
	$("#irACancha").click(function(event) {
		$("#modalCargaCancha").modal("show");
		$("#btnRegistrarCancha").val($("input:radio[name=optradio]:checked").val());
		/* $("input:radio[name=optradio]:checked").val() */
	});
});
//--
function validarCancha(){
	if (!estaVacio($("#tipo").val()) || $("#tipo").val()==undefined) {
		mostrarError($("#errorTipoCanchaCarga"),"EL campo Tipo de Cancha no debe quedar vacio.");
		return false;
	}
	else if (!estaVacio($("#precioCancha").val())||$("#precioCancha").val()==undefined) {
		mostrarError($("#errorPrecioCancha"),"El campo Precio no debe quedar vacio.");
		return false;
	}
	else if (isNaN($("#precioCancha").val())) {
		mostrarError($("#errorPrecioCancha"),"El Precio de la cancha no es un numero.");
		return false;
	}
	else{
		return true;
	}
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
	var errores=[$("#errorTipoCanchaCarga"),$("#errorPrecioCancha"),$("#errorImagenCancha"),$("#errorCargaCanchaServidor")];
	$.each(errores, function(index, val) {
		val.addClass("oculto");
		val.html("");
	});

}

//--



function traerMisEstablecimientos(idusuario){
	var parametros={"id_usuario":idusuario};
	$.ajax
	({
		data:parametros,
		url: "php/traerMisEstablecimientos.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$.each(response.datos, function (){
					$('#todosLosEstablecimientos').prepend("<div class='radio'><label><input type='radio' name='optradio' checked value='"+this.ID_ESTABLECIMIENTO+"'>"+this.BARRIO+" ("+this.nombre+","+this.nombre_provincias+" )</label> </div>");
				});
				validarImagenes();
				/*$("#formCargaCancha").submit(function(event) {
					alert();
					event.preventDefault();
					cargarCanchaNueva();
				});*/
			}
			else{

			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

function validarImagenes(){
	   $("#archivos").change(function(){

        var fileLength = this.files.length;
        var match= ["image/jpeg","image/png","image/jpg"];
        var ok=true;
        var i;
	        for(i = 0; i < fileLength; i++){
	            var file = this.files[i];
	            var imagefile = file.type;
	            if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]) )){
	                ok=false;

	            }
	        }
	    if (!ok) {
	    	modalMensajePropietario("Error en el formato de las imagenes","Las imagenes permitidas son jpeg, jpg y png.");
	                $("#modalMensajePropietario").modal("show");
	                $("#archivos").val('');
	    }

    	});
}

function modalMensajePropietario(titulo,error){
	$("body").append('<div id="modalMensajePropietario" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+titulo+'</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')
}


function cargarCanchaNueva() {
	var archivos = document.getElementById("archivos");
	var archivo = archivos.files;
	var archivos = new FormData();

	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i],);
	}

    archivos.append("idestablecimiento",$("#btnRegistrarCancha").val());
    archivos.append("precio",$("#precioCancha").val());
    archivos.append("tipo",$("#tipo").val());

    $.ajax({
        url: 'php/cargarCancha.php',
        dataType: 'text',
        data: archivos,
        type: 'post',
        processData:false,
        cache:false,
        contentType: false,
        success: function(response){
        	var respuesta=JSON.parse(response);//si me trae un json como estring hay q usar esta funcion
        	if (respuesta["error"]=="NO") {
        		modalMensajePropietario("Carga Exitosa","La cancha fue registrada correctamente");
        		$("#modalMensajePropietario").modal("show");
        		$("#formCargaCancha")[0].reset();
        		traertodasMisCanchas($("#idUsuario").val());
        	}
        	else {
        		modalMensajePropietario("Error en el formato,en la cantidad de imagenes, o el tamaño de las mismas","Las imagenes permitidas son jpeg, jpg y png, la cantidad minima requerida es de 2 y de maxima 10, y el tamaño permitido es hasta 4mb.");
	                $("#modalMensajePropietario").modal("show");
	                $("#archivos").val('');
        	}
        }
     });


}

function traertodasMisCanchas(idusuario)
{
	var parametros={"idusuario":idusuario};
	$.ajax
	({
		data: parametros,
		url: "php/traertodasMisCanchas.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$("#canchasFiltradas").empty();
			if (response.error=="NO") {

				$("#canchasFiltradas").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-primary"><div class="panel-heading">Canchas</div><div class="panel-body"><div class="table-responsive"><table class="table table-bordered"><thead><tr><th class="success">Localidad</th><th class="success">Barrio</th><th class="success">Direccion</th><th class="success">Tipo De Futbol</th><th class="success">Informacion Completa</th></tr></thead><tbody id="lasCanchas"></tbody></table></div></div></div></div>');
				$("#lasCanchas").empty();
				$.each(response.datos, function() {
					$("#lasCanchas").append('<tr><td>'+this.nombre+'</td><td>'+this.BARRIO+'</td><td>'+this.DIRECCION+'</td><td>'+this.TIPO+'</td><td><button type="button" name="btn_mas_info" class="btn btn-info" value='+this.ID_CANCHA+'>Ver info completa</button></td></tr>');

				});
			}
			else{
				var message = $('<div class="alert alert-danger  alert-dismissible text-center error_message"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+response.error+'</div>');
				message.appendTo($('#canchasFiltradas')).fadeIn(300).delay(5000).fadeOut(500);
			}
			$("[name=btn_mas_info]").click(function(event) {
				//$("#canchaResultado").removeClass("oculto");
				obtenerDatosCancha($(this).val());
    		});

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}

