function int_history() {
	preloder_filtro_fec();
	preloder_selec_mon("selc_monert");
}

function preloder_filtro_fec() {
	var selec = document.getElementById("selchisfec");
	var indexfec = gl_trasn_save.indexfec;
	var selc_tx = "";
	for (var j = indexfec;  j >= 0; j--) {
		var fechalist = gl_trasn_save.fechalist[j];
		selc_tx += "<option id='fech"+j+"' value='"+j+"'>"+fechalist+"</option>";
	}
	selec.innerHTML = selc_tx;
	selec.setAttribute("onchange","selec_fechas('selchisfec');");
	//selec.setAttribute("onclick","selec_fechas('selchisfec');");
}

var gl_total_day = 0;
function selec_fechas(id) {
	var secc_his = document.getElementById("hist_trans");
	secc_his.innerHTML ="";
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	//console.log(current_opt.value);
	//var count = gl_trasn_save.countfec[current_opt.value];
	gl_total_day = 0;
	if(current_opt){
		var start = gl_trasn_save.indexstart[current_opt.value];
		var end = gl_trasn_save.indexend[current_opt.value];

		for (var j = start; start != null && j < (end+1); j++) {
			//var index = gl_trasn_save.savindex[j];
			gl_total_day += crear_historial(j);
		}
	}

	var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];
	var result = get_mask("",gl_total_day,"("+selc_simb+")");
	var in_hist = document.getElementById("total_hist");
	in_hist.value = result;
	var in_rtran = document.getElementById("total_rt");
	in_rtran.value = get_mask("",get_dia_ganancia(),"("+selc_simb+")");
	
}

function crear_historial(index) {

	var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];

	var hora = gl_trasn_save.hora[index];
	var fecha = gl_trasn_save.fecha[index];

	var simbd = gl_trasn_save.simbd[index];
	var simbi = gl_trasn_save.simbi[index];

	var tasa = gl_trasn_save.tasa[index];
	var moneda = gl_trasn_save.moneda[index];
	var mon_ustd = gl_trasn_save.mon_ustd[index];
	var mon_ustdve = gl_trasn_save.mon_ustdve[index];

	var total_ves = gl_trasn_save.total_ves[index];
	var usdt_req = gl_trasn_save.usdt_req[index];
	var mon_req = gl_trasn_save.mon_req[index];
	var ganancia = gl_trasn_save.ganancia[index];

	var estado = gl_trasn_save.estado[index];
		
	if(selc_simb==simbd){
		var tx_tasa = "<li>Tasa: "+tasa+"</li>";
		var tx_a = "<li>"+simbd+" Recibidos: "+get_mask("",moneda,"")+"</li>";
		var tx_b = "<li>"+simbd+"/USTD : "+get_mask("",mon_ustd,"")+"</li>";
		var tx_c = "<li>USTD Requeridos : "+get_mask("",usdt_req,"")+"</li>";
		var tx_d = "<li>VES/USTD : "+get_mask("",mon_ustdve,"")+"</li>";
		var tx_e = "<li>Total VES : "+get_mask("",total_ves,"")+"</li>";
		var tx_f = "<li>"+simbd+" Requeridos: "+get_mask("",mon_req,"")+"</li>";
		var tx_g = "<li>Ganancia : "+get_mask("",ganancia,"")+"</li>";

		var titulo =  "Transaccion de: ("+get_mask(simbi,moneda,"("+simbd+")")+" / "+get_mask("", total_ves, "VES")+") Fecha:("+fecha+") Hora:("+hora+") ";

		var buttm = "<button type='button' onclick='button_detalles("+index+");'>Detalles</button>";

		//var	buttq = "<button id='bott_reint"+index+"' type='button' onclick='button_quitar_hist("+index+");'>Reintegrar</button>";
		var	buttq = "";
		var inside = "";

		if(!estado)estado="Realizada";
		if(estado=="Realizada"){
			buttq = "<button id='bott_reint"+index+"' type='button' onclick='button_quitar_hist("+index+");'>Quitar</button>";
			inside = "<div class='element_style_hidden' id='divhis"+index+"'><ul>"+ tx_tasa + tx_a + tx_b + tx_c + tx_d + tx_e + tx_f + tx_g + "</ul>"+ buttq  +"</div>";
		}
		else if(estado=="Eliminada"){
			buttm = "<button id='bott_pend"+index+"' type='button' onclick='button_desh_hist("+index+");'>Deshacer</button>";
			titulo =  "(Transaccion Eliminada) Fecha:("+fecha+") Hora:("+hora+")";
			ganancia = 0;
		}

		var secc_his = document.getElementById("hist_trans");
		secc_his.innerHTML +=  "<div class='div_list_style'>" + buttm  + titulo + inside + "</div>";

		return ganancia;
	}
	
	return 0;
}
function crear_lista_cl() {
	//var sect_lista = document.getElementById("list_cl");
	var data_lista = document.getElementById("list_datacl");
	//sect_lista.innerHTML = "";
	data_lista.innerHTML = "";
	var lista_tx = "";
	var data_tx = "";
	for (var j = 0; j < gl_trasn_save.nombrecl.length; j++) {
		//lista_tx += add_text_cl(j,1);
		data_tx += add_text_cl(j,2);
	}
	// agregamos la hilera a la seccion de lista
	//sect_lista.innerHTML = lista_tx;
	data_lista.innerHTML = data_tx;
}

function add_text_cl(index,opt){
	var nombre = gl_trasn_save.nombrecl[index]?gl_trasn_save.nombrecl[index]:"";

	if(opt==1){
		return "<div> </div>";
	}
	if(opt==2){
		return "<option value='"+nombre+"'>";
	}
}
function button_detalles(index) {
	var secc_div = document.getElementById("divhis"+index);
	var class_name = secc_div.className;
	if(class_name == "element_style_hidden")
		secc_div.setAttribute("class", "");
	else
		secc_div.setAttribute("class", "element_style_hidden");
}

function button_quitar_hist(index) {
	gl_trasn_save.estado[index] = "Eliminada";
	add_transa(gl_trasn_save);
selec_fechas("selchisfec");
}
function button_desh_hist(index) {
	gl_trasn_save.estado[index] = "Realizada";
	add_transa(gl_trasn_save);
selec_fechas("selchisfec");
}
function preloder_selec_mon(id) {

	var selec = document.getElementById(id);
	var sel_a = document.getElementById("selc_monehi");

	var selc_tx = selec.innerHTML;

	sel_a.innerHTML = selc_tx;


	selec.options[gl_selmon].selected=true;
	sel_a.options[gl_selmon].selected=true;

}
function preloder_selec_mohi() {

	var selec = document.getElementById("selc_monehi");
	var sel_a = document.getElementById("selc_monert");
	var selc_tx = selec.innerHTML;
	sel_a.innerHTML = selc_tx;

	selec_change_mo("selc_monehi");


	selec.options[gl_selmon].selected=true;
	sel_a.options[gl_selmon].selected=true;

	selec_fechas('selchisfec');
}

function eliminar_todo(opt){
	var butt = document.getElementById("buthist");
	var label = document.getElementById("histlabel");
	var check = document.getElementById("histcheck");
	if(opt==0){
		label.setAttribute("class", "cajas_style");
		check.checked = false;
		butt.setAttribute("onclick", "eliminar_todo(1)");
		alert("Estas a punto de borrar todo, marque la casilla para confirmar y vuelva a pulsar.");
	}
	if(opt==1){
		label.setAttribute("class", "input_style_hidden");
		butt.setAttribute("onclick", "eliminar_todo(0)");
		if(check.checked){
			check.checked = false;
			clear_history();
			alert("Se ha borrado Todo el Historial.");
		}
	}
}
function clear_history(){
	var gl_trasn_datos = new trasn_datos();
	add_temp(gl_trasn_datos);

	gl_trasn_save = new trasn_save();
	add_transa(gl_trasn_save);

	preloder_filtro_fec();

	preloder_selec_mon("selc_monert");
	selec_fechas("selchisfec");
}

