var heroImage = document.getElementById('hero-image')
var heroHeader = document.getElementById('hero-header')

// function mouse_position()
// {
//     var e = window.event;
//
//     var posX = e.clientX;
//     var posY = e.clientY;
//
// 		var height = window.innerHeight
// 		var width = window.innerWidth
//
// 		yP = posY / height;
// 		xP = posX / width;
//
// 		var containerPositionX = (xP * 50 - 25) * -1
// 		var containerPositionY = (yP * 50 - 25) * -1
//
// 		heroImage.style.transform = 'translate3d('+containerPositionX+'px,'+containerPositionY+'px,0)'
// 		// heroHeader.style.transform = 'translate3d('+containerPositionX/2+'px,'+containerPositionY/2+'px,0)'
//
// }
// document.onmousemove = mouse_position

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function checkScrollDirection(e) {
  var doc = document.documentElement
  var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
  if (scrollTop > 1) {
    $('.fixed-header .hero-header').addClass('active')
    // $('.home-hero .hero-header').removeClass('active')
  } else {
    $('.fixed-header .hero-header').removeClass('active')
    // $('.home-hero .hero-header').addClass('active')
  }

  //was for the fixed image in the hero, not fixed anymore
  // if (scrollTop > 800) {
  //   heroImage.style.display = 'none';
  // } else {
  //   heroImage.style.display = 'block';
  // }

  // if (e.originalEvent.deltaX > 1) {
  //   moveRight()
  // } else if (e.originalEvent.deltaX < -1) {
  //   moveLeft()
  // } else if (e.originalEvent.deltaY > 1) {
  //   moveDown()
  // } else if (e.originalEvent.deltaY < -1) {
  //   moveUp()
  // }
}

var debounceScroll = debounce(checkScrollDirection, 10)

$('body').bind('mousewheel', function(e){
  console.log('1');
  debounceScroll(e)
});
