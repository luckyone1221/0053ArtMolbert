let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
				// 	document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			document.querySelector("html").style.marginRight = null
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				// console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		var input = document.querySelectorAll('[type="tel"]');
		input.forEach(function (element) {
			window.intlTelInput(element, {
				preferredCountries: ["ru", "by"],
				// any initialisation options go here
			});
		});
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	checkEmptyVal() {
		((this.value !== '' || (this.tagName == "SELECT" && (this.querySelector('option').value !== null && this.querySelector('option').text) )) || this.type == "date")
			? $(this).addClass('not-empty')
			: $(this).removeClass('not-empty')
	},
};
const $ = jQuery;

function eventHandler() {
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
	$('.has-ph-js.select-custom--js').on('select2:select', JSCCommon.checkEmptyVal);

	// JSCCommon.CustomInputFile();
	var x = window.location.host;
	let screenName;
	screenName = '04.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});
	//luckyone Js
	//
	let headerBlSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,

		navigation: {
			nextEl: '.headerBlock-swiper-next',
			prevEl: '.headerBlock-swiper-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	//
	let sNewSlider = new Swiper('.sNew-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 20,

		navigation: {
			nextEl: '.sNew-swiper-next',
			prevEl: '.sNew-swiper-prev',
		},
	});
	//
	let sPresentsSlider = new Swiper('.sPresents-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,

		navigation: {
			nextEl: '.sPresents-swiper-next',
			prevEl: '.sPresents-swiper-prev',
		},
		pagination: {
			//el: $(this).find('.sPresents-pagination'),
			el: '.sPresents-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//prod card
	let prodCardThumb = new Swiper('.sProdCard-thumb-js', {
		slidesPerView: 'auto',
		direction: 'vertical',
		spaceBetween: 10,

		navigation: {
			nextEl: '.sProdCard-thumb-next-js',
			prevEl: '.sProdCard-thumb-prev-js',
		},

		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},

	});
	let prodCardSlider = new Swiper('.sProdCard-slider-js', {
		spaceBetween: 30,
		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		loop: true,
	});

	//select2
	$('.default-select2-js').select2({
		dropdownCssClass: "default-select2-dd",
	});
	$('.default-select2-js').one('select2:open', function(e) {
		let ph = this.getAttribute('data-search-placeholder') || 'Поиск';
		$('input.select2-search__field').prop('placeholder', ph);
	});
	//
	$('.select2-no-search-js').select2({
		minimumResultsForSearch: Infinity,
		dropdownCssClass: "default-select2-dd",
	});

	//
	function makeDDGroup(ArrSelectors){
		for (let parentSelect of ArrSelectors){
			let parent = document.querySelector(parentSelect);
			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js');
				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	}
	$('.free-dd-head-js').click(function (){
		$(this.parentElement).toggleClass('active');
		$(this.parentElement).find('.free-dd-content-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	})
	makeDDGroup([
		'.sProdCard-dd-group-js'
	]);

	//add to .f-hide-btn-js
	$('.f-hide-btn-js').click(function (){
		let ddContent = this.closest('.free-dd-content-js');
		let parent = ddContent.parentElement;

		$(parent).toggleClass('active');
		$(ddContent).slideToggle(function (){
			$(this).toggleClass('active');
		})
	})

	// rangle sliders
	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
	}
	$(".range-wrap").each(function () {
		let _this = $(this);
		var $range= _this.find(".slider-js");
		var $inputFrom = _this.find(".input_from");
		var $inputTo = _this.find(".input_to");
		var instance, from, to,
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
			$inputTo.prop("value", currencyFormat(to));
			// InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +($(this).prop("value").replace(/\s/g, ''));
			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val)
		});

		$inputTo.on("change input ", function () {
			var val = +($(this).prop("value").replace(/\s/g, ''));

			// validate
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

	});

	//
	$(document).on('click', '.a-show-more-js', function (e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).siblings('.a-hidden-items-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	})

	//end luckyone Js

	//todo
	// 1. clean js file
	// 2. remake page with h1(02-04)



	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		console.log(popoverTriggerEl);
		var popover = new bootstrap.Popover(popoverTriggerEl, {

			container: '.sAddress__map-wrap',
			// trigger: 'manual',
			placement: 'auto',
			// offset: 0,
		})
	})

	$('.sAddress [data-bs-toggle="popover"]').click(function(){
		let content = $(this).find('.popover-content');
		$('.popover-body .a-items-js  ').remove();
		$('.popover-body').append(content.html());
		console.log(content);
	})


	let sShowSlider = new Swiper('.sShow__slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 30,

		navigation: {
			nextEl: '.sShow .swiper-next',
			prevEl: '.sShow .swiper-prev',
		},
		pagination: {
			//el: $(this).find('.sShow-pagination'),
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}