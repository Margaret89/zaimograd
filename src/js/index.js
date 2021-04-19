import {$, Slider} from './common';

// Arrow top page
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},500);return false;});

//range slider
if($('.js-range-input').length){
	$('.js-range-input').each(function(){
		var $parent = $(this).parents('.js-range');
		var $rangeVal = $parent.find('.js-range-val');
		var numMin = $(this).data('slider-min').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		var numMax = $(this).data('slider-max').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

		if($rangeVal.data('text') == 'день'){
			$rangeVal.text($(this).data('slider-value') + ' ' + nameDay($(this).data('slider-value')));

			if($parent.data('note') == true){
				numMin = numMin + ' ' + nameDay($(this).data('slider-min'));
				numMax = numMax + ' ' + nameDay($(this).data('slider-max'));
			}
		}else{
			$rangeVal.text($(this).data('slider-value') + ' ' + $rangeVal.data('text'));

			if($parent.data('note') == true){
				numMin = numMin + ' ' + $rangeVal.data('text');
				numMax = numMax + ' ' + $rangeVal.data('text');
			}
		}

		$parent.find('.js-range-min').text(numMin)
		$parent.find('.js-range-max').text(numMax)
	});
	

	$('.js-range-input').on("slide", function(e) {
		var $rangeVal = $(this).parents('.js-range').find('.js-range-val');

		if($rangeVal.data('text') == 'день'){
			$rangeVal.text(e.value + ' ' + nameDay(e.value));
		}else{
			$rangeVal.text(e.value + ' ' + $rangeVal.data('text'));
		}
	});

	function nameDay(val) {
		var lastFigure = parseInt(val.toString().substr(val.toString().length - 1, 1));

		if (val >= 11 && val < 15) {
			return 'дней';
		}
		else {
			if (lastFigure == 1) return 'день';
			if (lastFigure > 1 && lastFigure < 5) return 'дня';
			if (lastFigure == 0 || lastFigure >= 5) return 'дней';
		}
	}
}

// animation for steps
if($('.js-step-list').length){
	function stepAnim(delay){
		var $stepBox = $('.js-step-list');
		if ($stepBox.length) {
			if (!$stepBox.hasClass('animate')) {
				$stepBox.addClass('animate');

				$('.js-step-list-item').each(function(indx, element){
					$(this).css({'animation-delay': delay+'s', '-webkit-animation-delay': delay+'s'})
					delay = parseFloat(delay);
					delay = delay + 0.3;
					delay = delay.toFixed(1);
				});
			}
		}
	}

	var stepBlockTop = $('.js-step-list').offset().top;
	var topStepScroll = stepBlockTop - $(window).outerHeight()/2;

	console.log(stepBlockTop);
	console.log(topStepScroll);

	$(window).on('scroll', function(){
		if($(this).scrollTop()>=topStepScroll){
			stepAnim(0);
		}
	});
}

// review slider
if($('.js-review-slider').length){
	$('.js-review-slider').slick({
		centerMode: true,
		centerPadding: 'calc(50% - 585px)',
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows: $('.js-review-slider-arr'),
		prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-arrow-left" width="8" height="14"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-arrow-right" width="8" height="14"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		responsive: [
			{
				breakpoint: 1240,
				settings: {
					centerPadding: 'calc(50% - 465px)',
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					centerPadding: 'calc(50% - 360px)',
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					centerPadding: '40px',
					slidesToShow: 1,
				}
			},
		]
	});
}

// unwrap block
if($('.js-unwrap-block').length){
	$('.js-unwrap-block-btn').on('click',function(event){
		event.preventDefault();
		var $parent = $(this).parents('.js-unwrap-block');
		
		$parent.toggleClass('opened');
		if($parent.hasClass('opened')){
			$parent.children('.js-unwrap-content').slideDown(400);
		}else{
			$parent.children('.js-unwrap-content').slideUp(400);
		}
	});
}

// // show/hide mobile header contacts
// if($('.js-header-mob-contact-btn').length){
// 	$('.js-header-mob-contact-btn').on('click', function(){
// 		hideHeadContacts();

// 		$(this).addClass('active');
// 		$(this).parent('.js-header-mob-contact').find('.js-header-mob-contact-popup').slideDown(300);
// 	});

// 	$('.js-header-mob-contact-close').on('click', function(){
// 		hideHeadContacts();
// 	});

// 	$(document).on('click', function(event) {
// 		if ($(event.target).closest(".js-header-mob-contact-popup").length) return;
// 		if ($(event.target).closest(".js-header-mob-contact-btn").length) return;
// 		hideHeadContacts();
// 		event.stopPropagation();
// 	  });

// 	function hideHeadContacts(){
// 		$('.js-header-mob-contact-btn').removeClass('active');
// 		$('.js-header-mob-contact-popup').slideUp(300);
// 	}
// }

// // show/hide more text
// if($('.js-more-text-action').length){
// 	$('.js-more-text-action').on('click', function(){
// 		var $elemLabel = $(this).find('.js-more-text-label');
// 		var tempVal = $elemLabel.text();
// 		$elemLabel.text($elemLabel.data('text'));
// 		$elemLabel.data('text', tempVal);
		
// 		$(this).parents('.js-more-text').find('.js-more-text-content').slideToggle(300);
// 	});
// }
