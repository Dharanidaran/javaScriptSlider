// customSlide.js

//Lets Start with a anonymous closure
;(function(window){


	var docElmt=document.documentElement;
	var container=document.getElementById('container');
	var trigger=document.getElementById('trigger');
	var wrapper=document.getElementById('wrapper');
	var testElem=document.getElementById('chart');

	var revealed=false;
	var animating=false;
	var pushed=false;
	var scrollHeight;



	////////////////////////////////////////////////////////////////
	//////////skills.js variable ///////////////////////////////////
	////////////////////////////////////////////////////////////////

	var links = [
		{source: "DE", target: "Math" },
		{source: "Linear Algebra", target: "Math" },
		{source: "Regression Analysis", target: "Math" },
		{source: "Probability", target: "Math" },
		{source: "PHP", target: "Web" },
		{source: "Wordpress", target: "PHP" },
		{source: "CSS", target: "Web" },
		{source: "SCSS", target: "CSS" },
		{source: "LESS", target: "CSS" },

		{source: "C", target: "Coding" },
		{source: "C++", target: "Coding" },
		{source: "Python", target: "Coding" },
		{source: "NumPy", target: "Python" },
		{source: "SciPy", target: "Python" },
		{source: "R.E", target: "Python" },
		{source: "Matplotlib", target: "Python" },

		{source: "Javascript", target: "Coding" },
		{source: "D3.js",target: "Javascript"},
		{source: "Jquery.js",target: "Javascript"},

		{source: "PHP", target:"Coding" },



	];

		var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

	var width=document.getElementById("body").clientWidth;
	var screenHeight=document.getElementById("body").clientHeight;

	var ratio = screenHeight/width;
	var initialGravity=0.01;

	var height =600;
	if (width < height ){
	 	 height=ratio*width;
	 	 if (height > 600){
	 	 	height=600
	 	 }
	 }




	var force = d3.layout.force()
	    .nodes(d3.values(nodes))
	    .links(links)
	    .size([width, height])
	    .linkDistance(45)
	    .charge(-500)
	    .gravity(initialGravity)
	    .on("tick", tick)
	    .start();

	var svg = d3.select("#chart").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	var link = svg.selectAll(".link")
	    .data(force.links())
	  .enter().append("line")
	    .attr("class", "link");

	var node = svg.selectAll(".node")
	    .data(force.nodes())
	  .enter().append("g")
	    .attr("class", function(d,i){

	    	if (d.name=="Math"|d.name=="Web"|d.name=="Coding"){            //////////// Checking for RootNode Manually           
	    		return "node rootNode";
	    	}

	    	return "node";
	    })
	    .on("mouseover", mouseover)
	    .on("mouseout", mouseout)
	    .call(force.drag);

	node.append("circle")
	    .attr("r", function(d,i){
	    	if (d.name=="Math"|d.name=="Web"|d.name=="Coding"){              //////////// Checking for RootNode Manually
	    		return 16;
	    	}

	    	return 8;

	    });

	node.append("text")
	    .attr("x", 12)
	    .attr("dy", ".35em")
	    .text(function(d) { return d.name; });

	function tick() {
	  link
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  node
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}

	function mouseover() {
	  d3.select(this).select("circle").transition()
	      	.duration(450)
	    	.attr("r", function(d,i){
	    		if (d.name=="Math"|d.name=="Web"|d.name=="Coding"){   //////////// Checking for RootNode Manually
	    			return 32;
	    		}
	    		return 16;
			});          
	}

	function mouseout() {
	  d3.select(this).select("circle").transition()
	      .duration(750)
	      .attr("r", function(d,i){
	    		if (d.name=="Math"|d.name=="Web"|d.name=="Coding"){   //////////// Checking for RootNode Manually
	    			return 16;
	    		}
	    		return 8
			});

	}

	resizehandle =function(e){
			var width=document.getElementById("body").clientWidth;
			svg.attr("width", width);
			force.size([width, height]).start();

		}
	window.addEventListener('resize', resizehandle, false);	


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////




	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function touchmove(e) {
		preventDefault(e);
	}

	function wheel(e) {
		// for IE 
		//if( ie ) {
			//preventDefault(e);
		//}
	}
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;  
	}

	// preventDefault when you are animating
	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	}

	function disableScroll() {
	  if (window.addEventListener) // older FF
	      window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}

	
	function enableScroll() {
	    if (window.removeEventListener)
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
	    window.onmousewheel = document.onmousewheel = null; 
	    window.onwheel = null; 
	    window.ontouchmove = null;  
	    document.onkeydown = null;  
	}




	var scrollPage=function(e){

		//Scroll Event has been triggered that is why we are here
		scrollHeight=window.scrollY;

		 if(testElem.offsetTop-scrollHeight < (screenHeight*0.5) & initialGravity==0.01){ // Make 2 checkpoints 
		 					
			force.gravity(0.2).start();
			initialGravity=0.2 // Set New Gravity to higher value so it does not again enter the 
								// loop again.
		 }

		if(scrollHeight > 0){
			//When scrolled you we add the 'modify' class to the 
			//'container' element and disable scroll temporarly of 1.2s	
			classie.add( container, 'modify' );
			classie.add( wrapper, 'push' );
			//Disable scroll temporarly for 1.2s	
			if(!pushed){
				pushed=true;
				//Disable scroll when we enter here
				disableScroll();
				//Enable after 1.2s
				setTimeout(function(){ enableScroll();},2000);
			}
		}

		if(scrollHeight==0 || scrollHeight<0 ){
			classie.remove(container,'modify');
			classie.remove( wrapper, 'push' );
			//Make sure pushed is false because this is a two
			//way circuit.
			pushed=false;
			setTimeout(function(){ 			
				revealed=false; 
			},1000);
		}
	}

	var triggerActivated=function(e){

		//Trigger Activated because the element is visible 
		//therefore pushed is false;

		//add modify class fist to the element
		classie.add(container,'modify');
		classie.add( wrapper, 'push' );
		pushed=true;
	}



	var touchScroll=function(e){

		//Scroll Event has been triggered that is why we are here
		scrollHeight=window.scrollY;

		if(scrollHeight==0 & pushed==false){
			e.preventDefault();
			console.log('touchPrevented');
		}

		 if(testElem.offsetTop-scrollHeight < (screenHeight*0.5) & initialGravity==0.01){ // Make 2 checkpoints 
		 					
			force.gravity(0.2).start();
			initialGravity=0.2 // Set New Gravity to higher value so it does not again enter the 
								// loop again.
		 }

	}

	window.addEventListener('scroll',scrollPage,false);
	trigger.addEventListener('click',triggerActivated,false);
	document.addEventListener('touchmove', touchScroll, false);




})(window);