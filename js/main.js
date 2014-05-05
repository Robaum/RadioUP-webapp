// Preloader
$(window).load(function () {
	"use strict";
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
});

$(document).ready(function () {
	"use strict";

	/*Audio*/
	$('#audio-player').mediaelementplayer({
    alwaysShowControls: true,
    features: ['playpause','volume'],
    audioVolume: 'horizontal',
    startVolume: 0.45,
    enableKeyboard: true,
    iPadUseNativeControls: true,
    iPhoneUseNativeControls: true,
    AndroidUseNativeControls: true
  });

  /*XML Feed*/
  $('.rssfeed').rssfeed('http://diarioup.com/feed/', {
    limit: 5,
    titletag: 'h1',
    date: false,
    linktarget: '_blank'
  });

	// set home page text position
	var windowheight = jQuery(window).height();

	if(windowheight < 500)
	{
		$('#countdown_dashboard').removeClass('cbox');
	}

    // Toggle nav
    $(".nav-container").hover(function () {
        $("nav").stop().fadeIn('fast');
        $('.nav-handle').addClass('active');
    }, function () {
        $("nav").fadeOut('fast');
        $('.nav-handle').removeClass('active');
    });

    $(".nav-container").on('click', '.nav-handle', function () {
        $("nav").fadeToggle('fast');
        $(".nav-handle").toggleClass('active');
    });

    // Show/hide page content on click
    $(".main-column").each(function () {
        $(this).find("section:lt(1)").show();
    });

    $('nav a').click(function () {
        var index = $('nav a').index(this);
        $('.main-column').children().hide().eq(index).fadeIn();
    });

    // Show home panel
    $('.logo').click(function () {
        $('.contact-panel').hide();
        $('.about-panel').hide();
        $('.home-panel').fadeIn();
    });



    // Subscribe
    $('#subscribe-submit').click(function () {
        $('.subscribe-error-field').hide();

        var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var emailVal = $('#subscribe-email').val();

        if (emailVal == "" || emailVal == "Email Address *") {
            $('.subscribe-error-field').html('<i class="fa fa-exclamation"></i>Your email address is required.').fadeIn();
            return false;

        } else if (!emailReg.test(emailVal)) {
            $('.subscribe-error-field').html('<i class="fa fa-exclamation"></i>Invalid email address.').fadeIn();
            return false;
        }

        var data_string = $('.subscribe-form').serialize();

        $('.btn-subscribe').hide();
        $('#subscribe-loading').fadeIn();
        $('.subscribe-error-field').fadeOut();

        $.ajax({
            type: "POST",
            url: "subscribe.php",
            data: data_string,

            //success
            success: function (data) {
                $('.subscribe-empty').hide();
                $('.subscribe-message').html('<i class="fa fa-check contact-success"></i><div>Thank you! You have been subscribed.<div>').fadeIn();
            },
            error: function (data) {
                $('.subscribe-empty').hide();
                $('.subscribe-message').html('<i class="fa fa-exclamation contact-error"></i><div>Something went wrong, please try again later.<div>').fadeIn();
            }

        }) //end ajax call
        return false;
    });


    // Contact
    $('#contact-submit').click(function () {
        $('.contact-error-field').hide();

        var nameVal = $('input[name=name]').val();
        var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        var emailVal = $('#contact-email').val();
        var messageVal = $('textarea[name=message]').val();

        //validate

        if (nameVal == '' || nameVal == 'Name *') {
            $('.contact-error-field').html('<i class="fa fa-exclamation"></i>Your name is required.').fadeIn();
            return false;
        }
        if (emailVal == "" || emailVal == "Email Address *") {

            $('.contact-error-field').html('<i class="fa fa-exclamation"></i>Your email address is required.').fadeIn();
            return false;

        } else if (!emailReg.test(emailVal)) {

            $('.contact-error-field').html('<i class="fa fa-exclamation"></i>Invalid email address.').fadeIn();
            return false;
        }
        if (messageVal == '' || messageVal == 'Message *') {
            $('.contact-error-field').html('<i class="fa fa-exclamation"></i>Please provide a message.').fadeIn();
            return false;
        }

        var data_string = $('.contact-form').serialize();

        $('.btn-contact').hide();
        $('#contact-loading').fadeIn();
        $('.contact-error-field').fadeOut();

        $.ajax({
            type: "POST",
            url: "email.php",
            data: data_string,

            //success
            success: function (data) {

                $('.btn-contact-container').hide();
                $('.contact-message').html('<i class="fa fa-check contact-success"></i><div>Your message has been sent.</div>').fadeIn();
            },
            error: function (data) {

                $('.btn-contact-container').hide();
                $('.contact-message').html('<i class="fa fa-exclamation contact-error"></i><div>Something went wrong, please try again later.</div>').fadeIn();
            }

        }) //end ajax call
        return false;
    });

});

