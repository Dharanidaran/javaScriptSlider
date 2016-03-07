// sample.js



// // <div class="slider" id="main-slider"><!-- outermost container element -->
// // 	<div class="slider-wrapper"><!-- innermost wrapper element -->
// // 		<img src="http://lorempixel.com/1024/400/animals" alt="First" class="slide" /><!-- slides -->
// // 		<img src="http://lorempixel.com/1024/400/business" alt="Second" class="slide" />
// // 		<img src="http://lorempixel.com/1024/400/city" alt="Third" class="slide" />
// // 	</div>
// // </div>



// // .slider-wrapper > .slide:first-child {
// // 	opacity: 1;
// // }

// (function() {
	
// 	function Slideshow( element ) {
// 		this.el = document.querySelector( element );
// 		this.init();
// 	}
	
// 	Slideshow.prototype = {
// 		init: function() {
// 			this.wrapper = this.el.querySelector( ".slider-wrapper" ); //slider
// 			this.slides = this.el.querySelectorAll( ".slide" );			// imgContainer
// 			this.previous = this.el.querySelector( ".slider-previous" );
// 			this.next = this.el.querySelector( ".slider-next" );
// 			this.index = 0;
// 			this.total = this.slides.length;
// 			this.timer = null;
			
// 			this.action();
// 			this.stopStart();	
// 		},
// 		_slideTo: function( slide ) {
// 			var currentSlide = this.slides[slide];
// 			currentSlide.style.opacity = 1;
			
// 			for( var i = 0; i < this.slides.length; i++ ) {
// 				var slide = this.slides[i];
// 				if( slide !== currentSlide ) {
// 					slide.style.opacity = 0;
// 				}
// 			}
// 		},
// 		action: function() {
// 			var self = this;
// 			self.timer = setInterval(function() {
// 				self.index++;
// 				if( self.index == self.slides.length ) {
// 					self.index = 0;
// 				}
// 				self._slideTo( self.index );
				
// 			}, 3000);
// 		},
// 		stopStart: function() {
// 			var self = this;
// 			self.el.addEventListener( "mouseover", function() {
// 				clearInterval( self.timer );
// 				self.timer = null;
				
// 			}, false);
// 			self.el.addEventListener( "mouseout", function() {
// 				self.action();
				
// 			}, false);
// 		}
		
		
// 	};
	
// 	document.addEventListener( "DOMContentLoaded", function() {
		
// 		var slider = new Slideshow( "#main-slider" );
		
// 	});
	
	
// })();




////////////////////// Ready /////////////



// (function (){

// 	function Slideshow(element){
// 		this.el =document.querySelector(element);
// 		this.init();
// 		this.index=0;

// 	}


// 	Slideshow.prototype ={

// 		init: function(){
// 			this.wrapper = this.el.querySelector('slider');
// 			this.slides = this.el.querySelectorAll( ".imgContainer" );			// imgContainer
// 			this.action();
// 			this.stopStart();
// 		},

// 		action :function(){

// 			var self =this;

// 			self.timer = setInterval(function() {
// 				self.index++;
// 				if( self.index == self.slides.length ) {
// 					self.index = 0;
// 				}
// 				self._slideTo( self.index );
				
// 			}, 3000);
// 		},

// 		stopStart: function() {
// 			var self = this;
// 			self.el.addEventListener( "mouseover", function() {
// 				clearInterval( self.timer );
// 				self.timer = null;
				
// 			}, false);
// 			self.el.addEventListener( "mouseout", function() {
// 				self.action();
				
// 			}, false);
// 		},

// 		_slideTo: function( slide ) {
// 			var currentSlide = this.slides[slide];
// 			currentSlide.setAttribute('class','active')
			
// 			for( var i = 0; i < this.slides.length; i++ ) {
// 				var slide = this.slides[i];
// 				if( slide !== currentSlide ) {
// 					slide.removeAttribute('class','active');
// 				}
// 			}



// 		},
// 	}

// 	var slider = new Slideshow( "#wrapperSlider" );
// })();





