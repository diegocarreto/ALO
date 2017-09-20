/**********************************************
 AGREGAR EL ARBOL
***********************************************/
function addTree(priza) {
  if($(priza).length){
    $(priza).next().after('<div class="tree"/>');
  }
}

/**********************************************
 CAMBIA SELECTS
***********************************************/

function cambiaSelect (select) {
  if($(select).length){
    $(select).each(function(){
      $(this).addClass('selectBox');
      var $ancho = $(this).width();
      $(this).wrap('<div class="selectStyled"/>').parent().append('<input class="select"/>');
      $(this).parent().find('.select').css('width', ($ancho - 41)).val($('option:selected',this).text());
      $(this).change(function(){
          $(this).parent().find('.select').val($('option:selected',this).text());
        });
    });
  }
}

/**********************************************
 DATEPICKER
***********************************************/

function birthdayDate(obj) {
    var minAge = (new Date).getFullYear();
    var minMonth = (new Date).getMonth();
    var minDay = (new Date).getDate();
    if ($(obj.length)) {
        $(obj).datepicker({
            buttonImage: "images/misc/calendar.png",
            buttonImageOnly: true,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy/mm/dd',
            maxDate: new Date(minAge, minMonth, minDay),
            showAnim: 'slideDown',
            showOn: 'button',
            yearRange: "2000:"
        }).css({
          'width': $(obj).width() - 22
        });
    }
}

/**********************************************
 PONER EL FONDO EN EL LOGIN
***********************************************/

// function fondoLogin(login) {
  // if($(login).length){
    // $('body').prepend('<div class="bodyLoginBackground"><img src="images/background/treelogin.jpg" alt=""></div>');
  // }
// }

/**********************************************
 ÍCONO EN INPUT TEXT
***********************************************/

function ponIcono (obj) {
  if($(obj).length){
    $(obj).each(function(){
      $(this).after('<em class="icon '+$(this).attr('class')+'"/>');

      $(this).next().css({
        'marginLeft': -($(this).width() + parseInt($(this).css('paddingLeft')))
      });
    });
  }
}

/***********************************************
  TOOLTIP
***********************************************/

function toolTip(obj, valor) {
    if ($(obj).length) {
        $(obj).each(function() {
          var $val;
          if(valor){
            $val = $(this).val();
          } else {
            $val = $(this).text();
          }
          if ($val) {
          $(this).after('<div class="tooltip">' + $val + '</div>');
          var pos = $(this).position();
          var posThis = $(this).next().width() + $(this).width();
          $(this).next().css({
            'left': pos.left,
            'top': pos.top,
            'marginLeft': -(posThis)
          });
          $(this).mouseover(function () {
            $(this).next().fadeIn('fast');
          }).mouseout(function () {
            $(this).next().hide();
          });
        }
      });
    }
}

/**********************************************
 MUESTRA FIELDSET EN EL LOGIN
***********************************************/

function selectFieldset (fieldset) {
  if($(fieldset).length){
    $(fieldset).each(function(){
      $(this).click(function(){
        if($(this).hasClass('registerUser')){
          $(this).parent().parent().parent().find('.sectionRegister').slideDown();
          $(this).parent().parent().hide();
        }
        if($(this).hasClass('forgotPassword')){
          $(this).parent().parent().parent().find('.sectionRecoverPass').slideDown();
          $(this).parent().parent().hide();
        }
        if($(this).hasClass('changePassword')){
          $(this).parent().parent().parent().find('.sectionChangePass').slideDown();
          $(this).parent().parent().hide();
        }
        if($(this).hasClass('cancelBtn')){
          $(this).parent().parent().parent().find('.sectionLogin').slideDown();
          $(this).parent().parent().hide();
        }
      });
    });
  }
}

/***********************************************
     
     Funciones que se cargan al inicio

***********************************************/

$(document).ready(function (){
  toolTip('.tip');
  toolTip('.tipSubmit',1);
  selectFieldset ('#mainLogin .btn');
  // fondoLogin('.bodyLogin');
  ponIcono('.inputIcon');
  birthdayDate('.birthdayDate');
  if(!($('.msie8, .msie7, .msie6').length)){
    cambiaSelect ('select');
    addTree('.prizaLogo');
  }
  if($('.summaryError').length){
    if($('.summaryError').height() != 0) {
      $('.summaryError').addClass('fullSummary');
    }
  }
  
});

function DownloadFile(sUrl) {

    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (isChrome || isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);

            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    sUrl += '?download';

    window.open(sUrl, '_self');
    return true;
}