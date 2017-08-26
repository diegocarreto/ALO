// $(".switchNav").click(function() {
// 	console.log($(this).attr("data-especie")); 
// 	$(this).attr("data-especie")
// });

function openNav() {
	document.getElementById("nav-mascotas").setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
}
function closeNav() {
	document.getElementById("nav-mascotas").setAttribute('style', 'width:0; padding-left: 0;');
}

function openNav1() {
	document.getElementById("nav-pecuario").setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
}
function closeNav1() {
	document.getElementById("nav-pecuario").setAttribute('style', 'width:0; padding-left: 0;');
}

function openNav2() {
	document.getElementById("nav-aves").setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
}
function closeNav2() {
	document.getElementById("nav-aves").setAttribute('style', 'width:0; padding-left: 0;');
}

function openNav3() {
	document.getElementById("nav-acuacultura").setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
}
function closeNav3() {
	document.getElementById("nav-acuacultura").setAttribute('style', 'width:0; padding-left: 0;');
}

// function openNavContacto() {
// 	document.getElementById("sub-contacto").setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
// }
function closeNavContacto() {
	document.getElementById("chat").setAttribute('style', 'width:0; padding-left: 0; opacity:0');
}

function navToggle() {
	var width = $("#chat").width();
	// var width = document.getElementById('chat').offsetWidth;
	var navContacto = document.getElementById('chat');
	if (width == 0) {
		navContacto.setAttribute('style', 'width:18.75rem; padding-left: 3.125rem;');
	} else {
		navContacto.setAttribute('style', 'width:0; padding-left: 0; opacity:0');
	}
}


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