
var save_expdate = new Array();
var save_expdate_cell = new Array();

var fila_selec = new Array(3);
var col_selec = new Array(6);

//Necesitan guardarse ---------------------------------------
var doc_siz_fila = 0;
var doc_siz_col = 0;
var table_col = 7;
var table_fila = 10;

var save_id_filas = new Array(); 
var save_id_colum = new Array();
var save_celda = new Array();
var save_id = new Array();
//-------------------------------------------------------

var edit_mode = false;

var current_element = null;
var current_key = null;
var gloval_test = "";

//Test lista de productos
var gl_selc = 0;



function butt_actu_test(){

	var new_trasn_datos = new trasn_datos();
	var new_trasn_save = new trasn_save();


	var selec_a = document.getElementById("selc_mone_a");
	var selec_b = document.getElementById("selc_mone_b");

	var inx_a = selec_a.options[selec_a.selectedIndex].value;
	var inx_b = selec_b.options[selec_b.selectedIndex].value;

	var siz = new_trasn_datos.sel_simbd.length;
	for (var j = 0; j < siz; j++) {
		var vlu_a = new Array();
		var vlu_b = new Array();
		var vlu_c = new Array();
		var vlu_d = new Array();
		for (var i = 0; i < siz; i++) {
			vlu_a[i] = 0;
			vlu_b[i] = 0;
			vlu_c[i] = 0;
			vlu_d[i] = 0;
			new_trasn_datos.sel_tasa[j] = vlu_a;
			new_trasn_datos.moneda[j] = vlu_b;
			new_trasn_datos.mon_ustd[j] = vlu_c;
			new_trasn_datos.mon_ustdve[j] = vlu_d;

		}
	}

	//Control de trasn_save()
	new_trasn_datos.index = gl_trasn_datos.index;				//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	new_trasn_datos.fecha = gl_trasn_datos.fecha;				//Fecha actual
	new_trasn_datos.save_id = gl_trasn_datos.save_id;			//ID actual (Va incrementando por dia)
	new_trasn_datos.fechalist = gl_trasn_datos.fechalist; 		//Lista de fechas por dia

	add_temp(new_trasn_datos);

	new_trasn_save.id = gl_trasn_save.id;

	new_trasn_save.index = gl_trasn_save.index;

	new_trasn_save.fecha = gl_trasn_save.fecha;
	new_trasn_save.hora = gl_trasn_save.hora;

	new_trasn_save.simbd_a = new Array();
	new_trasn_save.simbi_a = new Array();

	new_trasn_save.simbd_b = new Array();
	new_trasn_save.simbi_b = new Array();


	new_trasn_save.tasa = gl_trasn_save.tasa;
	new_trasn_save.moneda = gl_trasn_save.moneda;
	new_trasn_save.mon_ustd = gl_trasn_save.mon_ustd;
	new_trasn_save.mon_ustdve = gl_trasn_save.mon_ustdve;

	new_trasn_save.total_ves = gl_trasn_save.total_ves;
	new_trasn_save.usdt_req = gl_trasn_save.usdt_req;
	new_trasn_save.mon_req = gl_trasn_save.mon_req;
	new_trasn_save.ganancia = gl_trasn_save.ganancia;
	new_trasn_save.estado = gl_trasn_save.estado;

	add_transa(new_trasn_save);

}


var start_one = true;
var is_start = true;
function load_save_data(){

	var tasa = gl_trasn_datos.sel_tasa[gl_selmon];
	var simbd = gl_trasn_datos.sel_simbd[gl_selmon];
	var simbi = gl_trasn_datos.sel_simbi[gl_selmon];
	var input = document.getElementById("tasa_rt");
	input.value = tasa;

	//Obtenemos los inputs ESCRITURA ---------------------------------------
	var input_a = document.getElementById("inputrt10");
	var input_b = document.getElementById("inputrt11");
	var input_d = document.getElementById("inputrt13");


	//Obtenemos los inputs SOLO LECTURA --------------------------------------
	var input_c = document.getElementById("inputrt12");
	var input_e = document.getElementById("inputrt14"); 
	var input_f = document.getElementById("inputrt15");
	var input_g = document.getElementById("inputrt16");

	//Recupera los datos guardados
	var moneda = gl_trasn_datos.moneda[gl_selmon]?gl_trasn_datos.moneda[gl_selmon]:0;
	var mon_ustd = gl_trasn_datos.mon_ustd[gl_selmon]?gl_trasn_datos.mon_ustd[gl_selmon]:0;
	var mon_ustdve = gl_trasn_datos.mon_ustdve[gl_selmon]?gl_trasn_datos.mon_ustdve[gl_selmon]:0;

	input_a.value = moneda;
	input_b.value = mon_ustd;
	input_d.value = mon_ustdve;

	//Calculos de datos--------------------------------------
	var total_ves = moneda/tasa; //Total VES
	var usdt_req = total_ves/mon_ustdve; //USDT requeridos
	var mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
	var ganancia = moneda-mon_req //Ganancia

	input_c.value = get_mask("", usdt_req, "(USDT)");
	input_e.value = get_mask("", total_ves, "VES");
	input_f.value = get_mask(simbi, mon_req, "");
	input_g.value = get_mask(simbi, ganancia, "");

	//Obtenemos los inputs LECTURA DE MASK MONEDA
	var mask_a = document.getElementById("text_maskrt10");
	var mask_b = document.getElementById("text_maskrt11");
	var mask_d = document.getElementById("text_maskrt13");
	var mask_g = document.getElementById("text_maskrt16");

	mask_a.value = get_mask(simbi, input_a.value, "("+simbd+")");
	mask_b.value = get_mask("", input_b.value, "("+simbd+"/USDT)");
	mask_d.value = get_mask("", input_d.value, "(VES/USDT)");

}

function add_message(text)
{
	alert(text);
}

function notSupported(){ alert("El navegador no lo soporta."); }

//contador para esperar mientras los valores se cargan
var segundos = 0;
// var contador = setInterval(cambio_valor, 1000);
var cont_sw = true;

function cursor_en_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_selec_style");
}

function cursor_no_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_style");
}

function cursor_en_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_selec");
}

function cursor_no_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_td");
}


function init(){
	check_windows_siz();

	//int_save();

	set_basededatos("basededato");



	//Solo visible la tabla de lista
 	visible_element(1);

	int_trans();

	int_history();

	var boton = document.getElementById("load_start");
}

window.addEventListener("resize", check_windows_siz);


document.addEventListener('click', function() {

	var input = document.activeElement;
	var class_name = input.className;
	if(class_name != "" && class_name != "input_style_visible"){
		var otros = true;
		ocultar_input(otros);
	}

});

window.addEventListener("keypress", function() {

		var key = window.event.key;

		current_key = key;
//add_message("");
		var input = document.activeElement;
		var class_name = input.className;

//console.log("key"+class_name);

		if(class_name == "input_style_visible" || class_name == "mask_style"){
    		return soloNumeros(event);
		}
});
window.addEventListener("keyup", function() {
	var input = document.activeElement;
	var class_name = input.className;

	current_key = null;
	if(class_name == "input_style_visible"){
		input.addEventListener("keyup", function(){ 
		return soltar_tecla(event);
		}, false);
	}
var key = window.event.key;
if(key == "Enter"){
	var id_name = input.id;
			//add_message(id_name);
	if(id_name.includes("input")){
		var class_name = input.className;
		//add_message(class_name);
		if(class_name == "input_style_visible"){
			ocultar_input()
		}
	}
	input.blur();
}
if(key == "Tab"){
	var id_name = input.id;
	//id_name = id_name.replace("text_mask", "input"); //remplaza  palabaras en cadenas de texto
	//add_message(id_name);
	var mask = document.getElementById(id_name.replace("input", "text_mask"));
	if(mask && id_name.includes("input")){
		input.setAttribute("class","input_style_hidden");
		mask.setAttribute("readwrite", "");
		mask.focus();
	}
}
});

//Solo permite introducir números.
function soloNumeros(e){
	var input_test = document.getElementById("inputest");

	var input = document.activeElement;
	var num = input.value;
    var key = window.event ? e.which : e.keyCode;
	//add_message(key);
	if(key == 46){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes(".")){
			return null;
		}	
	}
	else if(key == 45){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes("-")){
			return null;
		}
	}

    if (key < 48 || key > 57) {
        //Usando la definición del DOM level 2, "return" NO funciona.
        e.preventDefault();
    }

}
function soltar_tecla(e){
	var key = window.event.key;
	//add_message(key);
	if(key == "."){
		var input_test = document.getElementById("inputest");

		var input = document.activeElement;
		var num = input.value;
	 	if (!num.includes(".")){
			input.value = remplace_test(num);
			//input.value = parseFloat(input.value).toFixed(2);
			return null;
		}
	}
}
function remplace_test(num) {
	//num = num.replace(/(\.)(\d){2,}/g, 128);

	console.log("vlu "+num);
	if(num == "")	
		num = num.replace(/($)/g, "1.00");
	else{
		num = num.replace(/($)/, ".");
	}
	return num;
}





