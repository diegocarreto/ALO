var $menuElems = $('.switchNav');
var $closeMenu = $('.closebtn');
var $btnChat = $('.openChat');
var $closeChat = $('.closebtnChat');

$menuElems.each(function(i)
{
	$(this).on('click', function()
	{
		switch (i)
		{
			case 0:
				$('#nav-nosotros').toggleClass('nav-open');
				$('#nav-mascotas, #nav-pecuario, #nav-aves, #nav-acuacultura').removeClass('nav-open');
				break;
			case 1:
				$('#nav-mascotas').toggleClass('nav-open');
				$('#nav-nosotros, #nav-pecuario, #nav-aves, #nav-acuacultura').removeClass('nav-open');
				break;
			case 2:
			    $('#nav-pecuario').toggleClass('nav-open');
			    $('#nav-nosotros, #nav-mascotas, #nav-aves, #nav-acuacultura').removeClass('nav-open');			    
				break;
			case 3:
				$('#nav-aves').toggleClass('nav-open');
				$('#nav-nosotros, #nav-nosotros, #nav-pecuario, #nav-acuacultura').removeClass('nav-open');
				break;
			case 4:
				$('#nav-acuacultura').toggleClass('nav-open');
				$('#nav-nosotros, #nav-nosotros, #nav-pecuario, #nav-aves').removeClass('nav-open');
				break;
			default:
			console.log('no le puchaste bien :(');
		} 
	});
});
$closeMenu.click(function()
{
	$('.nav-especie').removeClass('nav-open');
});
$btnChat.click(function()
{
	$('#chat').toggleClass('nav-contacto-open');
	console.log('CLIC!');
});
$closeChat.click(function()
{
	$('#chat').removeClass('nav-contacto-open');
});





// SoftScroll
// smoothScroll.init();

// Backstretch
$("#title").backstretch(["https://source.unsplash.com/category/nature/1600x900"], {duration: 3200, fade: 750});
// $("#intro-malta").backstretch(["img/bg-inicio-malta.jpg"], {duration: 3200, fade: 750});
$("#intro-pecuario").backstretch(["img/bg-intro-pecuario.jpg"], {duration: 3200, fade: 750});
$("#intro-mascotas").backstretch(["img/bg-intro-mascotas.jpg"], {duration: 3200, fade: 750});
$("#intro-acuacultura").backstretch(["img/bg-intro-acuacultura.jpg"], {duration: 3200, fade: 750});
$("#foto-expertos").backstretch(["img/foto-expertos-home.jpg"], {duration: 3200, fade: 750});
// $("#header-cerdo").backstretch(["img/bg-cerdo.jpg"], {duration: 3200, fade: 250});

// Parallax
$('#intro-malta').parallax({imageSrc: 'img/bg-inicio-malta.jpg'});
$('#nota-home').parallax({imageSrc: 'img/foto-granja.jpg'});
$('#header-cerdo').parallax({imageSrc: 'img/bg-cerdo.jpg'});
$('#nosotros-header').parallax({imageSrc: 'img/bg-nosotros.jpg'});
$('#template-header').parallax({imageSrc: 'img/bg-templete.jpg'});


// Circles
$('.proteina.circle').circleProgress({
	value: 0.165,
	size: 150,
	lineCap: "round",
	startAngle: -Math.PI / 5 * 3,
	thickness: 8,
	fill: {gradient: ['#92b0cc', '#294974']},
	emptyFill : "rgba(0, 0, 0, .1)",
});
$('.grasa.circle').circleProgress({
	value: 0.035,
	size: 150,
	lineCap: "round",
	startAngle: -Math.PI / 6 * 3,
	thickness: 8,
	fill: {gradient: ['#92b0cc', '#294974']},
	emptyFill : "rgba(0, 0, 0, .1)",
});
$('.humedad.circle').circleProgress({
	value: 0.12,
	size: 150,
	lineCap: "round",
	startAngle: -Math.PI / 6 * 3,
	thickness: 8,
	fill: {gradient: ['#92b0cc', '#294974']},
	emptyFill : "rgba(0, 0, 0, .1)",
});
$('.ceniza.circle').circleProgress({
	value: 0.05,
	size: 150,
	lineCap: "round",
	startAngle: -Math.PI / 6 * 3,
	thickness: 8,
	fill: {gradient: ['#92b0cc', '#294974']},
	emptyFill : "rgba(0, 0, 0, .1)",
});
$('.eln.circle').circleProgress({
	value: 0.595,
	size: 150,
	lineCap: "round",
	startAngle: -Math.PI / 6 * 3,
	thickness: 8,
	fill: {gradient: ['#92b0cc', '#294974']},
	emptyFill : "rgba(0, 0, 0, .1)",
});