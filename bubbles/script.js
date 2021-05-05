function createBubble() {
	const section = document.querySelector("Section");			//draws from the HTML
	const createElement =	document.createElement("span");		//sections
	var size = Math.random() * 60;											//makes rando width 4 bubbles

	createElement.style.animation =
	"animation 6s linear infinite";
	createElement.style.width = 180 + size + "px";			//specifications for outer
	createElement.style.height = 180 + size + "px";			//bubbles ring
	createElement.style.left =													//where the bubbles fade in
	Math.random() * innerWidth + "px";
	section.appendChild(createElement);

	setTimeout(() => {
		createElement.remove();								//how far up bubbles stay on screen
	}, 4000);																//in pixels
}

setInterval(createBubble, 150);					//how many bubbles on screen
																				//high # = fewer bubbles

//RIPPLE EFFECT
[].map.call(document.querySelectorAll('[anim="ripple"]'), el=> {
    el.addEventListener('click',e => {
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
    })
})
