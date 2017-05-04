
Array.from(document.getElementsByTagName("IMG")).forEach(function(img) {
   	if  (img.hasAttribute("alt") && img.getAttribute("alt").match(/(?:Donald )?.*?Trump/i)) {
		prepare_for_sausage_party(img);

	}
});

function sausage_party_over(event) {

	var canvas = event.srcElement;
	window.clearInterval(canvas.getAttribute("interval"));

	var img = document.createElement("IMG");
	img.src = canvas.getAttribute("original_src");
	prepare_for_sausage_party(img);
	canvas.parentNode.replaceChild(img,canvas);

}

function lets_get_this_sausage_party_started(event) {

	var sp = new SausageParty(event.srcElement);
	sp.wangulate();
	
}

function prepare_for_sausage_party(img) {

		img.setAttribute("title","8==D");
        img.classList.add("add_penises");
        img.addEventListener("mouseover",lets_get_this_sausage_party_started);

}

function SausageParty(element) {

	this.canvas = document.createElement("CANVAS");
	this.canvas.id="canvas_"+Math.random(999999999)+666;

	this.canvas.width = element.width;
	this.canvas.height = element.height;

	this.canvas.classList.add("add_penises");
	this.canvas.setAttribute("original_src",element.src);

	this.canvas.addEventListener("mouseout",sausage_party_over);

	this.context = this.canvas.getContext("2d");
	this.bg = new Image();
	this.bg.src = element.src;

	this.sprite = new Image();
	this.sprite.src=chrome.extension.getURL("images/sprite.png");
	this.frames=[];
	this.frame = 0;

	this.ellipseWidth = (element.width-(this.sprite.width))/2-8;
	this.ellipseHeight = (element.height-(this.sprite.height))/2-8;
	this.centerX = Math.floor(this.canvas.width/2)+16;
	this.centerY = Math.floor(this.canvas.height/2)+16;

	this.context.drawImage(this.bg,0,0);
	element.parentNode.replaceChild(this.canvas,element);

	this.offset = 0;
	this.intervalId;

	this.renderFrame = function() {
		this.offset+=3;
		this.offset %= 360;

		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

		this.context.drawImage(this.bg,0,0);
		for (var angle=0;angle<360;angle+=12) {

			var rads = (angle+this.offset)/180*Math.PI;
			var prads = ((angle+this.offset)+90)/180*Math.PI;

			var x = this.centerX+((this.ellipseWidth)*Math.cos(rads))-16;
			var y = this.centerY+((this.ellipseHeight)*Math.sin(rads ))-16;
			
			this.context.translate(x,y);
			this.context.rotate(prads);
			this.context.drawImage(	
				this.sprite,
				-16,
				-16,
			);
			
			this.context.rotate(-prads);
			this.context.translate(-x,-y);
		}
	};
			
	this.wangulate = function() {
		// FUCK IT. WE'LL DO IT LIVE
		var that = this;
    	this.intervalId = window.setInterval(function() { that.renderFrame(); },1000/20);
		this.canvas.setAttribute("interval",this.intervalId);
	};

}


