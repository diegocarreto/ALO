$(document).ready(function () {
   
    $('#comentarios').val('').blur();

    $("#nombre").focus();

    $('#send').on("click", function (e) {
        location.href = "cot.html";
    });
});