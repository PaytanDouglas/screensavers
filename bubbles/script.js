function createBubble() {
	const section = document.querySelector("Section");
	const createElement =	document.createElement("span");
	var size = Math.random() * 60;

	createElement.style.animation =
	"animation 6s linear infinite";
	createElement.style.width = 180 + size + "px";
	createElement.style.height = 180 + size + "px";
	createElement.style.left =
	Math.random() * innerWidth + "px";
	section.appendChild(createElement);

	setTimeout(() => {
		createElement.remove();
	}, 4000);
}

setInterval(createBubble, 100);


//RIPPLE EFFECT
[].map.call(document.querySelectorAll('[anim="ripple"]'), el=> {
    el.addEventListener('click',e => {
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
    })
})
