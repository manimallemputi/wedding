;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	// Smooth in-page nav: center section in viewport when possible
	var smoothSectionScroll = function() {
		$('a[href^="#"]').on('click', function(event) {
			var href = $(this).attr('href');
			if (!href || href === '#' || href.length < 2) {
				return;
			}
			var $target = $(href);
			if (!$target.length) {
				return;
			}
			event.preventDefault();

			var winH = $(window).height();
			var targetTop = $target.offset().top;
			var targetH = $target.outerHeight();
			var scrollTo = targetTop;

			// Prefer centering shorter sections; keep top-aligned if taller than viewport
			if (targetH < winH) {
				scrollTo = targetTop - Math.max(0, (winH - targetH) / 2);
			}

			$('html, body').stop().animate({
				scrollTop: Math.max(0, scrollTo)
			}, 650, 'easeInOutExpo');

			// Close mobile offcanvas if open
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('overflow offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// Netlify Forms RSVP — POST to site root, then go to thank-you page
	// (avoids browser POST to thank-you.html which returns 404 without form handling)
	var rsvpForm = function() {
		var form = document.getElementById('rsvp-form');
		if (!form) {
			return;
		}

		form.addEventListener('submit', function(event) {
			event.preventDefault();

			var submitBtn = form.querySelector('.rsvp-submit');
			var originalLabel = submitBtn ? submitBtn.textContent : '';
			if (submitBtn) {
				submitBtn.disabled = true;
				submitBtn.textContent = 'Sending…';
			}

			var formData = new FormData(form);
			// Ensure Netlify receives the form name
			if (!formData.get('form-name')) {
				formData.set('form-name', 'rsvp');
			}

			var body = new URLSearchParams(formData).toString();

			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body
			}).then(function(res) {
				// Netlify returns 200 when the form is accepted
				if (res.ok) {
					window.location.href = 'thank-you.html';
					return;
				}
				throw new Error('Form submission failed (' + res.status + ')');
			}).catch(function() {
				if (submitBtn) {
					submitBtn.disabled = false;
					submitBtn.textContent = originalLabel || 'Send RSVP';
				}
				alert('Sorry — we could not send your RSVP just now. Please try again in a moment, or email the couple directly.');
			});
		});
	};

	// Invitation cover — open wrapper into full site
	var invitationCover = function() {
		var $cover = $('#invite-cover');
		var $body = $('body');
		if (!$cover.length) {
			return;
		}

		var openInvite = function() {
			if ($cover.hasClass('is-opening') || $cover.hasClass('is-open')) {
				return;
			}
			$cover.addClass('is-opening');
			$body.addClass('invite-opening');

			// Quick fade, then reveal invite
			window.setTimeout(function() {
				$cover.addClass('is-open');
				$body.removeClass('invite-locked invite-opening').addClass('invite-revealed');
				window.setTimeout(function() {
					$cover.attr('aria-hidden', 'true').css('pointer-events', 'none');
				}, 500);
			}, 420);
		};

		$('#invite-open').on('click', function(e) {
			e.preventDefault();
			openInvite();
		});

		$cover.on('keydown', function(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openInvite();
			}
		});

		// Simple fade-in once loader is gone
		window.setTimeout(function() {
			$cover.addClass('is-ready');
		}, 200);
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax (desktop only — avoids broken mobile background positioning)
	var parallax = function() {
		if ($(window).width() > 768) {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true
			});
		}
	};

	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		smoothSectionScroll();
		loaderPage();
		invitationCover();
		rsvpForm();
		counter();
		counterWayPoint();
	});


}());
