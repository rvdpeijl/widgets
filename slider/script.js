$(document).ready(function(){

var img;
var slider = $('#slider');

$.getJSON("img.json", function(json) {
	renderImages(json);
	img = json;
	$('.balk p').html(img[0].titel);
});

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

	var clickCount = 0;

	slider.delegate(".right", "click", function(event){
		event.preventDefault();
		if (clickCount < 3) {
			clickCount++;
			$('#slider ul').stop(true,true).animate({ 'margin-left' : '-' + (900*clickCount) }, 400, function() {
	   			console.log(clickCount)
	   			$('.balk p').html(img[clickCount].titel);
        	});
		}
	}).delegate(".left", "click", function(event) {
		event.preventDefault();
		if (clickCount > 0) {
			clickCount--;
			$('#slider ul').stop(true,true).animate({ 'margin-left' : '-' + (900*clickCount) }, 400, function() {
	   			$('.balk p').html(img[clickCount].titel);
        	});
		}
	});

});