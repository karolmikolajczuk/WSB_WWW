function setlay(x) {
	main = document.getElementsByTagName("body")[0];
    main.classList.value = "lay"+x;
}

function show(x) {
	element=document.getElementById(x);
	element.style.display="block";
}

function hide(x) {
	element=document.getElementById(x);
	element.style.display="none";
}

function showRmenu() {
	content=document.getElementById("content");
	content.classList.add("pokaRMenu")
}

function hideRmenu() {
	content=document.getElementById("content");
	content.classList.remove("pokaRMenu")
	
}

function scrollUp() {
	document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}

function load(id) {
	sekcje = document.getElementById('content').getElementsByTagName('section');
	for(var i=0; i < sekcje.length; i++) {
		if (sekcje[i].id == id)
			sekcje[i].style.display = "initial";
		else
			sekcje[i].style.display = "none";
	}
}