$(document).ready(function () {

    $(".noticias-slider-circulo").on("click", function () {

        var $class = $(this).data("class");

        $(".NewsOne, .NewsTwo, .NewsThree").hide();

        $("." + $class).show();

    });
});