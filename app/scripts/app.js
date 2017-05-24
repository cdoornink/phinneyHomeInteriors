$('.gallery-arrow._left').bind('click', function() {
  sideScrollScreenWidth('left');
});

$('.gallery-arrow._right').bind('click', function() {
  sideScrollScreenWidth('right');
});

$('.gallery-arrow._left').bind('mouseover', function() {
  autoSideScroll('left', true);
});

$('.gallery-arrow._left').bind('mouseleave', function() {
  autoSideScroll('stop');
});

$('.gallery-arrow._right').bind('mouseover', function() {
  autoSideScroll('right', true);
});

$('.gallery-arrow._right').bind('mouseleave', function() {
  autoSideScroll('stop');
});

var again = false
function autoSideScroll(direction, keepGoing) {
  if (!keepGoing && !again) {
    return
  }
  var currentScroll = $('.gallery-container').scrollLeft();
  if (direction == 'right') {
    $('.gallery-container').scrollLeft(currentScroll + 1);
    again = true;
  } else if (direction == 'left') {
    $('.gallery-container').scrollLeft(currentScroll - 1);
    again = true;
  } else {
    again = false;
  }

  if (again) {
    setTimeout(function () {
      autoSideScroll(direction);
    }, 10);
  }
}

function sideScrollScreenWidth(direction) {
  autoSideScroll('stop');

  var currentScroll = $('.gallery-container').scrollLeft();
  var screenWidth =  $('.gallery-container').width();
  if (direction == 'right') {
    $('.gallery-container').animate({ scrollLeft: (currentScroll + screenWidth) }, 400);
  } else if (direction == 'left') {
    $('.gallery-container').animate({ scrollLeft: (currentScroll - screenWidth) }, 400);
  }
}

$('.gallery-container').bind('scroll', function(e){
  debounceGalleryScroll()
});

function checkGalleryScrollPosition(e) {
  var currentScroll = $('.gallery-container').scrollLeft();
  var scrollWidth =  $('.gallery-container')[0].scrollWidth - $('.gallery-container').width();;
  if (currentScroll > 0) {
    $('.gallery-arrow._left').addClass('_visible');
  } else {
    $('.gallery-arrow._left').removeClass('_visible');
  }
  if (currentScroll < scrollWidth) {
    $('.gallery-arrow._right').addClass('_visible');
  } else {
    $('.gallery-arrow._right').removeClass('_visible');
  }
}

var debounceGalleryScroll = debounce(checkGalleryScrollPosition, 20);
