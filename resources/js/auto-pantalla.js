function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	if(ancho <= 480){
		console.log(+ancho+"  " +font_siz);
		objref.style.setProperty("--siz-text", '30%');
	}
	else if(ancho <= 768){
		console.log(+ancho+"  " +font_siz);
		objref.style.setProperty("--siz-text", '60%');
	}
	else {
		console.log(+ancho+"  " +font_siz);
		objref.style.setProperty("--siz-text", '100%');
	}
}
