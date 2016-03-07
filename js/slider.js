(function($,window) {
	
	function Slideshow( element ) {
		this.el = document.querySelector( element );
		this.init();
	}
	
	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( ".slider" ); //slider
			this.slides = this.el.querySelectorAll( ".imgContainer" );// imgContainer
			this.navArrows =this.el.querySelectorAll(".navSlider"); //navSlider
			this.wrapperSide =this.el.querySelector("#wrapperSide"); // wrapperSide
			this.imageOverview =this.el.querySelectorAll(".imageOverview");


			if(this.slides[0]){
				this.slides[0].setAttribute('class','imgContainer active');
			}
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null; // Set the timer to null initally	
			this.action();
			this.regEvents();
		},

		action: function() {
			var self = this;
			self._slideSideWrapper(self.index); // Set the current prev and next class to wrapperSide > imageOverview
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );  // Call this function for every 15000 MilliSec
				self._slideSideWrapper(self.index);
				
			}, 10000);
		},

		_slideTo: function( slide ) {
			if(this.slides[slide]){
				var currentSlide = this.slides[slide];
				currentSlide.classList.add("active");

				for( var i = 0; i < this.slides.length; i++ ) {
					var slide = this.slides[i];
					if( slide !== currentSlide ) {
						slide.classList.remove("active");
					}
				}
			}
			else{
				console.log('Error calling the slideTo function');
			}

		},



		_slideSideWrapper: function( index) {  //  Side wrapper class manipulation function

			var self= this;
			var size=self.imageOverview.length;
			var current=index;
			var prev=index-1;
			var next=index+1; 


			if(size >0){

				if(prev <0 ){
					prev=size-1;
				}
				if(next == size){
					next=0;
				}			
			} //Assign className after checking these conditions



			for (var i=0;i <size;i++){

				//self.imageOverview[i].classList.remove('current');
				self.imageOverview[i].classList.remove('next');
				self.imageOverview[i].classList.remove('prev');
			}

			self.imageOverview[current].setAttribute('class',"imageOverview current");
			self.imageOverview[next].setAttribute('class',"imageOverview next");
			self.imageOverview[prev].setAttribute('class',"imageOverview prev");

		},

		_showSideInfo : function( side ){
			var self= this;
			$($('.imageOverview')[side]).addClass('showUp')


		},

		_removeSideInfo: function(side){
			var self =this;
			$($('.imageOverview')[side]).removeClass('showUp')
		},

		_closedIndex :function(side){
			var self=this;
			if( self.index == self.slides.length ) {
							self.index = 0;
			}

			if( self.index == -1 ) {
					self.index = self.slides.length-1; // On going back we might end up 
												// pointing slide index to -1;
												// So its necessary to point to the last element;
			}
		},

		regEvents: function() {	
			var self = this;

			self.wrapper.addEventListener( "mouseover", function() {

				clearInterval( self.timer );
				self.timer = null;
				self._showSideInfo(self.index);


				
			}, false);
			self.wrapper.addEventListener( "mouseout", function() {
				self.action();
				self._removeSideInfo(self.index);
				
			}, false);

			 self.navArrows[0].addEventListener('click',function(){ // Register click event for left nav

			 		//Remove showUp class from the current slide and add it to the next one.

			 		self.index--;
					self._closedIndex(self.index);
					self._slideTo(self.index);
					self._slideSideWrapper(self.index);
				},false);


			 self.navArrows[1].addEventListener('click',function(){ // Register click event for right nav
					self.index++;
					self._closedIndex(self.index);
					self._slideTo(self.index);
					self._slideSideWrapper(self.index);		
				},false);

				$( ".imageOverview" ).click(function(event) {
				 	var idx= parseInt(($(event.target).data('idx')) );

				 					 	
				 	if(typeof idx ==='number'){
			 		self.index = idx;
			 		self._closedIndex(self.index);
					self._slideTo(self.index);
					self._removeSideInfo();
					self._showSideInfo()
					self._slideSideWrapper(self.index);


				 	}
				 	else{
				 		console.log(' Error -Please check the data attr of the wrpperSlider html');
				 	}
				});	

		},


		
		
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		
		var slider = new Slideshow( "#sliderContainer" );
		
	});
	
	
})(jQuery, window);