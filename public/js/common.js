"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // ???? ???????????? ???????????????? ?????????????? ?? ????????????????, ?????????? ?????????????? ?????????? ?????????? 0

document.body.append(div);
var scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		var link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "??????????????",
					NEXT: "????????????",
					PREV: "??????????" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function afterClose() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null; // 	document.querySelector("html").classList.remove("fixed")
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		var menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(function (element) {
				return element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.remove("fixed");
			});
			document.querySelector("html").style.marginRight = null;
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this2.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 1200px)").matches) _this2.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : ''; // console.log(el.innerHTML);

				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary  mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var input = document.querySelectorAll('[type="tel"]');
		input.forEach(function (element) {
			window.intlTelInput(element, {
				preferredCountries: ["ru", "by"] // any initialisation options go here

			});
		});
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">?? ??????????????????, ???? ?????????????????????? ???????????????????? ??????????????. ????????????????????, <a href="http://browsehappy.com/" target="_blank">???????????????? ?????? ??????????????</a>, ?????????? ???????????????? ????????????????????????????????????, ???????????????? ?????????????????????????? ?????????????????? ?? ???????????????? ????????????????????????.</p></div>');
		}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	checkEmptyVal: function checkEmptyVal() {
		this.value !== '' || this.tagName == "SELECT" && this.querySelector('option').value !== null && this.querySelector('option').text || this.type == "date" ? $(this).addClass('not-empty') : $(this).removeClass('not-empty');
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.checkEmptyVal();
	$('.has-ph-js').blur(JSCCommon.checkEmptyVal);
	$('.has-ph-js').each(JSCCommon.checkEmptyVal);
	$('.has-ph-js.select-custom--js').on('select2:select', JSCCommon.checkEmptyVal); // JSCCommon.CustomInputFile();

	var x = window.location.host;
	var screenName;
	screenName = '05.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function setFixedNav() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', function () {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true
	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); //luckyone Js
	//

	var headerBlSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,
		navigation: {
			nextEl: '.headerBlock-swiper-next',
			prevEl: '.headerBlock-swiper-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});
	var slideSection = document.querySelectorAll(".sNew--js");
	slideSection.forEach(function (e) {
		var sNewSlider = new Swiper(e.querySelector('.sNew-slider-js'), {
			slidesPerView: 'auto',
			watchOverflow: true,
			spaceBetween: 20,
			navigation: {
				nextEl: e.querySelector('.sNew-swiper-next'),
				prevEl: e.querySelector('.sNew-swiper-prev')
			}
		});
	}); //

	var sPresentsSlider = new Swiper('.sPresents-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sPresents-swiper-next',
			prevEl: '.sPresents-swiper-prev'
		},
		pagination: {
			//el: $(this).find('.sPresents-pagination'),
			el: '.sPresents-pagination',
			type: 'bullets',
			clickable: true
		}
	}); //prod card

	var prodCardThumb = new Swiper('.sProdCard-thumb-js', {
		slidesPerView: 'auto',
		direction: 'vertical',
		spaceBetween: 10,
		navigation: {
			nextEl: '.sProdCard-thumb-next-js',
			prevEl: '.sProdCard-thumb-prev-js'
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6
		}
	});
	var prodCardSlider = new Swiper('.sProdCard-slider-js', {
		spaceBetween: 30,
		thumbs: {
			swiper: prodCardThumb
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3
		},
		loop: true
	}); //select2

	$('.default-select2-js').select2({
		dropdownCssClass: "default-select2-dd"
	});
	$('.default-select2-js').one('select2:open', function (e) {
		var ph = this.getAttribute('data-search-placeholder') || '??????????';
		$('input.select2-search__field').prop('placeholder', ph);
	}); //

	$('.select2-no-search-js').select2({
		minimumResultsForSearch: Infinity,
		dropdownCssClass: "default-select2-dd"
	}); //

	function makeDDGroup(ArrSelectors) {
		var _iterator = _createForOfIteratorHelper(ArrSelectors),
				_step;

		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var parentSelect = _step.value;
				var parent = document.querySelector(parentSelect);

				if (parent) {
					(function () {
						// childHeads, kind of funny))
						var ChildHeads = parent.querySelectorAll('.dd-head-js');
						$(ChildHeads).click(function () {
							var clickedHead = this;
							$(ChildHeads).each(function () {
								if (this === clickedHead) {
									//parent element gain toggle class, style head change via parent
									$(this.parentElement).toggleClass('active');
									$(this.parentElement).find('.dd-content-js').slideToggle(function () {
										$(this).toggleClass('active');
									});
								} else {
									$(this.parentElement).removeClass('active');
									$(this.parentElement).find('.dd-content-js').slideUp(function () {
										$(this).removeClass('active');
									});
								}
							});
						});
					})();
				}
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	}

	$('.free-dd-head-js').click(function () {
		$(this.parentElement).toggleClass('active');
		$(this.parentElement).find('.free-dd-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	makeDDGroup(['.sProdCard-dd-group-js']); //add to .f-hide-btn-js

	$('.f-hide-btn-js').click(function () {
		var ddContent = this.closest('.free-dd-content-js');
		var parent = ddContent.parentElement;
		$(parent).toggleClass('active');
		$(ddContent).slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); // rangle sliders

	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	}

	$(".range-wrap").each(function () {
		var _this = $(this);

		var $range = _this.find(".slider-js");

		var $inputFrom = _this.find(".input_from");

		var $inputTo = _this.find(".input_to");

		var instance,
				from,
				to,
				min = $range.data('min'),
				max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: false,
			hide_from_to: true,
			//here
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to)); // InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val);
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});
	}); //

	$(document).on('click', '.a-show-more-js', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).siblings('.a-hidden-items-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); //04-2

	var sCatalogChbSlider = new Swiper('.sCatalog-chb-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 10,
		freeMode: true,
		loopFillGroupWithBlank: true,
		//touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	}); //??

	$('.chb-box-head-js').click(function () {
		$(this).toggleClass('active');
		$(this.parentElement).toggleClass('active');
		$(this.parentElement).find('.chb-box-content-js').fadeToggle(function () {
			$(this).toggleClass('active');
		});
	});
	$('body').click(function () {
		if (!event.target.closest('.chb-box-js')) {
			var activeChbHead = document.querySelectorAll('.chb-box-head-js.active');
			$(activeChbHead).each(function () {
				var head = this;
				$(this).removeClass('active');
				$(this.parentElement).find('.chb-box-content-js').fadeOut(function () {
					$(this).removeClass('active');
					$(head.parentElement).removeClass('active');
				});
			});
		}
	}); //04-4 authors

	$('.sAuthors-line-js').each(function () {
		console.log(this.querySelector('.sAuthors-slider-js'));
		var sAuthorsSlider = new Swiper($(this).find('.sAuthors-slider-js'), {
			slidesPerView: 'auto',
			watchOverflow: true,
			spaceBetween: 20,
			freeMode: true,
			loopFillGroupWithBlank: true,
			slideToClickedSlide: true,
			freeModeMomentum: true
		});
	});
	var sAuthorsSlider = new Swiper('.sAuthors-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 20,
		freeMode: true,
		loopFillGroupWithBlank: true,
		slideToClickedSlide: true,
		freeModeMomentum: true
	});
	$('.cart-btn-js').click(function () {
		$('.cart-dd--js').toggleClass('active');
		$('body').toggleClass('fixed2');
	}); //help pop up

	$('.help-pp-header-js').click(function () {
		$(this).toggleClass('active');
		$('.help-pp-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); //css vars

	var helpPPhead = document.querySelector('.help-pp-header-js');

	if (helpPPhead) {
		calcHelpHeadHeight();
		window.addEventListener('resize', calcHelpHeadHeight);
	}

	function calcHelpHeadHeight() {
		document.documentElement.style.setProperty('--help-head-height', "".concat(helpPPhead.offsetHeight, "px"));
	} //end luckyone Js
	//todo
	// 1. clean js file
	// 2. remake page with h1(02-04)


	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		console.log(popoverTriggerEl);
		var popover = new bootstrap.Popover(popoverTriggerEl, {
			container: '.sAddress__map-wrap',
			// trigger: 'manual',
			placement: 'auto' // offset: 0,

		});
	});
	$('.sAddress [data-bs-toggle="popover"]').click(function () {
		var content = $(this).find('.popover-content');
		$('.popover-body .a-items-js  ').remove();
		$('.popover-body').append(content.html());
		console.log(content);
	});
	var sShowSlider = new Swiper('.sShow__slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sShow .swiper-next',
			prevEl: '.sShow .swiper-prev'
		},
		pagination: {
			//el: $(this).find('.sShow-pagination'),
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});
	var NavSlider = new Swiper('.nav-slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 20
	});
	var inputWrap = document.querySelectorAll(".form-wrap__input-wrap");

	if (inputWrap) {
		inputWrap.forEach(function (el) {
			el.addEventListener("click", function (event) {
				var btn = event.target.closest(".form-wrap__btn-toggle-show-password--js");
				var input = el.querySelector('.form-wrap__input');
				if (!btn) return;
				btn.classList.toggle('active');
				input.type == "password" ? input.type = "text" : input.type = "password";
			});
		});
	}

	$(document).on('click', ".td-head", function () {
		$(this).parent().toggleClass("active").next().find(".toggle-table").slideToggle();
	});
	var subLink = document.querySelectorAll(".sub-menu__left-block> ul > li");
	subLink.forEach(function (el, index) {
		var linkIndex = index;
		el.addEventListener("mouseover", function () {
			subLink.forEach(function (el) {
				if (el.classList.contains("active")) el.classList.remove('active');
			});
			el.classList.add("active");
			var subMenuAll = document.querySelectorAll(".sub-menu-child");
			subMenuAll.forEach(function (el, index) {
				if (el.classList.contains("active")) el.classList.remove('active');
				if (index == linkIndex) el.classList.add("active");
			});
		});
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}