gl_mobil = false;

function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	//Muestra y oculto los menus
	var menu_list = document.getElementById("allmenu");
	var menu_butt = document.getElementById("allbutons");

	if(ancho < 1024){
		menu_list.setAttribute("class","");
		menu_butt.setAttribute("class","element_style_hidden");	
		if(!gl_mobil) {
			//console.log(+ancho+"  " +font_siz);
			objref.style.setProperty("--alig-text", 'left');
			objref.style.setProperty("--cel-siz", '35%');
			gl_mobil = true;
			int_trans();
		}
	}
	else if(ancho >= 1024) {
		menu_butt.setAttribute("class","");
		menu_list.setAttribute("class","element_style_hidden");
		//console.log(+ancho+"  " +font_siz);
		if(gl_mobil) {
			objref.style.setProperty("--alig-text", 'center');
			objref.style.setProperty("--cel-siz", 'auto');
			gl_mobil = false;
			int_trans();
		}
	}
}
