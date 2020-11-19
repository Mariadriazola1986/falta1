$(document).ready(function(){
    obtenerUsuariosRegistrados();
});

function obtenerUsuariosRegistrados(){
    $.ajax
    ({
        url: "php/traerUsuariosRegistrados.php",
        type: "POST",
        dataType: "json",
        success: function (response) {
                if (response.length>0) {
                    $.each(response, function(){
                        // Mustro los usuarios registrados en la tabla
                        $("#tablaUsuariosRegistrados").append($("<tr></tr>").append(
                            $("<td></td>").text(this.NOMBRE),
                            $("<td></td>").text(this.EMAIL),
                            $("<td></td>").text(this.NOMBRE_TIPO),
                            $("<td></td>").text(this.ESTADO),
                            $("<td></td>").append(
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').text("Alta de usuario"),
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("data-target", '#modalRegistro').text("Modificar usuario"),
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').text("Baja de usuario"))
                            ));
                    })
                    // Aca llamo a la funcion que haga el ABM de usuarios
                    abmUsuario();
                }
                else{
                    $("#tablaUsuariosRegistrados").append(($("<tr></tr>").append(
                        $("<td colspan='6'></td>").append(
                            $("<div></div>").attr('class', 'alert alert-info').append(
                                $("<strong></strong>").text('Lo siento, no existen usuarios registrados que no sea usted ')))
                        )));
                }
        },
        error: function(xhr, status, error){
                console.log(error);
                console.log("Pincho y no se por qué :v");
        }
    });
}
//Estuve intentando hacer que apareciera el modal que no funcionaba
function abmUsuario(){
    $("table tbody tr td button").click(function(){
        var id = this.id;
        $("#modalRegistro").modal("show");
        
    });

}