var env = 'dev';
if (window.location.hostname != 'localhost' && window.location.hostname != '127.0.0.1') {
  env = 'prod';
}
