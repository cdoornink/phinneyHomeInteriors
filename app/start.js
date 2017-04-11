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

	var hero = $('#hero-image').offset().top - headerOffset - manualScrollOffset - 500;
	var about = $('#about-section').offset().top - headerOffset - manualScrollOffset - 200;
	var projects = $('#projects-section').offset().top - headerOffset - manualScrollOffset;
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
	} else if (scrollTop > projects) {
		setActiveLink('projects')
	} else if (scrollTop > about) {
		setActiveLink('about')
	} else {
		setActiveLink();
	}
}

var debounceScroll = debounce(checkScrollDirection, 10)

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

$('#pinterest-link').bind('click', function(e){
	scrollTo('pinterest');
});

$('#instagram-link').bind('click', function(e){
	scrollTo('instagram');
});

$('.modal-container').bind('click', function(e){
	$('.modal-container').hide()
});

var validation = {
	name: false,
	email: false,
	subject: false,
	message: false,
}

function validateValue(e, val) {
	if (e.target.value && e.target.value.length) {
		validation[val] = true;
	} else {
		validation[val] = false;
	}
	reValidate()
}

$('#contact-name').bind('keyup keypress', function(e) {
	validateValue(e, 'name');
});

$('#contact-email').bind('keyup keypress', function(e) {
	validateValue(e, 'email')
});

$('#contact-subject').bind('keyup keypress', function(e) {
	validateValue(e, 'subject')
});

$('#contact-message').bind('keyup keypress', function(e) {
	validateValue(e, 'message')
});

function reValidate() {
	if (validation.name &&
			validation.email &&
			validation.subject &&
			validation.message
	) {
		$("#contact-section form button").addClass('validated').prop("disabled",false);
	} else {
		$("#contact-section form button").removeClass('validated').prop("disabled",true);
	}
}


if (localStorage.getItem('thanks-message')) {
	$('#thanks').show();
	localStorage.removeItem('thanks-message');
}

if (document.location.search == "?thanks") {
	localStorage.setItem('thanks-message', true);
	document.location = "/";
}

checkScrollDirection();
