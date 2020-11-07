
$(document).ready(function()
{
	traerPublicaciones();
});

function traerPublicaciones()
{
	//var parametros={"funcion":"traerLasTiposCanchas"};
	$.ajax
	({
		data:"",
		url: "php/traerPublicaciones.php",
		//contentType: "application/json",
		type: "POST",
		dataType: "json",
		beforeSend: function () {

		},
		success:  function (response) {
			$.each(response, function() {
				 $("#publicacionesMostradas").append('<div class="panel panel-primary"><div class="media"><div class="media-left"><img src="imagenes/pelota.jpg" class="media-object" style="width:60px"></div><div class="media-body"><h4 class="media-heading">Fecha Del Partido:'
				 	+this.FECHA+'</h4><h4 class="media-heading" >Hora:'+this.HORA+' a '+
				 	this.HORA_FIN+'</h4><h4 class="media-heading">Tipo de Futbol: '+this.TIPO+
				 	'</h4><p>'+this.COMENTARIOS+'</p><button class="btn btn-success" value='+this.ID_PARTIDO+
				 	' name="btn_sumate_a_publicacion">Sumate</button></div></div></div>');
			});
			$("[name=btn_sumate_a_publicacion]").click(function(event) {
				$("#anotarteAPublicacion").modal("show");
				$("#btnregistrarinvitado").val($(this).val());

    			
    		});

		},
		error: function (xhr, status, error) {
			console.log(error);
		}
	});
}



