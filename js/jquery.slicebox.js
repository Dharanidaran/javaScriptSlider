// jquery.slicebox.js

; (function ($,window,undefined){
	'use strict';

	var $event =$.event; // Create a variable $event to hold a jQuery event object;
	var $special, resizeTimeout;



	//global

	var $window =$(window), 	// Jquery window object
		Modernizr= window.Modernizr; //Mordernizr normal


	$.Slicebox= function (options, element){ //Constructor Object
		this.$el = $(element); // Jquery element assigned to $el variable;
		this._init(options);

	}


	// $.Slicebox function's object;
	$.Slicebox.defaults={
		orientation :'v', 		// (v)ertical, (h)orizontal or (r)andom
		perspective :1200, 		// perspective value
		cuboidsCount:5,			// number of slices / cuboids, needs to be an odd number 15
		cuboidsRandom:false,	//cuboids is going to be random (cuboidsCount is overwitten)
		maxCuboidsCount:5,		// each cuboid will move x pixels left / top (depending on orientation). 
								//The middle cuboid doesn't move. 
								//the middle cuboid's neighbors will move disperseFactor pixels
		disperseFactor : 0,
		colorHiddenSides:'#222',// color of the hidden sides
		sequentialFactor:150,	// the animation will start from left to right. The left most cuboid will be the first one to rotate
								// this is the interval between each rotation in ms
		speed:600,				// animation speed
								// this is the speed that takes "1" cuboid to rotate
		easing:'ease',			// transition easing 
		autoplay:false,			// if true the slicebox will start the animation automatically
		interval:3000,			// time (ms) between each rotation, if autoplay is true
		fallbackFadeSpeed:300,	// the fallback will just fade out / fade in the items
								// this is the time fr the fade effect

		//callbacks
		onBeforeChange: function(position){ return false;},
		onAfterChange: function(position){ return false; },
		onReady :function () { return false;}


	}


	$.Slicebox.prototype={
		_init : function (options){

			//options
			this.options = $.extend(true,{},$.Slicebox.defaults,options);
			this._validate();
			this.$items = this.$el.children('li');
			this.itemCount =this.$items.length;

			//if there's no items return 
			if (this.itemsCount===0){
				return false;
			};


			// suport for css 3d transforms and css transitions
			this.support = Modernizr.csstransition && Modernizr.csstransforms3d;

			// current image index
			this.current = 0;

			// control if the slicebox is animating
			this.isAnimating = false;

			// control if slicebox is ready (all images loaded)
			this.isReady = false

			var self =this;
			this.$el.imagesLoaded( function(){
				var $current =self.$items.eq(self.current).css('display', 'block').addClass('sb-current');
			});

			//get real size of image
			var i =new Image();
			i.src = $current.find('img').attr('src');
			self.realWidth=i.width;

			// Assumming all images with same size;

			self._setSize();
			self._setStyle();
			self._initEvents();

			self.options.onReady();
			self._isReady=true;

			if( self.options.autoplay){
				self._startSlideshow();
			}

		}
	}


	_validate			: function( options ) {

			if( this.options.cuboidsCount < 0 ){

				this.options.cuboidsCount = 1;

			}
			else if( this.options.cuboidsCount > 15 ) {

				this.options.cuboidsCount = 15;

			}
			else if( this.options.cuboidsCount %2 === 0 ) {

				++this.options.cuboidsCount;

			}
			
			if( this.options.maxCuboidsCount < 0 ){

				this.options.maxCuboidsCount = 1;

			}
			else if( this.options.maxCuboidsCount > 15 ) {

				this.options.maxCuboidsCount = 15;

			}
			else if( this.options.maxCuboidsCount %2 === 0 ) {

				++this.options.maxCuboidsCount;

			}
			
			if( this.options.disperseFactor < 0 ) {

				this.options.disperseFactor = 0;

			}
			
			if( this.options.orientation !== 'v' && this.options.orientation !== 'h' && this.options.orientation !== 'r' ) {

				this.options.orientation = 'v';

			}

		},




// Imported Plugins 
/*
	* debouncedresize: special jQuery event that happens once after a window resize
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/
	$special,
	resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$( this ).on( "resize", $special.handler );
		},
		teardown: function() {
			$( this ).off( "resize", $special.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply( context, args );
				};

			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout( dispatch, $special.threshold );
		},
		threshold: 50
	};

	// ======================= imagesLoaded Plugin ===============================
	// https://github.com/desandro/imagesloaded

	// $('#my-container').imagesLoaded(myFunction)
	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images

	// callback function gets image collection as argument
	//  this is the container

	// original: mit license. paul irish. 2010.
	// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

	// blank image data-uri bypasses webkit log warning (thx doug jones)
	var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	$.fn.imagesLoaded = function( callback ) {
		var $this = this,
			deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
			hasNotify = $.isFunction(deferred.notify),
			$images = $this.find('img').add( $this.filter('img') ),
			loaded = [],
			proper = [],
			broken = [];

		// Register deferred callbacks
		if ($.isPlainObject(callback)) {
			$.each(callback, function (key, value) {
				if (key === 'callback') {
					callback = value;
				} else if (deferred) {
					deferred[key](value);
				}
			});
		}

		function doneLoading() {
			var $proper = $(proper),
				$broken = $(broken);

			if ( deferred ) {
				if ( broken.length ) {
					deferred.reject( $images, $proper, $broken );
				} else {
					deferred.resolve( $images );
				}
			}

			if ( $.isFunction( callback ) ) {
				callback.call( $this, $images, $proper, $broken );
			}
		}

		function imgLoaded( img, isBroken ) {
			// don't proceed if BLANK image, or image is already loaded
			if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
				return;
			}

			// store element in loaded images array
			loaded.push( img );

			// keep track of broken and properly loaded images
			if ( isBroken ) {
				broken.push( img );
			} else {
				proper.push( img );
			}

			// cache image and its state for future calls
			$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

			// trigger deferred progress method if present
			if ( hasNotify ) {
				deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
			}

			// call doneLoading and clean listeners if all images are loaded
			if ( $images.length === loaded.length ){
				setTimeout( doneLoading );
				$images.unbind( '.imagesLoaded' );
			}
		}

		// if no images, trigger immediately
		if ( !$images.length ) {
			doneLoading();
		} else {
			$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
				// trigger imgLoaded
				imgLoaded( event.target, event.type === 'error' );
			}).each( function( i, el ) {
				var src = el.src;

				// find out if this image has been already checked for status
				// if it was, and src has not changed, call imgLoaded on it
				var cached = $.data( el, 'imagesLoaded' );
				if ( cached && cached.src === src ) {
					imgLoaded( el, cached.isBroken );
					return;
				}

				// if complete is true and browser supports natural sizes, try
				// to check for image status manually
				if ( el.complete && el.naturalWidth !== undefined ) {
					imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
					return;
				}

				// cached images don't fire load sometimes, so we reset src, but only when
				// dealing with IE, or image is complete (loaded) and failed manual check
				// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
				if ( el.readyState || el.complete ) {
					el.src = BLANK;
					el.src = src;
				}
			});
		}

		return deferred ? deferred.promise( $this ) : $this;
	};

})( jQuery, window );