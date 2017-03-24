var heroImage = document.getElementById('hero-image')
var heroHeader = document.getElementById('hero-header')
var headerOffset = 120;
var manualScrollOffset = 100;

function setActiveLink(name) {
	$('.menu div').removeClass('active');
	$('#'+name+'-link').addClass('active');
}
function scrollTo(name) {
	setActiveLink(name);
	var scrollTop = $('#'+name+'-section').offset().top;
	$('body').animate({
    scrollTop: (scrollTop - headerOffset)
  }, 200, function() {});
}


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

	var about = $('#about-section').offset().top - headerOffset - manualScrollOffset;
	var projects = $('#projects-section').offset().top - headerOffset - manualScrollOffset;
	var contact = $('#contact-section').offset().top - headerOffset - manualScrollOffset;
	var pinterest = $('#pinterest-section').offset().top - headerOffset - manualScrollOffset;
	var instagram = $('#instagram-section').offset().top - headerOffset - manualScrollOffset;

	// must be ordered from bottom to top
	if (scrollTop > pinterest) {
		setActiveLink('pinterest')
	} else if (scrollTop > instagram) {
		setActiveLink('instagram')
	} else if (scrollTop > contact) {
		setActiveLink('contact')
	} else if (scrollTop > projects) {
		setActiveLink('projects')
	} else if (scrollTop > about) {
		setActiveLink('about')
	}
}

var debounceScroll = debounce(checkScrollDirection, 10)

$('body').bind('mousewheel', function(e){
  debounceScroll(e)
});

$('#about-link').bind('click', function(e){
	scrollTo('about');
});

$('#projects-link').bind('click', function(e){
	console.log('hello?');
	scrollTo('projects');
});

$('#contact-link').bind('click', function(e){
	scrollTo('contact');
});

$('#pinterest-link').bind('click', function(e){
	scrollTo('pinterest');
});

$('#instagram-link').bind('click', function(e){
	scrollTo('instagram');
});
