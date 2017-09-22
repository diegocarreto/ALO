$(document).ready(function () {


    CallRest("POST",
              "GetProducts",
              "{'Token':'" + Environment.ApiToken + "'}",
              function (r) {

                  if (r.isCorrect) {

                      var list = r.list;

                      for (var i = 0; i < list.length; i++) {

                          var product = list[i];

                          $("#tData tr:last").after("<tr><td><img src='../../" + product.Image + "' alt='" + product.Name + "' title='" + product.Name + " " + product.Measure + " " + product.Kg + "Kg a $" + product.Price + "' /></td><td>" +
                                                     product.IdProduct + "</td><td>" +
                                                     product.Name + "</td><td>" +
                                                     product.Kg + "</td><td>" +
                                                     FMoney(product.Price) + "</td><td>" +
                                                     "<input data-id='" + product.IdProduct + "' data-kg='" + product.Kg + "' data-price='" + product.Price + "' class='inputT amountInput' type='text' value='0' placeholder='Cantidad' required /></td>" +
                                                     "<td class='Kg'><span id='Kg_" + product.IdProduct + "'>0</span>" + "</td>" +
                                                     "<td class='price'><span id='Price_" + product.IdProduct + "'>0</span>" + "</td></td>" +
                                         "</tr>");

                      }
                  }
                  else {

                      AlertJQ(r.message);
                  }
              },
              function (e1, e2, e3) {

                  AlertJQ(e3);
              });

    $('.table-users').on('keydown', '.amountInput', function (e) {

        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
        /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey)
        || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode)
        && e.preventDefault()
    });


    $(".table-users").on("keyup", ".amountInput", function (e) {

        var id = $(this).data("id")
            kg = $(this).data("kg"),
            price = $(this).data("price"),
            amount = $(this).val();

        var totalKg = kg * amount,
            priceTotal = price * amount;

        $("#Kg_" + id).text(totalKg);
        $("#Price_" + id).text(FMoney(priceTotal));

        var price = 0;
       
        $(".price").each(function () {

            var value = $(this).text().replace("$", "").replace(",", "");

            if (!isNaN(value) && value.length != 0) {
                price += parseFloat(value);
            }
        });

        $("#priceTotal").text(FMoney(price));

    });

    $('#next').on("click", function (e) {
        location.href = "send.html";
    });
});

function FMoney(total) {

    var neg = false;
    if (total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}