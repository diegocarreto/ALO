$(document).ready(function () {

    $('#next').on("click", function (e) {
        location.href = "send.html";
    });


    $('#Add').on("click", function (e) {
        ViewEdit("formularioProductos");
    });

    $(".table-users").on("click", ".deleteIcon", function (e) {

        var control = $(this),
        name = GetValueColumn(control, 2);

        try {

            e.preventDefault();

            ConfirmJQ2(this,
					   "¿Deseas eliminar el producto  [<b>" + name + "</b>]?",
					   function (e) {

					       control.parent().parent().remove();
					       control = null;
					       name = null;
					   },
					   function (e) {

					       control = null;
					       name = null;
					   });
        }
        finally {

        }
    });

});


function ViewEdit(Id) {

    ShowEdit(Id,
             390,
             function () {

                 var planta = $("#planta").val(),
                     marca = $("#marca").val(),
                     linea = $("#linea").val(),
                     producto = $("#producto").val(),
                     medida = $("#medida").val(),
                     total = $("#total").val();

                 var unitario = 2450,
                     precio = unitario * total;

                 $("#tData tr:last").after("<tr><td><img src='http://test.alopruebas.com.mx/Content/img/caballo/royal-horse-b-150-25.png' alt='Producto' /></td><td>" +
                                                        planta + "</td><td>" +
                                                        marca + "</td><td>" +
                                                        linea + "</td><td>" +
                                                        producto + " [" + medida + "]</td><td>" +
                                                        "$" + unitario + "</td><td>" +
                                                        total + "</td><td>" +
                                                        "$" + precio + "</td><td class='tdCenter'>" +
                                                        "<img class='btnTable deleteIcon' src='img/delete-icon.png' title='Borrar' />" +
                                                        "&nbsp;&nbsp;" +
                                                        "<img class='btnTable' src='img/Edit-icon.png' title='Editar' />" +
                                                        "</td>" +
                                            "</tr>");


                 $("#" + Id).dialog("close");

                 CleanForm(Id);

             },
             290,
             "accept",
             "modalCancel");
}