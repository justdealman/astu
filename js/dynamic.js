$.fn.preload = function() {
    this.each(function(){
        $('<img>')[0].src = this;
    });
}
function navigationCards() {
	var t = $('.navigation > div > ul li');
	var m = Math.floor((t.parent().outerWidth()-t.outerWidth()*t.size())/3);
	t.css({
		'margin-left': m+'px'
	});
}
function preNews() {
	var t = $('.prenews ul li');
	var m = Math.floor(t.parent().outerWidth()-(t.outerWidth()*2+3));
	if ( $('body').outerWidth() <= 1050 ) {
		$('.prenews ul li:nth-child(2n+1)').css({
			'margin-right': m+'px'
		});
	}
	else {
		$('.prenews ul li:nth-child(2n+1)').css({
			'margin-right': m/2+'px'
		});
	}
	$('.prenews ul li:nth-child(2n)').css({
		'margin-right': '-10px'
	});
}
function footerHeight() {
	var fh = $('.footer').outerHeight();
	$('.footer').css({
		'margin-top': -fh+'px'
	});
	$('.clear').css({
		'height': fh+'px'
	});
}
function footerNav() {
	var t = $('.footer .nav > li');
	var p = Math.floor((t.parent().outerWidth()-(234*t.size())-2)/4);
	$('.footer .nav > li:nth-child(1)').css({
		'padding-right': p+'px'
	});
	$('.footer .nav > li:nth-child(2)').css({
		'padding-left': p+'px',
		'padding-right': p+'px'
	});
	$('.footer .nav > li:nth-child(3)').css({
		'padding-left': p+'px'
	});
	var max = 0;
	t.each(function() {
		var h = $(this).outerHeight(); 
		max = h > max ? h : max;
	});
	t.css({
		'height': max+'px'
	});
}
function footerContacts() {
	var t = $('.footer .contacts ul li');
	var w = 0;
	for ( var i = 1; i <= t.size(); i++ ) {
		w = w + $('.footer .contacts ul li:nth-child('+i+')').outerWidth();
	}
	var m = Math.floor((t.parent().outerWidth()-w)/3)-3;
	t.css({
		'margin-right': m+'px'
	});
}
function sitemap() {
	$('div.sitemap').css({
		'left': $('.panel .sitemap').offset().left+'px',
		'width': $('.panel > div').outerWidth()
	});
}
function rulesDownload() {
	$('.rules-download ul li p').each(function() {
		if ( $(this).outerHeight() == 20 ) {
			$(this).css({
				'padding-top': '10px'
			});
		}
		else {
			$(this).css({
				'padding-top': '0'
			});
		}
	});
}
function aboutNav() {
	var l = $('.personal-area .about > div > ul').offset().left;
	$('.personal-area .about > div > ul > li > a').each(function() {
		$(this).find('span').css({
			'left': -l+'px',
			'width': l+'px',
			'height': $(this).outerHeight()-1+'px'
		});
	});
}
function aboutHeight() {
	var max = 0;
	$('.personal-area .about > div > ul, .personal-area .about > div > div').css({
		'min-height': '0'
	});
	$('.personal-area .about > div > ul, .personal-area .about > div > div').each(function() {
		var h = $(this).height(); 
		max = h > max ? h : max;
	});
	$('.personal-area .about > div > ul, .personal-area .about > div > div').css({
		'min-height': max+'px'
	});
}
$(document).ready(function() {
	if ( $('.menu').length > 0 ) {
		if ( $('.menu .core ul li:first-child').hasClass('current') ) {
			$('.menu').addClass('first');
		}
		if ( $('.menu .core ul li:last-child').hasClass('current') ) {
			$('.menu').addClass('last');
		}
		if ( $('.menu .core ul li.current').length > 0 ) {
			$('.menu .sub[data-sub="'+eval($('.menu .core ul li.current').index()+1)+'"]').css({
				'background': 'rgb(237,45,42)/0 !important',
				'background': 'rgba(237,45,42,0.95)'
			});
		}
		$('.menu .core li a').bind('click', function(event) {
			var e = eval($(this).parent().index()+1);
			var t = $('.menu .core li').size();
			if ( $('.menu .sub[data-sub="'+e+'"]:visible').length > 0 ) {
				$('.menu').removeClass('openedfirst openedlast opened highlightfirst droppedfirst highlightlast droppedlast');
				$('.menu .core ul li a').removeClass('active');
				$('.menu .sub').hide();
			}
			else {
				$('.menu .sub[data-sub="'+e+'"]').show().siblings('.sub').hide();
				$('.menu .core ul li a').removeClass('active');
				$('.menu').addClass('openedfirst openedlast opened');
				$('.menu').removeClass('highlightfirst droppedfirst highlightlast droppedlast');
				if ( e == 1 ) {
					$('.menu').removeClass('openedfirst');
					if ( $(this).parent().hasClass('current') ) {
						$('.menu').addClass('highlightfirst');
					}
					else {
						$('.menu').addClass('droppedfirst');
					}
				}
				if ( e == t ) {
					$('.menu').removeClass('openedlast');
					if ( $(this).parent().hasClass('current') ) {
						$('.menu').addClass('highlightlast');
					}
					else {
						$('.menu').addClass('droppedlast');
					}
				}
				$(this).addClass('active');
			}
			event.preventDefault();
		});
		$('body').click(function() {
			$('.menu').removeClass('openedfirst openedlast opened highlightfirst droppedfirst highlightlast droppedlast');
			$('.menu .core ul li a').removeClass('active');
		   $('.menu .sub').hide();
		});
		$('.menu .sub, .menu .core ul li a').click(function(event) {
			event.stopPropagation();
		});
	}
	if ( $('.navigation').length > 0 ) {
		navigationCards();
	}
	if ( $('.prenews').length > 0 ) {
		preNews();
	}
	if ( $('.footer').length > 0 ) {
		footerNav();
		footerHeight();
		footerContacts();
	}
	if ( $('.panel .sitemap').length > 0 ) {
		$('div.sitemap').append('<span class="close"></span>');
		sitemap();
		$('.panel span.sitemap').bind('click', function() {
			if ( $('div.sitemap:visible').length > 0 ) {
				$('div.sitemap').hide();
				$('.panel span.sitemap').removeClass('active');
			}
			else {
				$('div.sitemap').show();
				$('.panel span.sitemap').addClass('active');
			}
		});
		$('html').click(function() {
			$('div.sitemap').hide();
			$('.panel span.sitemap').removeClass('active');
		});
		$('div.sitemap, .panel span.sitemap').click(function(event) {
			event.stopPropagation();
		});
	}
	if ( $('.menu-inner').length > 0 ) {
		if ( $('.menu-inner > div > div > ul > li:first-child').hasClass('current') ) {
			$('.menu-inner').addClass('first');
		}
		if ( $('.menu-inner > div > div > ul > li:last-child').hasClass('current') ) {
			$('.menu-inner').addClass('last');
		}
		$('.menu-inner > div > div > ul > li').hover(
			function() {
				$(this).children('ul').css({
					'top': $('.menu-inner').height()+'px'
				});
				$(this).children('ul').slideDown(100);
			},
			function() {
				$(this).children('ul').slideUp(100);
			}
		);
	}
	if ( $('.rules-download').length > 0 ) {
		rulesDownload();
	}
	if ( $('select').length > 0 ) {
		$('select').selectbox();
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('input[name="date"]').length > 0 ) {
		$('input[name="date"]').mask('00/00/0000', {placeholder: '  /  /    '});
	}
	$('.form .item .browse').bind('click', function() {
		$(this).parent().find('input[type="file"]').trigger('click');
	});
	$('.personal-area .status .table .element .general h5 span').bind('click', function() {
		if ( $(this).text() == 'Скрыть комментарии' ) {
			$(this).parents('.general').find('.answer').slideUp(0);
			$(this).find('em').text('Показать комментарии');
		}
		else {
			$(this).parents('.general').find('.answer').slideDown(0);
			$(this).find('em').text('Скрыть комментарии');
		}
	});
	$('.personal-area .status .table .element.active').each(function() {
		if ( $(this).next().length > 0 ) {
			$(this).next().find('.caption').css({
				'border-top-width': '0'
			});
		}
	});
	$('.personal-area .status .table .element .caption').bind('click', function() {
		if ( $(this).parent().hasClass('active') ) {
			$(this).parent().find('.general').slideUp(0);
			$(this).parent().removeClass('active');
			if ( $(this).parent().next().length > 0 ) {
				$(this).parent().next().find('.caption').css({
					'border-top': '1px solid #dcdcdc'
				});
			}
		}
		else {
			$(this).parent().find('.general').slideDown(0);
			$(this).parent().addClass('active');
			if ( $(this).parent().next().length > 0 ) {
				$(this).parent().next().find('.caption').css({
					'border-top-width': '0'
				});
			}
		}
	});
	if ( $('.personal-area .filter').length > 0 ) {
		$('.personal-area .filter > div > div > div > ul > li > span').bind('click', function() {
			var t = $(this).parent().children('div');
			if ( t.is(':visible') ) {
				t.hide();
			}
			else {
				t.show();
				t.parents('ul').siblings('ul').children('li').children('div').hide();
			}
		});
		$('.personal-area .filter > div > div > div > ul > li > div ul li input').bind('click', function() {
			var t = $(this).parents('.checker').parent('li');
			if ( $(this).is(':checked') ) {
				if ( t.parents('li').children('span').find('em').length == 0 ) {
					t.parents('li').children('span').empty();
				}
				t.parents('li').children('span').append('<em>'+t.find('em').text()+'</em>');
			}
			else {
				t.parents('li').children('span').find('em:contains("'+t.find('em').text()+'")').remove();
				if ( t.parents('li').children('span').find('em').length == 0 ) {
					t.parents('li').children('span').text(t.parent().parent().children('h5').text());
				}
			}
		});
		$('html').click(function() {
			$('.personal-area .filter > div > div > div > ul > li > div').hide();
		});
		$('.personal-area .filter > div > div > div > ul > li > div, .personal-area .filter > div > div > div > ul > li > span').click(function(event) {
			event.stopPropagation();
		});
	}
	$('.personal-area .specialization table th span').bind('click', function() {
		if ( $(this).hasClass('up') ) {
			$(this).removeClass().addClass('down');
		}
		else {
			$(this).removeClass().addClass('up');
		}
		$(this).parent().siblings().find('span').removeClass();
	});
	if ( $('.personal-area .about > div > ul').length > 0 ) {
		$(['./img/about_menu_a_hover.png']).preload();
		$('.personal-area .about > div > ul > li > a').each(function() {
			$(this).append('<span style="height:'+$(this).outerHeight()+'"></span>');
		});
		aboutNav();
		aboutHeight();
		$('.personal-area .about > div > ul > li > a').bind('click', function(event) {
			$(this).parent().toggleClass('active');
			aboutHeight();
			event.preventDefault();
		});
	}
});
$(window).resize(function() {
	if ( $('.navigation').length > 0 ) {
		navigationCards();
	}
	if ( $('.prenews').length > 0 ) {
		preNews();
	}
	if ( $('.footer').length > 0 ) {
		footerNav();
		footerHeight();
		footerContacts();
	}
	if ( $('.panel .sitemap').length > 0 ) {
		sitemap();
	}
	if ( $('.rules-download').length > 0 ) {
		rulesDownload();
	}
	if ( $('.personal-area .about > div > ul').length > 0 ) {
		aboutNav();
		aboutHeight();
	}
});