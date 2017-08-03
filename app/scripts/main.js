(function(){
	var header = document.querySelector('header');
	window.onscroll = function(){
		var scrollHeight = document.body.scrollTop;
		opacity = scrollHeight/350*1.3;
		document.querySelector('header').style.background = "rgba(201,21,35,"+opacity+")";
	}
	var times = 3 * 60 *60;
	setInterval(function(){
		times --;
		var h = Math.floor(times/60/60);
		var m = Math.floor(times/60%60);
		var s = times%60;
		var secondKill = document.querySelectorAll('.bg-black');
		secondKill[0].innerText = h>10?Math.floor(h/10):0;
		secondKill[1].innerText = h%10;
		secondKill[2].innerText = m>10?Math.floor(m/10):0;
		secondKill[3].innerText = m%10;
		secondKill[4].innerText = s>10?Math.floor(s/10):0;
		secondKill[5].innerText = s%10;
	},1000);
})();
