//creo una variable global usuariosRegistrados, del cual voy a guardar la lista de usuarios registrados en el sistema para luego usarlo en la funcion abmUsuario
var usuariosRegistrados = new Array();

$(document).ready(function(){
    obtenerUsuariosRegistrados();
    AltaBaja();


    $("#formUsuario").submit(function(event){
        event.preventDefault();

        modificarUsuario();
        
    })

});

function obtenerUsuariosRegistrados(){
    //var botones = new Array();
    $("#tablaUsuariosRegistrados").html("");
    $.ajax
    ({
        url: "php/traerUsuariosRegistrados.php",
        type: "POST",
        dataType: "json",
        success: function (response) {
                if (response.length>0) {
                    $.each(response, function(){
                        // Guardo estos usuarios en un Array para usarlo al momento de modificar al usuario seleccionado
                        usuariosRegistrados.push({'id_usuario': this.ID_USUARIO, 'nombre': this.NOMBRE, 'email': this.EMAIL, 'estado': this.ESTADO});       
                        // Antes de mostrar los usuarios en la tabla, pregunto por estado de usuario para crear los botones con su funcionalidad correspondiente            
                        if (this.ESTADO == 'activo') {
                            // Mustro el registro del usuarios traido de la BD en la tabla de usuarios que quiero mostrar en pantalla
                            $("#tablaUsuariosRegistrados").append($("<tr></tr>").append(
                                $("<td></td>").text(this.NOMBRE),
                                $("<td></td>").text(this.EMAIL),
                                $("<td></td>").text(this.NOMBRE_TIPO),
                                $("<td></td>").text(this.ESTADO),
                                $("<td></td>").attr("id", 'selectBoton').append(
                                    // Como el estado del usuario es 'activo', los botones que voy a mostrar en pantalla son: Baja de usuario con el valor = 3 y modificar usuario con el valor = 2
                                    $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("value", '3').text("Baja de usuario"),
                                    $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("data-target", '#modalModificarUsuario').attr("value", '2').text("Modificar usuario"))
                                ));
                        }
                        else if ( (this.ESTADO == 'inactivo') || (this.ESTADO == 'de baja') ) {
                            // Mustro el registro del usuarios traido de la BD en la tabla de usuarios que quiero mostrar en pantalla
                            $("#tablaUsuariosRegistrados").append($("<tr></tr>").append(
                                $("<td></td>").text(this.NOMBRE),
                                $("<td></td>").text(this.EMAIL),
                                $("<td></td>").text(this.NOMBRE_TIPO),
                                $("<td></td>").text(this.ESTADO),
                                $("<td></td>").attr("id", 'selectBoton').append(
                                    // Como el estado del usuario es 'inactivo' o 'de baja', los botones que voy a mostrar en pantalla son: Alta de usuario con el valor = 1 y modificar usuario con el valor = 2
                                    $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("value", '1').text("Alta de usuario"),
                                    $("<button></button>").attr("id", this.ID_USUARIO).attr("class", 'btn btn-info').attr("data-target", '#modalModificarUsuario').attr("value", '2').text("Modificar usuario"))
                                ));
                        }
                    })
                    
                    //console.log(usuariosRegistrados);
                    
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
                console.log("Pincho. Averiguá el por qué :v");
        }
    });
}

//Por ahora estoy haciendo que solo modifique los usuarios
function abmUsuario(){
    $("#selectBoton button").click(function(){
        //Guardo el id y value del boton que aprete en variables para luego dar funcionalidad al ABM
        var id = this.id;
        var valor = this.value;
        // Si valor es igual a 1, estoy dando de de alta al usuario
        if (valor == 1) {
            $("#estado_cambio").text("Esta seguro que quiere dar de alta el usuario?");

            $("#modal_confirmar").modal("show");

            $("#modal_confirmar button[name='dijo_si']").attr("value",1).attr("id",id);


        }
        // Si valor es igual a 2, estoy modificando los datos del usuario
        else if (valor == 2) {
            $("#modalModificarUsuario").modal("show");
            //Recorro la lista de usuarios registrados que guarde anteriormente para mostrar en pantalla el nombre de usuario y el email (mientras hago la modificacion)
            for (i in usuariosRegistrados) {
                if (usuariosRegistrados[i].id_usuario == id) {
                    $("#usuario").attr('placeholder', usuariosRegistrados[i].nombre);
                    $("#email").attr('placeholder', usuariosRegistrados[i].email);


                    $("#modal_confirmar_modificacion button[name='confirmo']").attr("value",id);


                }
            }
        }
        // Si valor es igual a 3, estoy dando de baja al usuario
        else if (valor == 3) {
            $("#estado_cambio").text("Esta seguro que quiere dar de baja el usuario?");

            $("#modal_confirmar").modal("show");

            $("#modal_confirmar button[name='dijo_si']").attr("value",2).attr("id",id);
        }
    });
}

function AltaBaja(){
    $("#modal_confirmar button[name='dijo_si']").click(function(){

        var enviar={"id_usuario":this.id};

        if (this.value==1) {

            $.ajax({
                url:"php/altaUsuarioRegistrado.php",
                dataType:"json",
                data:enviar,
                type:"POST",
                success:function(result){
                    if (result.error=="NO") {
                        $("#modal_confirmar").modal("hide");
                        $("#actualizacion_correcta").modal("show");
                        obtenerUsuariosRegistrados();
                    }  

                },
                error: function(xhr, status, error){
                    console.log(error);
                    console.log("Pincho. Averiguá el por qué :v");
                }
            })
        }
        else if (this.value==2) {

            $.ajax({
                url:"php/bajaUsuarioRegistrado.php",
                dataType:"json",
                data:enviar,
                type:"POST",
                success:function(result){
                    if (result.error=="NO") {
                        $("#modal_confirmar").modal("hide");
                        $("#actualizacion_correcta").modal("show");
                        obtenerUsuariosRegistrados();
                    }
                    

                },
                error: function(xhr, status, error){
                    console.log(error);
                    console.log("Pincho. Averiguá el por qué :v");
                }
            })

        }    

    })
}


function modificarUsuario(){

    $("#modal_confirmar_modificacion").modal("show");

    $("#modal_confirmar_modificacion button[name='confirmo']").click(function(){
        $("#modalModificarUsuario").modal("hide");

        var modificacion = {"usuario":$("#usuario").val(),"email":$("#email").val(),"id":this.value};

        $.ajax({
            url:"php/actualizarInfoUsuarioRegistrado.php",
            type:"POST",
            data:modificacion,
            dataType:"json",
            success:function(result){
                if (result.error=="NO") {
                    $("#modal_confirmar_modificacion").modal("hide");
                    $("#actualizacion_correcta").modal("show");
                    $("form")[0].reset();
                    obtenerUsuariosRegistrados();
                }
                
            },
            error: function(xhr, status, error){
                console.log(error);
                console.log("Pincho. Averiguá el por qué :v");
            }
        })
    })
}