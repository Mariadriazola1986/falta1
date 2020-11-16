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
                    $.each(response, function(){
                        $("#tablaUsuariosRegistrados").append($("<tr></tr>").append(
                            $("<td></td>").text(this.NOMBRE),
                            $("<td></td>").text(this.EMAIL),
                            $("<td></td>").text(this.NOMBRE_TIPO),
                            $("<td></td>").text(this.ESTADO),
                            $("<td></td>").append(
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').text("Dar de alta usuario"),
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("data-target", '#modalRegistro').text("Modificar usuario").on("click", function(){
                                    console.log("Entro en el boton");
                                }),
                                $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').text("Dar de baja usuario"))
                            ));
                    })
            },
            error: function(xhr, status, error){
                    console.log(error);
                    console.log("Pincho y no se por qué :v");
            }
        });
    }
