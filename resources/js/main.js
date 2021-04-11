
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

var gl_result = new result_list_a();

//Test lista de productos
var gl_list = new Array();
var gl_selc = 0;

var gl_listname = new allnames_list();
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


function click_test(){

	//var result = new result_list();
	//agregarobjeto(result);

	//get_celda_value(table_fila,table_col);
	//gloval_test += "input "+document.getElementById("input0").value;

	//create_table(table_fila,table_col);
	
      //for (var j = 0; j < save_expdate.length; j++) {

		//gloval_test += " ["+save_expdate[0][j]+"] ";
		//gloval_test += " ["+save_expdate[1][j]+"] ";
		//gloval_test += " ["+save_expdate[2][j]+"] ";
		//gloval_test += " ["+save_expdate[3][j]+"] ";
     //}
		//setCaretPosition("inputest", 5);
	//add_message(gloval_test);
	//gloval_test ="";

	//get_celda_value(table_fila,table_col);
var gl_trasn_save = new all_ventas();
		agregarventas(gl_trasn_save);

}

//contador para esperar mientras los valores se cargan
var segundos = 0;
// var contador = setInterval(cambio_valor, 1000);
var cont_sw = true;

/*function cambio_valor(){
	if(segundos>=3){ 
		clearInterval(contador);
		//alert("Total: " + segundos + " segundos");
		segundos=0;
	}
	segundos++;

	//update_celdas_generales(0,2);
	//update_celdas_generales(0,4);

	for (var j = 2; j < table_fila; j++) {
		var multiplo = (j*table_col);
		save_celda[j] = new Array();
		//update_celda_precio_dolar(j,multiplo)
		//update_celda_precio_bolivar(j,multiplo);		
	}
}*/

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

	gl_list[gl_selc] = new result_list_a();

	//test arrays bidimencionales
	/*	
	var save = [12,112,588,5558,5998,565,65];
	for(var j = 0; j<5;j++){
		save_expdate[j] = new Array(10);
		for(var i = 0; i<5;i++){

				save_expdate[j][i] = save[i];
			}
	}
	*/

	//save_expdate[0] = Array();
	//save_expdate[0][0] = "ssdd";
	//save_expdate[1] = Array();
	//save_expdate[1][0] = "yoma";
	//save_id[0].push();
	//save_id[0].unshift(100);
	//save_celda[1][5]=12;
	//save_celda[4][0] = 44;
	//save_celda[0][1] = 44;
	//save_celda[0][2] = 44;
	//var tamaño = save_id[0].length;  //tamaño de un array
	//add_message(tamaño);
	//add_message(save_expdate[2][0]+"--"+save_expdate[2][1]);


	//get_celda_value(table_fila,table_col);

	//Para cambiar entre listas
	//select_list_x();
	set_basededatos("basededato");


	//Solo visible la tabla de lista
 	visible_element(1);

	int_trans();
	int_history();


	//crea la lista de productos
	//crear_lista_productos();


	var boton = document.getElementById("load_start");
	//boton.addEventListener("click", agregarobjeto);
	//boton.addEventListener("focus", cambio_valor);

	//Buscador para la lista de productos
	//var input_buscar = document.getElementById("buscar");
	//input_buscar.addEventListener("input", function(){buscar_lista(input_buscar.value);});

	//Buscador para el registro de ventas
	/*var input_buscar_rv = document.getElementById("buscar_rv");
	input_buscar_rv.addEventListener("input", function(){buscar_lista_rv("buscar_rv");});*/
}
//window.addEventListener("load", click_test);
//window.addEventListener("keypress", is_enter_press);

window.addEventListener("keypress", function() {

		var key = window.event.key;

		current_key = key;
//add_message("");
		var input = document.activeElement;
		var class_name = input.className;

//console.log("key"+class_name);

		if(class_name == "input_style_visible"){
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
	//add_message(num.includes("."));
	 	if (!num.includes(".")){
			//input_test.value = remplace_test(num);
			//input.value = parseFloat(input.value).toFixed(2);
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
	 num = num.replace(/($)/g, ".00");
	 //num.replace(/\.$/, "128");
	// num.replace(/[\.]$/, 128);
	//add_message(num);
	return num;
}





