/*
*  Project: Demo Plugin for the MongKok template
*  Description: Change JS and CSS settings in Demo
*  Author: Simon Li
*  License: http://www.simon-li.com
*/

;(function ( $, window, undefined ) {
	var document = window.document,
		defaults = {
			propertyName: "value"
		};

	function Demo( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = 'demo';
		this.$win = $(window);
		this.$body = $('body');
		this.$plugInSetup = this.$body.data('plugin_setup');
		this.$previewSettings = $('.preview-settings');
		this.$navToggle = $('.nav-toggle');
		this.$cssBooks = $('.css-book');
		this.$cssIndex = $('#css-index');
		this.firstSectionAlreadyFixed = this.$plugInSetup.options.fixFirstSection;
		this.oriPrimaryColor = $.Color($('.nav-toggle').css('background-color')).toRgbaString();
		this.oriSecondaryColor = $.Color($('.info i.fa').css('color')).toRgbaString();

		this.init();
	}

	Demo.prototype.init = function () {
		if ($('ul.menu.nav').hasClass('snippet')) return;
		this.addNavPreviewSettings();
		this.setupPreviewSettings();
	};

	Demo.prototype.addNavPreviewSettings = function () {
		var self = this;

		// add preview settings to nav
		var navPreviewSettingsHTML = [
			'<li>',
				'<a href="#" class="nav-preview-settings">',
					'<i class="fa fa-cog"></i>',
					'<span>Settings</span>',
				'</a>',
			'</li>'
			].join(''),
			$navPreviewSettings = $(navPreviewSettingsHTML);

		$navPreviewSettings.click(function (e) {
			var $this = $(this);
			self.$previewSettings.fadeIn('slow');
			self.checkCurrentSettings();
			self.$navToggle.click();
		});
		$('ul.menu.nav').append($navPreviewSettings);
	};

	Demo.prototype.checkCurrentSettings = function () {
		var self = this;

		// check color scheme
		var primaryColor = $.Color($('.contact-info-table i.fa').css('color')).toHexString().substr(1,6),
			secondaryColor = $.Color($('.info i.fa').css('color')).toHexString().substr(1,6),
			$primaryColor = this.$previewSettings.find('a.color-primary'),
			$secondaryColor = this.$previewSettings.find('a.color-secondary');
		
		$primaryColor.css({
			'border-color': '#' + primaryColor,
		}).colpick({
			layout:'rgbhex',
			color: primaryColor,
			onSubmit: function (hsb,hex,rgb,el) {
				$(el).css('border-color', '#'+hex);
				$(el).colpickHide();
			}
		});

		$secondaryColor.css({
			'border-color': '#' + secondaryColor,
		}).colpick({
			layout:'rgbhex',
			color: secondaryColor,
			onSubmit: function (hsb,hex,rgb,el) {
				$(el).css('border-color', '#'+hex);
				$(el).colpickHide();
			}
		});

		// check section visible
		$('section').not(':first-child').each(function(index, el) {
			var $el = $(el),
				id = $el.prop('id');

			if ($el.prop('id') === '') return;
			if ($el.hasClass('hidden')){
				self.$previewSettings.find('a.toggle-section-' + id).removeClass('current');
			} else {
				self.$previewSettings.find('a.toggle-section-' + id).addClass('current');
			}
		});

		// check nav bar position
		var navBarPos = this.$plugInSetup.options.navPosition;
		switch(navBarPos){
			case 'top':
			case 'bottom':
			case 'left':
			case 'right':
				this.$previewSettings.find('a.nav-bar-pos').removeClass('current').filter('a.nav-bar-pos-' + navBarPos).addClass('current');
				break;
		}

		// check off-canvas animation
		var offCanvasAni = this.$plugInSetup.options.offCanvasAnimation;
		switch(offCanvasAni){
			case 'push':
			case 'reveal':
			case 'scale-up':
			case 'rotate-in':
			case 'rotate-out':
			case 'rotate-reveal':
				this.$previewSettings.find('a.nav-bar-ani').removeClass('current').filter('a.nav-bar-ani-' + offCanvasAni).addClass('current');
				break;
		}

		// check welcome section height
		var firstSecHeight = this.$plugInSetup.$firstSection.css('height');
		this.$previewSettings.find('a.welcome-height').removeClass('current');

		if (firstSecHeight === this.$win.height() + 'px'){
			this.$previewSettings.find('a.welcome-height-100').addClass('current');
		} else {
			this.$previewSettings.find('a.welcome-height-80').addClass('current');
		}

		// check css book animation
		var bookAniPreset = this.$cssBooks.eq(0).data('plugin_css_book').options.bookTransformPreset;
		this.$previewSettings.find('a.css-book-ani').removeClass('current');

		if (bookAniPreset === 1){
			this.$previewSettings.find('a.css-book-ani-1').addClass('current');
		} else {
			this.$previewSettings.find('a.css-book-ani-2').addClass('current');
		}

		// check box shadow of welcome section
		var welcomeBookShadow = $('section:not(.hidden):not(.dummy):not(#welcome)').eq(0).css('box-shadow');
		this.$previewSettings.find('a.welcome-box-shadow').removeClass('current');

		if ( welcomeBookShadow === 'none'){
			this.$previewSettings.find('a.welcome-box-shadow-no').addClass('current');
		} else {
			this.$previewSettings.find('a.welcome-box-shadow-yes').addClass('current');
		}

		// check fixed positioning of welcome section
		var fixWelcomeSection = this.$plugInSetup.options.fixFirstSection;
		this.$previewSettings.find('a.welcome-fixed').removeClass('current');

		if (fixWelcomeSection === true){
			this.$previewSettings.find('a.welcome-fixed-yes').addClass('current');
		} else{
			this.$previewSettings.find('a.welcome-fixed-no').addClass('current');
		}
	};

	Demo.prototype.setupPreviewSettings = function () {
		var self = this;

		// close preview settings
		this.$previewSettings.find('.close-btn').on('click', function (e) {
			self.$previewSettings.fadeOut('slow');
		});

		// update color scheme
		this.$previewSettings.find('.update-color').on('click', function (e) {
			var pc = self.$previewSettings.find('a.color-primary').css('border-left-color'),
				sc = self.$previewSettings.find('a.color-secondary').css('border-left-color'),
				bs = self.$previewSettings.find('a.welcome-box-shadow.current').hasClass('welcome-box-shadow-yes'),
				wh = self.$previewSettings.find('a.welcome-height.current').hasClass('welcome-height-100');

			if ($(this).hasClass('update-color-single')){
				sc = pc;
				self.$previewSettings.find('a.color-secondary').css('border-color', pc);
			} else if ($(this).hasClass('reset-color')){
				pc = self.oriPrimaryColor;
				sc = self.oriSecondaryColor;
				self.$previewSettings.find('a.color-primary').css('border-color', pc);
				self.$previewSettings.find('a.color-secondary').css('border-color', sc);
			}
			
			self.$cssIndex.attr({
				'href': 'php/css-index-demo.php?pc=' + pc + '&sc=' + sc + '&bs=' + bs + '&wh=' + wh
			});
		});

		// toggle section
		this.$previewSettings.find('a.toggle-section').on('click', function (e) {
			e.preventDefault();
			var $this = $(this),
				i = self.$previewSettings.find('a.toggle-section').index(this) + 1;

			var $targetLi = $('ul.menu.nav li').eq(i),
				$targetSection = $('section:not(.dummy)').eq(i);

			if ($this.hasClass('current')){
				$targetLi.add($targetSection).addClass('hidden');
				$this.removeClass('current');
			} else {
				$targetLi.add($targetSection).removeClass('hidden');
				$this.addClass('current');
				$(window).resize();
			}

			if (self.$previewSettings.find('a.welcome-box-shadow-yes').hasClass('current')){
				self.toggleWelcomeBoxShadow(true);
			} else {
				self.toggleWelcomeBoxShadow(false);
			}
		});

		// change nav bar position
		this.$previewSettings.find('a.nav-bar-pos').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($this.hasClass('nav-bar-pos-top')){
				self.changeNavBarPos('top');
			} else if ($this.hasClass('nav-bar-pos-bottom')){
				self.changeNavBarPos('bottom');
			} else if ($this.hasClass('nav-bar-pos-left')){
				self.changeNavBarPos('left');
			} else if ($this.hasClass('nav-bar-pos-right')){
				self.changeNavBarPos('right');
			}
			self.$previewSettings.find('a.nav-bar-pos').removeClass('current');
			$this.addClass('current');
		});

		// change nav bar animation
		this.$previewSettings.find('a.nav-bar-ani').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($this.hasClass('disabled')) return;

			if ($this.hasClass('nav-bar-ani-reveal')){
				self.changeOffCanvasAnimation('reveal');
			} else if ($this.hasClass('nav-bar-ani-push')){
				self.changeOffCanvasAnimation('push');
			} else if ($this.hasClass('nav-bar-ani-scale-up')){
				self.changeOffCanvasAnimation('scale-up');
			} else if ($this.hasClass('nav-bar-ani-rotate-in')){
				self.changeOffCanvasAnimation('rotate-in');
			} else if ($this.hasClass('nav-bar-ani-rotate-out')){
				self.changeOffCanvasAnimation('rotate-out');
			} else if ($this.hasClass('nav-bar-ani-rotate-reveal')){
				self.changeOffCanvasAnimation('rotate-reveal');
			}
			self.$previewSettings.find('a.nav-bar-ani').removeClass('current');
			$this.addClass('current');
		});

		// change welcome section height
		this.$previewSettings.find('a.welcome-height').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($this.hasClass('welcome-height-100')){
				self.toggleFirstSectionFullHeight(true);
			} else if ($this.hasClass('welcome-height-80')){
				self.toggleFirstSectionFullHeight(false);
			}
			self.$previewSettings.find('a.welcome-height').removeClass('current');
			$this.addClass('current');
		});

		// change css book animation preset
		this.$previewSettings.find('a.css-book-ani').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($this.hasClass('css-book-ani-1')){
				self.changeCSSBookPreset(1);
			} else if ($this.hasClass('css-book-ani-2')){
				self.changeCSSBookPreset(2);
			}
			self.$previewSettings.find('a.css-book-ani').removeClass('current');
			$this.addClass('current');
		});

		// change box shadow in welcome section
		this.$previewSettings.find('a.welcome-box-shadow').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($this.hasClass('welcome-box-shadow-yes')){
				self.toggleWelcomeBoxShadow(true);
			} else if ($this.hasClass('welcome-box-shadow-no')){
				self.toggleWelcomeBoxShadow(false);
			}
			self.$previewSettings.find('a.welcome-box-shadow').removeClass('current');
			$this.addClass('current');
		});

		// toggle fixed positioning of welcome section
		this.$previewSettings.find('a.welcome-fixed').on('click', function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($this.hasClass('welcome-fixed-yes')){
				self.toggleFixingWelcomeSection(true);
			} else if ($this.hasClass('welcome-fixed-no')){
				self.toggleFixingWelcomeSection(false);
			}
			self.$previewSettings.find('a.welcome-fixed').removeClass('current');
			$this.addClass('current');
		});
	};

	Demo.prototype.changeNavBarPos = function (pos) {
		switch (pos){
			case 'top':
			case 'bottom':
			case 'left':
			case 'right':
				this.$plugInSetup.options.navPosition = pos;
				this.$plugInSetup.offCanvasInit();
				break;
		}
	};

	Demo.prototype.changeOffCanvasAnimation = function (ani) {
		switch (ani){
			case 'push':
			case 'reveal':
			case 'scale-up':
			case 'rotate-in':
			case 'rotate-out':
			case 'rotate-reveal':
				this.$plugInSetup.options.offCanvasAnimation = ani;
				this.$plugInSetup.offCanvasInit();
				break;
		}
	};

	Demo.prototype.toggleFirstSectionFullHeight = function (isFullHeight) {
		if (isFullHeight === true){
			this.$plugInSetup.$firstSection.css('max-height', '');
			this.$plugInSetup.$firstSection.css('height', '100%');
			this.$plugInSetup.$firstSection.next('.dummy').css({
				'height': this.$plugInSetup.$firstSection.height() + 'px',
			});
		} else{
			this.$plugInSetup.$firstSection.css('height', '80%');
			this.$plugInSetup.$firstSection.css('max-height', this.$plugInSetup.$firstSection.height());
			this.$plugInSetup.$firstSection.next('.dummy').css({
				'height': this.$plugInSetup.$firstSection.height() + 'px',
			});
		}
	};

	Demo.prototype.toggleFixingWelcomeSection = function (isFixed) {
		if (isFixed === false) {
			this.$plugInSetup.unfixFirstSection();
			this.$plugInSetup.options.fixFirstSection = false;
		} else {
			if (this.firstSectionAlreadyFixed === false){
				this.$plugInSetup.options.fixFirstSection = true;
				this.$plugInSetup.fixFirstSection();
				this.firstSectionAlreadyFixed = true;
			} else {
				this.$plugInSetup.options.fixFirstSection = true;
				this.$plugInSetup.refixFirstSection();
			}
		}
	};

	Demo.prototype.changeCSSBookPreset = function (preset) {
		if (preset !== 1 && preset !== 2) return;
		this.$cssBooks.each(function(index, el) {
			var $el = $(el);
			$el.data('plugin_css_book').options.bookTransformPreset = preset;
			$el.data('plugin_css_book').checkBookTransformPreset();
			$el.find('.bookWrapper').trigger('mouseleave');
		});
	};

	Demo.prototype.toggleWelcomeBoxShadow = function (enableShadow) {
		var $sectionAfterWelcome = $('section:not(.hidden):not(.dummy):not(#welcome)').eq(0);
		if (enableShadow === true){
			$sectionAfterWelcome.css('box-shadow', '0 0 15px 0 rgba(0,0,0,0.5)');
		} else {
			$('section').css('box-shadow', 'none');
		}
	};

	$.fn['demo'] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_demo')) {
				$.data(this, 'plugin_demo', new Demo( this, options ));
			}
		});
	};

}(jQuery, window));