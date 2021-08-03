import {$, Slider, Inputmask} from './common';

var widthWindow = $(window).width();

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

	// console.log(stepBlockTop);
	// console.log(topStepScroll);

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

// show/hide mobile header contacts
if($('.js-header-mob-contact-btn').length){
	$('.js-header-mob-contact-btn').on('click', function(){
		if(!$(this).hasClass('active')){
			hideHeadContacts();

			$('.js-btn-menu').removeClass('active');
			$('.js-main-menu-wrap').slideUp(300);

			$(this).addClass('active');
			$(this).parent('.js-header-mob-contact').find('.js-header-mob-contact-popup').slideDown(300);
		}
	});

	$('.js-header-mob-contact-close').on('click', function(){
		hideHeadContacts();
	});

	$(document).on('click', function(event) {
		if(widthWindow < 992){
			if ($(event.target).closest(".js-header-mob-contact-popup").length) return;
			if ($(event.target).closest(".js-header-mob-contact-btn").length) return;
			hideHeadContacts();
			event.stopPropagation();
		}
	  });
}

function hideHeadContacts(){
	$('.js-header-mob-contact-btn').removeClass('active');
	$('.js-header-mob-contact-popup').slideUp(300);
}

// show/hide mobile menu
if($('.js-btn-menu').length){
	$('.js-btn-menu').on('click', function(){
			hideHeadContacts();
			$(this).toggleClass('active');
			$('.js-main-menu-wrap').slideToggle(300);
	});

	$(document).on('click', function(event) {
		if(widthWindow < 768){
			if ($(event.target).closest(".js-btn-menu").length) return;
			if ($(event.target).closest(".js-main-menu-wrap").length) return;
			$('.js-btn-menu').removeClass('active');
			$('.js-main-menu-wrap').slideUp(300);
			event.stopPropagation();
		}
	  });
}

// show/hide more text
if($('.js-more-text-action').length){
	$('.js-more-text-action').on('click', function(){
		var $elemLabel = $(this).find('.js-more-text-label');
		var tempVal = $elemLabel.text();
		$elemLabel.text($elemLabel.data('text'));
		$elemLabel.data('text', tempVal);
		
		$(this).parents('.js-more-text').find('.js-more-text-content').slideToggle(300);
	});
}

// team slider
if($('.js-team-slider-list').length){
	$('.js-team-slider-list').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		appendArrows: $('.js-team-slider-arr'),
		prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-arrow-left" width="8" height="14"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-arrow-right" width="8" height="14"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		responsive: [
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});
}

// calc
// calc range slider
if($('.js-calc-range-input').length){
	$('.js-calc-range-input').each(function(){
		var $parent = $(this).parents('.js-calc-range');
		var $rangeVal = $parent.find('.js-calc-range-val');
		
		$rangeVal.text($(this).data('slider-value'));
	});
	
	
	$('.js-calc-range-input').on("slide", function(e) {
		var $rangeVal = $(this).closest('.js-calc-range').find('.js-calc-range-val');
		
		$rangeVal.text(e.value);
	});

	$('.js-calc-range-val').on('input', function() {
		const regEx = /[^\d]/g;
		var rangeVal = $(this).text().replace(regEx, '');

		$('.js-calc-range-input').slider('setValue', rangeVal);
	});

	$('.js-calc-range-val').on('blur', function() {
		const regEx = /[^\d]/g;
		var rangeVal = $(this).text().replace(regEx, '');
		var valEdit = Number.parseInt(rangeVal);
		var sliderMin = $(this).parents('.js-calc-range').find('.js-calc-range-input').data('slider-min');
		var sliderMax = $(this).parents('.js-calc-range').find('.js-calc-range-input').data('slider-max');

		$(this).text(rangeVal);

		if(valEdit < sliderMin){
			$(this).text(sliderMin);
		}else if(valEdit > sliderMax){
			$(this).text(sliderMax);
		}
	});
}

// select
if($('.js-calc-select-field').length){
	$('.js-calc-select-field').on('click', function(){
		$(this).closest('.js-calc-select').toggleClass('open');
		$(this).siblings('.js-calc-select-popup').slideToggle(300);
	});

	if($('.js-calc-select-radio:checked').length){
		var $parent = $('.js-calc-select-radio:checked').closest('.js-calc-select');

		$parent.addClass('active');
		$parent.find('.js-calc-select-val').text($('.js-calc-select-radio:checked').val());
	}

	$('.js-calc-select-radio').on('change', function() {
		var $parent = $(this).closest('.js-calc-select');

		$parent.addClass('active');
		$parent.find('.js-calc-select-val').text($(this).val());
	});

	$(document).on('click', function(event) {
		if ($(event.target).closest(".js-calc-select").length) return;
		$('.js-calc-select').removeClass('open');
		$('.js-calc-select-popup').slideUp(300);
		event.stopPropagation();
	});
}

// select (без поппапа)
if($('.js-calc-choose').length){
	if($('.js-calc-choose-radio:checked').length){
		var $parent = $('.js-calc-choose-radio:checked').closest('.js-calc-choose');

		$parent.addClass('active');
		$parent.find('.js-calc-choose-val').text($('.js-calc-choose-radio:checked').val());

		if($('.js-calc-choose-radio:checked').data('other') !== undefined){
			$parent.find('.js-calc-choose-other').addClass('active');
		}else{
			$parent.find('.js-calc-choose-other').removeClass('active');
		}
	}

	$('.js-calc-choose-radio').on('change', function() {
		var $parent = $(this).closest('.js-calc-choose');

		$parent.addClass('active');
		$parent.find('.js-calc-choose-val').text($(this).val());

		if($(this).data('other') !== undefined){
			$parent.find('.js-calc-choose-other').addClass('active');
		}else{
			$parent.find('.js-calc-choose-other').removeClass('active');
		}
	});
}

// Задаем проценты (вероятность одобрения)
if($('.js-calc').length){
	var countStep = $('.js-calc-item').length;
	var curStep = $('.js-calc-item.active').data('step');
	var curPercent = $('.js-calc-item[data-step=1]').data('cur-percent')
	var addPercent = $('.js-calc-item[data-step=1]').data('add-percent')

	$('.js-calc-progress-val').text(curPercent);
	$('.js-calc-progress-line-cur').css('width', curPercent+'%')
	$('.js-calc-progress-line-probably').css('width', curPercent+addPercent+'%')
	$('.js-calc-progress-add').text(addPercent);
	$('.js-calc-progress-step').text(curStep);
}

if($('.js-calc-progress-line-cur').length){
	$('.js-calc-progress-line-cur').css('width', $('.js-calc-item:first-child').data('cur-percent')+'%')
	$('.js-calc-progress-line-probably').css('width', $('.js-calc-item:first-child').data('percent')+'%')
}

// Валидация форм
if($('.js-calc-form').length){
	$('.js-calc').on('click', '.js-btn-next', function(e){
		var $form = $('.js-calc-item.active');

		errorField($form, e);
	});

	$('.js-calc').on('click', '.js-calc-back', function(e){
		curStep--;

		if(curStep == 1){
			$('.js-calc-bottom-cond').removeClass('inactive');
			$('.js-calc-back').removeClass('active');
		}

		$('.js-calc-item').removeClass('active');
		$('.js-calc-item[data-step='+curStep+']').addClass('active');

		$('body,html').animate({scrollTop:$('.js-calc-item.active').offset().top-50},300);

		curPercent = curPercent - $('.js-calc-item.active').data('add-percent');
		addPercent = $('.js-calc-item.active').data('add-percent')

		$('.js-calc-progress-val').text(curPercent);
		$('.js-calc-progress-line-cur').css('width', curPercent+'%')
		$('.js-calc-progress-line-probably').css('width', curPercent+addPercent+'%')
		$('.js-calc-progress-add').text(addPercent);
		$('.js-calc-progress-step').text(curStep);
	});

	$('.js-calc-item').find('input,textarea,select').on('change', function() {
		var $curField = $(this).closest('.js-calc-form-field');

		if($curField.hasClass('error')){
			if($(this).val().length > 0 || ($(this).attr('id') == 'sms' && $(this).val().length == 3)){
				$curField.removeClass('error');
				$curField.addClass('success');
			}
		}
	});
}

function errorField(form, event) {
	event.preventDefault();

	form.find('.js-calc-form-field').removeClass('error');
	form.find('.calc-form-msg-error').remove();
	$('.js-calc-bottom-cond').find('.calc-form-msg-error').remove();
	$('.js-calc-choose').find('.calc-form-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		var email = $(this).val();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
		var $curField = $(this).closest('.js-calc-form-field');

		if (!pattern.test(email) && (email.length > 1)) {
			$curField.addClass('error');

			if($curField.data('error')  === undefined){
				$curField.append('<div class="calc-form-msg-error">Укажите корректный E-mail</div>')
			}else{
				$curField.append('<div class="calc-form-msg-error">'+$curField.data('error')+'</div>')
			}
		}
	});


	form.find('input,textarea,select').filter('[required]').each(function(){
		if(($(this).val().length < 1) || ($(this).attr('type') == 'checkbox' && !$(this).prop('checked')) || ($(this).attr('id') == 'sms' && $(this).val().length < 3)){
			var $curField = $(this).closest('.js-calc-form-field');
			$curField.addClass('error');

			if($curField.data('error')  === undefined){
				$curField.append('<div class="calc-form-msg-error">Заполните поле</div>')
			}else{
				$curField.append('<div class="calc-form-msg-error">'+$curField.data('error')+'</div>')
			}
		}
	});

	form.find('.js-calc-choose').each(function(){
		if($(this).find('input[type=radio]:checked').length < 1){
			if($(this).data('error') === undefined){
				$(this).append('<div class="calc-form-msg-error">Заполните поле</div>')
			}else{
				$(this).append('<div class="calc-form-msg-error">'+$(this).data('error')+'</div>')
			}
		}
	});

	if(!$('.js-calc-bottom-cond').hasClass('inactive')){
		$('.js-calc-bottom-cond').find('input').filter('[required]').each(function(){
			if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
				var $curCheck = $(this).closest('.js-input-check');
	
				if($curCheck.data('error')  === undefined){
					$curCheck.find('.js-input-check-text').append('<div class="calc-form-msg-error">Заполните поле</div>')
				}else{
					$curCheck.find('.js-input-check-text').append('<div class="calc-form-msg-error">'+$curCheck.data('error')+'</div>')
				}
			}
		});
	}

	if(form.find('.calc-form-msg-error').length == 0 && $('.js-calc-bottom-cond').find('.calc-form-msg-error').length == 0){
		if(curStep == countStep){
			// $('.js-calc').submit();

			$('.js-calc-wrap').addClass('inactive');
			$('.js-calc-docs').addClass('inactive');
			$('.js-calc-success').addClass('active');
			$('.js-calc').reset();

		}else{
			// event.preventDefault();
			curPercent = curPercent + $('.js-calc-item.active').data('add-percent');
			
			if(curStep == 1){
				$('.js-calc-bottom-cond').addClass('inactive');
				$('.js-calc-back').addClass('active');
			}

			curStep++;
	
			$('.js-calc-item').removeClass('active');
			$('.js-calc-item[data-step='+curStep+']').addClass('active');
	
			$('body,html').animate({scrollTop:$('.js-calc-item.active').offset().top-50},300);

			addPercent = $('.js-calc-item.active').data('add-percent')

			$('.js-calc-progress-val').text(curPercent);
			$('.js-calc-progress-line-cur').css('width', curPercent+'%')
			$('.js-calc-progress-line-probably').css('width', curPercent+addPercent+'%')
			$('.js-calc-progress-add').text(addPercent);
			$('.js-calc-progress-step').text(curStep);
		}
	}
}

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');