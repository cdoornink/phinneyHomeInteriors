function send(category, action, label) {
	if (env == 'prod') {
		ga('send', 'event', category, action, label);
	}
	else {
		console.log('sendEvent', category, action, label);
	}
}
