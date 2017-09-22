var Asc = true;
$col = null;
Total = 0,
GeneralCompanyLoaded = false;

function EnvironmentBase(DefaultUrl) {

    this.ApiToken = "";

    this.UrlRest = "http://localhost:52856/Cot/";

    this.Cookie = window.name;

    this.DefaultUrl = (DefaultUrl == null) ? "" : DefaultUrl;

    this.GetApiToken = function () {

        this.ApiToken = GetQueryString("token", this.Cookie);
    }

    this.GetUser = function () {

        this.User = GetQueryString("User", this.Cookie);
    }

    this.GetIdUser = function () {

        this.IdUser = GetQueryString("IdUser", this.Cookie);
    }

    this.GetUserName = function () {

        this.UserName = GetQueryString("UserName", this.Cookie);
    }

    this.Logout = function () {

        this.ApiToken = "";
        this.Cookie = "";

        window.name = "";

        location.href = this.DefaultUrl;
    }

    if (GetCurentFileName() != this.DefaultUrl) {

        if (this.Cookie != "" && window.name != "") {

            this.GetApiToken();
        }
        else {

            location.href = this.DefaultUrl;
        }
    }

}
var Environment = new EnvironmentBase("login.html");

$(document).ready(function () {

    SetRules();

    $("#btnLogout").on("click", function (e) {

        e.preventDefault();

        Environment.Logout();
    });

    $("#userName").html(Environment.UserName);

    $("textarea").val("");

    $("#new").on("click", function (e) {

        e.preventDefault();

        ViewEdit();
    });

    $("#preLoading").hide();

    $("form").fadeIn("slow");

    $(".hOrder").on("click", function (e) {

        e.preventDefault();

        $col = $(this);

        $(".hOrder").css({ "background": "#275d93" });

        $col.css({ "background": "#79c151" });

        Order(true);
    });

    if ($("#file").length) {

        $("#file").on("change", function (event, files, label) {

            var URL = window.webkitURL || window.URL,
                file = this.files[0];

            if (file != null) {

                if (!IsValidExtensionFileUpload(file.name, "gif,jpg,png,jpeg")) {

                    $("#file").val("");

                    AlertJQ("El archivo <strong>" + file.name + "</strong> no es una imagen valida");
                }
                else {

                    var FR = new FileReader();

                    FR.onload = function (e) {

                        var dataUrl = e.target.result.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');

                        $("#preview").attr('src', 'data:image/png;base64,' + dataUrl);

                        $("#preview").attr('data-Name', file.name);
                        $("#preview").attr('data-ContentType', file.type);
                        $("#preview").attr('data-Url', dataUrl);

                    };

                    FR.readAsDataURL(file);
                }
            }
        })
    }
});

function UploadImage(EntityName, EntityId, FunctionSuccess, FunctionError) {

    var image = $("#preview").attr('data-Url');

    var obj = {
        EntityName: EntityName,
        EntityId: EntityId,
        ImageData: image
    };

    CallRest("POST",
            "Imagenes",
            JSON.stringify(obj),
            function (respose) {

                if (FunctionSuccess != null)
                    FunctionSuccess(respose);
            },
            function (respose, erer, fdss) {

                if (FunctionError != null)
                    FunctionError(respose, erer, fdss);
            });
}

function SetRules() {

    $(".intEval").keydown(function (e) {
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".decEval").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('textarea[maxlength]').keyup(function () {

        var limit = parseInt($(this).attr('maxlength')),
			text = $(this).val(),
			chars = text.length;

        if (chars > limit) {

            var new_text = text.substr(0, limit);
            $(this).val(new_text);
        }
    });
}

function ShowEdit(Id, Height, FunctionAccept, Width, IdButtonAccept, IdButtonCancel) {

    var messageError;

    Width = (Width == undefined ? 290 : Width);
    IdButtonAccept = (IdButtonAccept == undefined ? "accept" : IdButtonAccept);

    ShowModal(Id,
			  IdButtonAccept,
			  Width,
			  Height + (Id != null ? 14 : 0),
			  function () {

			      messageError = ValidateForm(Id);

			      if (messageError === "") {

			          HideAlertJQ();

			          if (FunctionAccept != undefined && typeof FunctionAccept == "function")
			              FunctionAccept();
			      }
			      else {

			          AlertJQ(messageError);
			      }
			  }, function () {

			      CleanForm(Id);
			      HideAlertJQ();
			  },
			  IdButtonCancel);
}

function CleanForm(FrmName) {

    var input;

    try {

        $("#" + FrmName + " input,#" + FrmName + " textarea,#" + FrmName + " select").each(function (index) {

            input = $(this);

            switch (input.prop('type')) {
                case "select-one":

                    input.find('option:first').attr('selected', 'selected').trigger("change");

                    break;

                case "text":

                    if (input.prev().prop('tagName') != "SELECT")
                        input.val("");

                    break;

                case "textarea":

                    input.val("");

                    break;

                case "file":

                    input.val("");

                    break;
            }
        }
		);

    }
    finally {

        input = null;
    }
}

function ValidateForm(FrmName) {

    var message = "",
		input,
		textForType = "";

    try {

        $("#" + FrmName + " input,#" + FrmName + " textarea,#" + FrmName + " select").filter("[required]:visible:enabled").each(function (index) {

            input = $(this);

            switch (input.prop('type')) {
                case "select-one":

                    if (input[0].selectedIndex === 0)
                        textForType = "Seleccione el valor para el campo:";

                    break;

                case "text":

                    if (input.val() === "")
                        textForType = "Proporcione el valor para el campo:";

                    break;

                case "textarea":

                    if (input.val() == "")
                        textForType = "Provide the value of the field";

                    break;

                case "file":

                    if (input.val() === "")
                        textForType = "Select image for the field";

                    break;
            }

            if (textForType != "") {

                message += textForType + " <b>" + $("label[for='" + input.attr("id") + "']").text().replace(":", "") + "</b>.<br \>";

                textForType = "";
            }
        }
		);

        return message;
    }
    finally {

        message = input = textForType = null;
    }
}

function GetId(Obj) {

    return Obj.parent().parent().parent().find("td:first").html()
}

function GetValueColumn(Obj, Number) {

    return Obj.parent().parent().parent().find("td:nth-child(" + Number + ")").html();
}

function HideAlertJQ() {

    $(".modalAlert").remove();
}

function ShowModal(IdModal, IdButtonAccept, Width, Height, FunctionAccept, FunctionCancel, IdButtonCancel) {

    var modal = "#" + IdModal,
		buttonAcept = "#" + IdButtonAccept,
		width = Width == undefined ? 'auto' : Width,
		height = Height == undefined ? 'auto' : Height,
		buttonCancel = IdButtonCancel != null ? "#" + IdButtonCancel : "#modalCancel";


    $(modal).dialog({
        width: width,
        title: "MaltaCleyton",
        modal: true,
        height: height,
        resizable: false,
        dialogClass: 'fixed-dialog'
    });

    $(buttonCancel).click(function (e) {

        e.preventDefault();

        if (FunctionCancel != undefined && typeof FunctionCancel == "function")
            FunctionCancel();

        $(modal).dialog("close");
    });

    $(buttonAcept).unbind("click");
    $(buttonAcept).click(FunctionAccept);
}

function ConfirmJQ2(Obj, Message, Function, FunctionCancel) {

    $myconfirm = $('<div id = "Confirm" class="clsConfirmDialog"></div>')
    .dialog({
        width: 385,
        autoOpen: false,
        title: "Control payments",
        modal: true,
        resizable: false,
        buttons: {
            "Aceptar": function () {

                Function(Obj);

                $(".clsConfirmDialog").dialog("close");
            },
            "Cancelar": function () {

                if (FunctionCancel != undefined && typeof FunctionCancel == "function")

                    FunctionCancel(Obj);

                $(".clsConfirmDialog").dialog("close");
            }
        },
        open: function () {
            //$(this).parent().find('.ui-dialog-buttonpane button:first-child').next().button({
            //    icons: { primary: 'clsCancel' }
            //});
            //$(this).parent().find('.ui-dialog-buttonpane button:first-child').button({
            //    icons: { primary: 'clsAccept' }
            //});
        }
    });

    $myconfirm.html(Message);
    $myconfirm.dialog('open');

    return false;
}

function AlertJQ(message) {

    HideAlertJQ();

    $myalert = $('<div id = "modalAlert" class="modalAlert" ></div>')
    .dialog({
        width: 385,
        autoOpen: false,
        title: "MaltaCleyton",
        modal: false,
        resizable: false,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        },
        open: function () {
            //$(this).parent().find('.ui-dialog-buttonpane button:first-child').button({
            //    icons: { primary: 'clswarning' }
            //});
        }
    });

    $myalert.html(message);
    $myalert.dialog('open');
}

function CallRest(Type, Url, Data, FunctionSuccess, FunctionError, Async) {

    Loading(true);

    $.ajax({
        type: Type,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 0,
        url: Environment.UrlRest + Url,
        data: Data,
        async: Async,
        beforeSend: function (jqXHR) {

            var apiToken = Environment.ApiToken;

            if (apiToken != undefined && apiToken != "")
                jqXHR.setRequestHeader("ApiToken", apiToken);
        },
        success: function (Result) {

            if (FunctionSuccess != null)
                FunctionSuccess(Result);

            Loading();
        },
        error: function (Request, Status, Error) {

            if (Request.status == 401) {

                location.href = Environment.DefaultUrl;
            }
            else {

                if (FunctionError != null)
                    FunctionError(Request, Status, Error);
                else if (Request.getResponseHeader('Access-Control-Allow-Origin') == null)
                    AlertJQ("The consultation period has expired API by an unknown error.");
            }

            Loading();
        }
    });
}

function GetQueryString(Name, Url) {

    var sPageURL = (Url === undefined ? window.location.search.substring(1) : Url);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == Name)
            return sParameterName[1];
    }
}

function UpdateQueryString(key, value, query) {

    var res = query.split("&"),
        dict = [],
        obj,
        queryString = "";

    for (i = 0; i <= res.length - 1; i++) {

        obj = res[i];

        dict.push({
            key: obj.split("=")[0],
            value: obj.split("=")[1]
        });
    }

    for (i = 0; i <= dict.length - 1; i++) {

        if (dict[i].key === key) {
            dict[i].value = value;
            break;
        }
    }

    for (i = 0; i <= dict.length - 1; i++) {

        queryString += dict[i].key + "=" + dict[i].value;

        if (i != dict.length - 1)
            queryString += "&";
    }

    return queryString;
}

function Loading(visible, message) {

    if (visible) {

        if (message == undefined)
            message = "Loading...";

        $("body").prepend("<div id='loading' class='loader'><p class='loader-img'><span class='loader-txt'>" + message + "</span></p></div>");
    }
    else
        $("#loading").remove();
};

function SelectFill(Type, IdElement, ValueSelect, IdSelect, Function, AddSelect, Finish) {

    if (IdSelect === undefined || IdSelect === null)
        IdSelect = "Id"

    if (ValueSelect === undefined || ValueSelect === null)
        ValueSelect = "Nombre"


    if (AddSelect === undefined || AddSelect === null)
        AddSelect = true;

    Loading(true);

    CallRest("GET",
          Type,
          null,
          function (respose) {

              var options = [],
                  item,
                  $select = $("#" + IdElement);

              if (AddSelect) {

                  options.push('<option value="',
                       0, '">',
                       "Select...", '</option>');
              }

              for (var i = 0; i < respose.Obj.length; i++) {

                  item = respose.Obj[i];

                  options.push('<option value="',
                    item[IdSelect], '">',
                    item[ValueSelect], '</option>');
              }

              $select.html(options.join(''));

              $select.find('option:first').attr('selected', 'selected').trigger("change");

              if (Function != null) {

                  $select.on("change", function (e) {

                      e.preventDefault();

                      Function($select);
                  })
              }

              if (Finish != null) {

                  Finish();
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
}

function SelectClean(IdElement) {

    var $select = $("#" + IdElement),
        options = [];

    options.push('<option value="',
         0, '">',
         "Select...", '</option>');

    $select.html(options.join(''));

    $select.find('option:first').attr('selected', 'selected').trigger("change");
}

function GetCurentFileName() {

    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function Order(ChangeOrder) {

    if ($col != null) {

        Loading(true);

        ChangeOrder = ChangeOrder != undefined ? ChangeOrder : false;

        var table = $("#tData"),
            rows = table.find('tr:gt(0)').toArray().sort(comparer($col.index()))

        if (ChangeOrder)
            Asc = !Asc

        $(".imgOrderAsc").remove();
        $(".imgOrderDesc").remove();

        if (!Asc) {

            rows = rows.reverse()
            $col.prepend("<img class='imgOrderAsc' src='images/misc/fb.png' /></a>");
        }
        else {

            $col.prepend("<img class='imgOrderDesc' src='images/misc/fa.png' /></a>");
        }

        for (var i = 0; i < rows.length; i++) {

            table.append(rows[i])
        }

        Loading();
    }
}

function comparer(index) {

    return function (a, b) {

        var valA = getCellValue(a, index), valB = getCellValue(b, index);

        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    }
}

function getCellValue(row, index) {

    return $(row).children('td').eq(index).html()
}

function FormatDate(Date) {
    var date = Date.replace("T00:00:00", "");

    var dateSplit = date.split("-");

    date = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];

    return date;
}