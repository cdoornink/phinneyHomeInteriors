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

var formStarted = false;
var formFilled = false;
function reValidate() {
	if (validation.name &&
			validation.email &&
			validation.subject &&
			validation.message
	) {
		$("#contact-section form button").addClass('validated').prop("disabled",false);
		if (!formFilled) {
			send('Contact', 'Form Filled', $('#contact-email')[0].value + ' - ' + $('#contact-subject')[0].value);
			formFilled = true;
		}
	} else {
		$("#contact-section form button").removeClass('validated').prop("disabled",true);
		if (!formStarted) {
			send('Contact', 'Form Started');
			formStarted = true;
		}
	}
}

$('.modal-container').bind('click', function(e){
	$('.modal-container').hide()
});

if (localStorage.getItem('thanks-message')) {
	$('#thanks').show();
	localStorage.removeItem('thanks-message');
	send('Contact', 'Form Submitted');
}

if (document.location.search == "?thanks") {
	localStorage.setItem('thanks-message', true);
	document.location = "/";
}
