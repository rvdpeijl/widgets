$(document).ready(function(){

// Hier bepaal je de easing van de animatie. (Easing plugin: http://easings.net/nl)
$.easing.def = "easeInOutQuint";

// Globals
var img;						
var slider = $('#slider');
var clickCount = 0;
var ms = 5000; // Wachttijd van de slider in ms

// Lees JSON file en roep render functie aan
$.getJSON("img.json", function(json) {
	renderImages(json);
	img = json;
	$('.balk p.titel').html(img[0].titel);
	$('.balk p.subtitel').html(img[0].subtitel);
	var kleur = img[clickCount].kleur;
	$('.balk .bekijk').css({ backgroundColor: kleur});
	$('.balk p.subtitel').css({ color: kleur});
});

// Zorg ervoor dat clickfuncties op gerenderde elementen het doen
slider.delegate(".right", "click", function(event){
	event.preventDefault();
	if (clickCount < 3) {
		clickCount++;
		slideOnce();
	}
}).delegate(".left", "click", function(event) {
	event.preventDefault();
	if (clickCount > 0) {
		clickCount--;
		slideOnce();
	}
});


// Slider pauzeer functie
var interval = window.setInterval(function(){
  	autoSlide()
}, ms);

$('#slider').mouseenter( function() {
	window.clearInterval(interval);
}).mouseleave(function() {
	interval = window.setInterval(function(){
	  	autoSlide()
	}, ms);
});

// Renderfunctie
function renderImages (json) {
	var images = json;
	slider.append('<ul>');
	
	images.forEach(function(obj) { 
		slider.find('ul').append(
			'<li>' +
			'<img src="' + obj.url + '">' + 
			'</li>'
		);
	});

	slider.append('</ul>');
	var imgCount = images.length;
	$('#slider ul').css({width: (imgCount*900)});
}

// Slidefunctie
function autoSlide () {
	if (clickCount < 3) {
		clickCount++;
		slideOnce();
	}else {
		clickCount = 0;
		$('#slider ul').stop(true,true).animate({ 'margin-left' : '0px' }, 400, function() {
   			$('.balk p.titel').html(img[clickCount].titel);
   			$('.balk p.subtitel').html(img[clickCount].subtitel);
   			var kleur = img[clickCount].kleur;
   			$('.balk .bekijk').animate({ backgroundColor: kleur}, 600);
   			$('.balk p.subtitel').animate({ color: kleur}, 600);
    	});
	}
}

function slideOnce () {
	var kleur = img[clickCount].kleur;

   	$('.balk .titel').animate({left:'-500px'}, {queue: false, duration: 500});
   	$('.balk .subtitel').slideUp(500, function() {
   			$('.balk p.subtitel').css({ color: kleur});
   	});

	$('#slider ul').stop(true,true).animate({ 'margin-left' : '-' + (900*clickCount) }, 600, function() {
			$('.balk p').animate({left:'0px'}, {queue: false, duration: 500});
			$('.balk .subtitel').slideDown(500);

			$('.balk .bekijk').animate({ backgroundColor: kleur}, 600);

   			$('.balk p.titel').html(img[clickCount].titel);
   			$('.balk p.subtitel').html(img[clickCount].subtitel);
    });
}

});