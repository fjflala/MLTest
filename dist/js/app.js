$(document).ready(function(){
	var carousel = new ch.Carousel( document.querySelector("#product-related"),{ "pagination": true, "limitPerPage": 4 } );

	var zoom = new ch.Zoom(document.querySelector('#product-image'), {
	    'width': (ch.viewport.width / 2) + 'px'
	});

    zoom.loadImage();
});