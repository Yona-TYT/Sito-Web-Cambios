gl_mobil = false;

function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	if(!gl_mobil){
		if(ancho < 1024){
			//console.log(+ancho+"  " +font_siz);
			objref.style.setProperty("--alig-text", 'left');
			gl_mobil = true;
			int_trans();
		}
	}
	else if(ancho >= 1024) {
		//console.log(+ancho+"  " +font_siz);
		objref.style.setProperty("--alig-text", 'center');
		gl_mobil = false;
		int_trans();
	}
}
