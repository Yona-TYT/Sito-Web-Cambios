
function menu_main(){

	var select = document.getElementById("selectlistaname");
	var opt = select.options[select.selectedIndex];
	var input2 = document.getElementById("inputlistaname");
	//input2.value = opt.innerHTML;

	//clonar_filtros("selectlistaname");

	if(edit_mode){
		input2.setAttribute("class","mask_style");
		select.setAttribute("class","element_style_hidden");
	}
	reset_inputs_rv();

	document.getElementById("rv_totaldol").value = 0.00+" $";
	document.getElementById("rv_totalbsf").value = 0.00+" BsF";

	var select1 = document.getElementById("selcregvent");
	//select1.setAttribute("onchange","test_select_base('selcregvent');");

}

function clonar_filtros(id) {
	var select = document.getElementById(id);
	var obj_inn = select.innerHTML;
	var current_opt = select.options[select.selectedIndex];


	var selec1 = document.getElementById("listbasedato");
	var selec2 = document.getElementById("selcregvent");
	var selec3 = document.getElementById("selectlistaname");

	selec1.innerHTML = obj_inn;

	selec1.options[select.selectedIndex].selected=true;

	if(id != "selectlistaname"){
		selec3.innerHTML = obj_inn;
		selec3.options[select.selectedIndex].selected=true;
	}
	if(id != "selcregvent"){
		selec2.innerHTML = obj_inn;
		selec2.options[select.selectedIndex].selected=true;
	}
}

function mostrar_lista_menu(){
	var lista = document.getElementById("menulist");
	var class_name = lista.className;
	if(class_name == "element_style_hidden")
		lista.setAttribute("class","");
	else
		lista.setAttribute("class","element_style_hidden");
}

function visible_element(opt) {
	var lista = document.getElementById("menulist");
	lista.setAttribute("class","element_style_hidden");

	//Cambia el titulo del al menu seleccionado
	var title = document.getElementById("div_title");
	var menu_opt = document.getElementById("menuopt"+opt);
	title.innerHTML = menu_opt.innerHTML;

	for(var j = 1; j<4;j++){
		var bot_temp = document.getElementById("butopt"+j);
		bot_temp.setAttribute("class","mask_style");
		
	}

	var bott = document.getElementById("butopt"+opt);
	if(bott)
		bott.setAttribute("class","butt_selec_style");


	var table_regvent = document.getElementById("seccion1");
	var table_regpro = document.getElementById("seccion2");
	var historial = document.getElementById("seccion3");
	var table = document.getElementById("tableprev0");

	//Registro de Transacciones
	if(opt==1) {
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","");
	}
	//Conversion moneda
	if(opt==2) {
		table_regvent.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","");
	}
	//Historial de Transacciones
	if(opt==3) {
		table_regvent.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","");
	}
}

function select_list_x(){

	set_basededatos("basededat");

	var select = document.getElementById("selectlistaname");
	//select.setAttribute("onchange","test_select_base('selectlistaname');");

	var input = document.getElementById("inputlistaname");
	
}
var gl_select = null;
function select_base_list(id){

	var selec = document.getElementById(id);
	var opt = selec.options[selec.selectedIndex];

	if(id == "selectlistaname"){
		var input = document.getElementById("inputlistaname");
		input.value = opt.innerHTML;
	}

	gl_selc = parseInt(opt.value);
	preloder_selec_list("selectlistaname");

	var sect_lista = document.getElementById("listageneral");
	var data_lista = document.getElementById("listproducts");
	sect_lista.innerHTML = "";
	data_lista.innerHTML = "";

	reset_inputs_rv();

	start_one = true;
	mostrar_lista(parseInt(opt.value));
} 

function chlistnameinput_a(){
	var select = document.getElementById("selectlistaname");
	var input = document.getElementById("inputlistaname");
	
	var opt = select.options[select.selectedIndex];
	input.value = opt.innerHTML;	
	//console.log([select.selectedIndex]);
	//clonar_filtros("selectlistaname")
}
function chlistnameinput_b(){
	var select = document.getElementById("selectlistaname");
	var input = document.getElementById("inputlistaname");
	
	var opt = select.options[select.selectedIndex];
	opt.innerHTML = input.value;
	var index = parseInt(opt.value);
	gl_listname.list_nam[index] = input.value;
	agregarnombres(gl_listname);


	var sel_a = document.getElementById("selcregvent");
	var sel_b = document.getElementById("selcregprod");
	var sel_c = document.getElementById("listbasedato");
	sel_a.innerHTML = select.innerHTML;
	sel_b.innerHTML = select.innerHTML;
	sel_c.innerHTML = select.innerHTML;
	//console.log([select.selectedIndex]);
	//preloder_selec_list("selectlistaname");
	//clonar_filtros("selectlistaname")
}

function preloder_selec_list(id) {

	var selec = document.getElementById(id);
	var sel_a = document.getElementById("selcregvent");
	var sel_b = document.getElementById("selcregprod");
	var sel_c = document.getElementById("listbasedato");
	var list_id = gl_listname.list_id;
	var list_nam = gl_listname.list_nam;
	var selc_tx = "";
	for (var j = 0;  j < list_id.length; j++) {
		var fechalist = gl_trasn_save.fechalist[j];
		selc_tx += "<option id='selelist"+j+"' value='"+list_id[j]+"'>"+list_nam[j]+"</option>";
	}

	selec.innerHTML = selc_tx;
	sel_a.innerHTML = selc_tx;
	sel_b.innerHTML = selc_tx;
	sel_c.innerHTML = selc_tx;

	selec.options[gl_selc].selected=true;
	sel_a.options[gl_selc].selected=true;
	sel_b.options[gl_selc].selected=true;
	sel_c.options[gl_selc].selected=true;

	//selec.setAttribute("onchange","select_base_list('"+id+"');");

	//selec.setAttribute("onclick","selec_fechas('selchisfec');");
}

function el_selec(){
	var elm = document.activeElement;
	elm.select();
}

function mostrar_input() {
	var mask = document.activeElement;
	mask.setAttribute("placeholder", "");
	var id_name = mask.id;
	var id_input = id_name.replace("text_mask", "input"); //remplaza  palabaras en cadenas de texto

	var input = document.getElementById(id_input);
	//var fila = document.getElementById("fila"+id_a);
	//var celda = document.getElementById("celd"+id_b);
	//var input = document.getElementById("input"+id_c);
	//var mask = document.getElementById("text_mask"+id_d);

	if(input && id_name.includes("text_mask")){
		input.setAttribute("class","input_style_visible");
		mask.setAttribute("disabled", "");
		input.focus();
		if(current_element == input)
			current_element = null;

		else
			current_element = input;
	}
	return null
}

function ocultar_input()
{
	var current_input = document.activeElement;
	var current_id_name = current_input.id;
	var input_old = current_element;

	el_selec();
	if(input_old){
		var id_name_old = input_old.id;
		var id_mask_old = id_name_old.replace("input", "text_mask"); //remplaza  palabaras en cadenas de texto
		var mask_old = document.getElementById(id_mask_old);
		if(mask_old && id_name_old.includes("input")){
			input_old.setAttribute("class","input_style_hidden");
			mask_old.disabled=false;
			//add_message(""+id_name_old+"  "+current_id_name+"")
			if(id_name_old != current_id_name)
				current_element = null;
		}
	}
}
function tasa_selector(){
	var selec_a = document.getElementById("selc_mone_a");
	var selec_b = document.getElementById("selc_mone_b");

	var inx_a = selec_a.options[selec_a.selectedIndex].value;
	var inx_b = selec_b.options[selec_b.selectedIndex].value;

	gl_trasn_datos.sel_tasa[inx_a][inx_b];
}


