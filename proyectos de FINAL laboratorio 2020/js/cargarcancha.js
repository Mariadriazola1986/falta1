
$(document).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip(); 
	$("#irACancha").click(function(event) {
		$("#modalCargaCancha").modal("show");
		$("#btnRegistrarCancha").val($("input:radio[name=optradio]:checked").val());
		/* $("input:radio[name=optradio]:checked").val() */
	});
});


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
					$('#todosLosEstablecimientos').prepend("<div class='radio'><label><input type='radio' name='optradio' checked value='"+this.ID_ESTABLECIMIENTO+"'>"+this.DISTRITO+"</label> </div>");
				});
				validarImagenes();
				$("#formCargaCancha").submit(function(event) {
					event.preventDefault();			
					cargarCancha();
				});
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
	   	$("#modalMensajePropietario").modal("hide");
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
	    	modalError("Error en el formato de las imagenes","Las imagenes permitidas son jpeg, jpg y png.");
	                $("#modalMensajePropietario").modal("show");
	                $("#archivos").val('');
	    }

    	});
}

function modalMensajePropietario(titulo,error){
	$("body").append('<div id="modalMensajePropietario" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+titulo+'</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')
}


function cargarCancha() {
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
        	modalMensajePropietario("Carga Exitosa","La cancha fue registrada correctamente");
        	$("#modalMensajePropietario").modal("show");
        	$("#formCargaCancha")[0].reset();
        }
     });  


}

function registrarEstablecimiento(idusuario,direccion,distrito,telefono){
	var parametros={"idusuario":idusuario,"direccion":direccion,"distrito":distrito,"telefono":telefono};
	$.ajax
	({
		data:parametros,
		url: "php/registrarEstablecimiento.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			if (response.error=="NO") {
				$("body").append('<div class="modal fade" id="establecimientoRegistradoCorrectamenteEmail" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Registro Correcto</h4></div><div class="modal-body"><h4>Tu establecimiento se registro correctamente.</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>')
				$("#establecimientoRegistradoCorrectamenteEmail").modal("show");
				$("#queMostrarAPropietario").empty();
				estaActiva($("#idUsuario").val());
			}
			else{

			}
		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}


