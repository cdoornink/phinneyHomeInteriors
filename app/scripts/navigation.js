var headerOffset = 120;
var manualScrollOffset = 100;
var currentSection;

function setActiveLink(name) {
	$('.menu div').removeClass('active');
	$('#'+name+'-link').addClass('active');
	if (currentSection != name) {
		var activeSection = name;
		setTimeout(function(){
			if (currentSection === activeSection) {
				send('Navigation', 'Visited', name);
			}
		}, 3000);
	}
	currentSection = name;
}
function scrollTo(name) {
	var scrollTop = $('#'+name+'-section').offset().top;
	$('body').animate({
    scrollTop: (scrollTop - headerOffset)
  }, 200, function() {});
	send('Navigation', 'Clicked', name);
}

function checkScrollPosition(e) {
  var doc = document.documentElement
  var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

	var hero = $('#hero-image').offset().top - headerOffset - manualScrollOffset - 500;
	var about = $('#about-section').offset().top - headerOffset - manualScrollOffset - 200;
	var projects = $('#projects-section').offset().top - headerOffset - manualScrollOffset;
	var services = $('#services-section').offset().top - headerOffset - manualScrollOffset;
	var contact = $('#contact-section').offset().top - headerOffset - manualScrollOffset;
	var pinterest = $('#pinterest-section').offset().top - headerOffset - manualScrollOffset;
	var instagram = $('#instagram-section').offset().top - headerOffset - manualScrollOffset;

	// must be ordered from bottom to top
	// if (scrollTop > pinterest) {
	// 	setActiveLink('pinterest')
	// } else
	if (scrollTop > instagram) {
		setActiveLink('instagram')
	} else if (scrollTop > contact) {
		setActiveLink('contact')
	} else if (scrollTop > services) {
		setActiveLink('services')
	} else if (scrollTop > projects) {
		setActiveLink('projects')
	} else if (scrollTop > about) {
		setActiveLink('about')
	} else {
		setActiveLink();
	}
}

var debounceScroll = debounce(checkScrollPosition, 10)

$('body').bind('mousewheel', function(e){
  debounceScroll()
});

document.addEventListener("scroll", Scroll, false);

function Scroll() {
  debounceScroll()
}

$('#about-link').bind('click', function(e){
	scrollTo('about');
});

$('#projects-link').bind('click', function(e){
	scrollTo('projects');
});

$('#contact-link').bind('click', function(e){
	scrollTo('contact');
});

$('#services-link').bind('click', function(e){
	scrollTo('services');
});

$('#pinterest-link').bind('click', function(e){
	scrollTo('pinterest');
});

$('#instagram-link').bind('click', function(e){
	scrollTo('instagram');
});

checkScrollPosition();
