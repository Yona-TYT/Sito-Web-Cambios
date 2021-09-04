var gl_selmon = 0;

function int_trans(){
	//Selecciona el tipo de moneda
	var selec = document.getElementById("selc_monert");
	selec.addEventListener("change", function(){
		selec_change_mo("selc_monert");
		selec_fechas('selchisfec');

	});

	var input = document.getElementById("tasa_rt");
	input.addEventListener("input", function(){
		var input = document.getElementById("tasa_rt");
		var valor = parseFloat(input.value)?parseFloat(input.value):0;
		gl_trasn_datos.sel_tasa[gl_selmon] = valor;
		input.setAttribute("step", ""+(1*valor)+"");
		//console.log(+input.value+"  " );
		get_trans_datos();

	});

	create_table_rt();
}

function selec_change_mo(id){
	var selec = document.getElementById(id);
	var index = selec.options[selec.selectedIndex].value;
	index = parseInt(index)?parseInt(index):0;
	gl_selmon = index;
	preloder_selec_mon("selc_monert");

	var val = (gl_trasn_datos.sel_tasa[index]==null?0:gl_trasn_datos.sel_tasa[index]);
	var input = document.getElementById("tasa_rt");
	input.setAttribute("step", ""+(1*val)+"");
	input.value = val;

	var cv_input = document.getElementById("cv_tasa");
	cv_input.setAttribute("step", ""+(1*val)+"");
	cv_input.value = val;

	get_trans_datos();
}


var gl_trasn_datos = new trasn_datos();
var gl_trasn_save = new trasn_save();

function get_trans_datos(){
	var selec = document.getElementById("selc_monert");
	var inx_val = selec.options[selec.selectedIndex].value;
	var	sel_nr = parseInt(inx_val)?parseInt(inx_val):0;

	//Iniciar areglos
	var tasa = (gl_trasn_datos.sel_tasa[sel_nr]==null?0:gl_trasn_datos.sel_tasa[sel_nr]);
	var simbd = gl_trasn_datos.sel_simbd[sel_nr];
	var simbi = gl_trasn_datos.sel_simbi[sel_nr];

	var moneda = (gl_trasn_datos.moneda[sel_nr]==null?0:gl_trasn_datos.moneda[sel_nr]);
	var mon_ustd = (gl_trasn_datos.mon_ustd[sel_nr]==null?0:gl_trasn_datos.mon_ustd[sel_nr]);
	var mon_ustdve = (gl_trasn_datos.mon_ustdve[sel_nr]==null?0:gl_trasn_datos.mon_ustdve[sel_nr]);

	//Revisa el cuadro de tasa
	var tas_input = document.getElementById("tasa_rt");
	if(tasa==0){
		tasa = parseFloat(tas_input.value)?parseFloat(tas_input.value):0;
		gl_trasn_datos.sel_tasa[sel_nr] = tasa;
	}	


	//Obtenemos los inputs ESCRITURA ---------------------------------------
	var input_a = document.getElementById("inputrt10");
	var input_b = document.getElementById("inputrt11");
	var input_c = document.getElementById("inputrt12");

	var val_a = parseFloat(input_a.value)?parseFloat(input_a.value):0;
	var val_b = parseFloat(input_b.value)?parseFloat(input_b.value):0;
	var val_c = parseFloat(input_c.value)?parseFloat(input_c.value):0;

	//Guarda los valores
	gl_trasn_datos.moneda[sel_nr] = val_a;
	gl_trasn_datos.mon_ustd[sel_nr] = val_b;
	gl_trasn_datos.mon_ustdve[sel_nr] = val_c;

	add_temp(gl_trasn_datos);
	
	//------------------------------------------------------------------------
	//Calculos de datos--------------------------------------
	var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];
	var total_ves = 0; //Total VES
	if(selc_simb == "ARS") total_ves = val_a*tasa;
	if(selc_simb == "COP") total_ves = val_a/tasa;

	var usdt_req = total_ves/val_c; //USDT requeridos
	var mon_req = val_b*usdt_req //Requeridos (Moneda)
	var ganancia = val_a-mon_req //Ganancia

	//Obtenemos los inputs SOLO LECTURA --------------------------------------
	var input_d = document.getElementById("inputrt13");
	var input_e = document.getElementById("inputrt14"); 
	var input_f = document.getElementById("inputrt15");
	var input_g = document.getElementById("inputrt16");

	input_d.value = get_mask("", usdt_req, "(USDT)");
	input_e.value = get_mask("", total_ves, "VES");
	input_f.value = get_mask(simbi, mon_req, "");
	input_g.value = get_mask(simbi, ganancia, "");

	//------------------------------------------------------------------------
	//Obtenemos los inputs LECTURA DE MASK MONEDA
	var mask_a = document.getElementById("text_maskrt10");
	var mask_b = document.getElementById("text_maskrt11");
	var mask_c = document.getElementById("text_maskrt12");


	mask_a.value = get_mask(simbi, input_a.value, "("+simbd+")");
	mask_b.value = get_mask("", input_b.value, "("+simbd+"/USDT)");
	mask_c.value = get_mask("", input_c.value, "(VES/USDT)");

}

function resultado_conver(){
	var selec = document.getElementById("sel_conver");
	var tasa = document.getElementById("cv_tasa");
	var input_a = document.getElementById("cv_input_a");
	var input_b = document.getElementById("cv_input_b");

	var num_a =  parseFloat(input_a.value)?parseFloat(input_a.value):0;
	var num_b =  parseFloat(input_b.value)?parseFloat(input_b.value):0;
	var num_tasa =  parseFloat(tasa.value)?parseFloat(tasa.value):0;


	if(selec.value == "0"){
		input_b.value = get_mask("",num_a/num_tasa,"Bsf");
	}
	if(selec.value == "1"){
		input_b.value = get_mask("$",num_a*num_tasa,"");
	}
}

function guardar_trans_datos(){
	//Iniciar areglos
	var tasa = (gl_trasn_datos.sel_tasa[gl_selmon]==null?0:gl_trasn_datos.sel_tasa[gl_selmon]);
	var simbd = gl_trasn_datos.sel_simbd[gl_selmon];
	var simbi = gl_trasn_datos.sel_simbi[gl_selmon];

	var moneda = (gl_trasn_datos.moneda[gl_selmon]==null?0:gl_trasn_datos.moneda[gl_selmon]);
	var mon_ustd = (gl_trasn_datos.mon_ustd[gl_selmon]==null?0:gl_trasn_datos.mon_ustd[gl_selmon]);
	var mon_ustdve = (gl_trasn_datos.mon_ustdve[gl_selmon]==null?0:gl_trasn_datos.mon_ustdve[gl_selmon]);

	if(moneda !=0 && mon_ustd !=0 && mon_ustdve !=0 && tasa !=0){
		//Calculos de datos--------------------------------------
		var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];
		var total_ves = 0; //Total VES
		if(selc_simb == "ARS") total_ves = moneda*tasa;
		if(selc_simb == "COP") total_ves = moneda/tasa;
		
		var usdt_req = total_ves/mon_ustdve; //USDT requeridos
		var mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
		var ganancia = moneda-mon_req //Ganancia

		//Reinici los valores------------------------------------
		gl_trasn_datos.moneda[gl_selmon] = 0;
		gl_trasn_datos.mon_ustd[gl_selmon] = 0;
		gl_trasn_datos.mon_ustdve[gl_selmon] = 0;
		reset_all_inputs();

		var hoy = new Date();
		var hora =  hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
		var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();

		var fecha = gl_trasn_datos.fecha;

		if(fecha != curr_fecha) {
			if(!fecha) {
				gl_trasn_datos.fecha = curr_fecha;
				gl_trasn_datos.fechalist[gl_trasn_datos.index] = curr_fecha;
			}
			else {
				gl_trasn_datos.index = 0;
				gl_trasn_datos.save_id++;
				gl_trasn_datos.fecha = curr_fecha;
				gl_trasn_datos.fechalist[gl_trasn_datos.index] = curr_fecha;
			}
		}

		var index = gl_trasn_datos.index;

		//Guarda los datos de transferencia----------------------------------------
		gl_trasn_save.simbd[index] = simbd;
		gl_trasn_save.simbi[index] = simbi;
		gl_trasn_save.tasa[index] = tasa;
		gl_trasn_save.moneda[index] = moneda;
		gl_trasn_save.mon_ustd[index] = mon_ustd;
		gl_trasn_save.mon_ustdve[index] = mon_ustdve;
		gl_trasn_save.total_ves[index] = total_ves;
		gl_trasn_save.usdt_req[index] = usdt_req;
		gl_trasn_save.mon_req[index] = mon_req;
		gl_trasn_save.ganancia[index] = ganancia;
		gl_trasn_save.estado[index] = "Realizada";
		gl_trasn_save.hora[index] = hora;
		gl_trasn_save.fecha[index] = curr_fecha;
		gl_trasn_save.id = gl_trasn_datos.save_id;
		//-----------------------------------------------------------

		gl_trasn_datos.index++;		// Cambia al la siguiente transferencia
		gl_trasn_save.index = gl_trasn_datos.index;

		add_temp(gl_trasn_datos);
		add_transa(gl_trasn_save);
		mostrar_datos(gl_trasn_datos.save_id);

	}
	else alert("¡No se permiten valores en blanco o cero!.");

}

function get_dia_ganancia(){
	//var start = gl_trasn_save.indexstart[gl_trasn_save.indexfec];
	//var end = gl_trasn_save.indexend[gl_trasn_save.indexfec];
	var result = 0;
	var index = gl_trasn_datos.index;
	for (var j = 0; j <= index; j++) {
		var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];
		var simbd = gl_trasn_save.simbd[j];
		var ganancia = gl_trasn_save.ganancia[j];
		var estado = gl_trasn_save.estado[j];
		if(!estado)estado="Realizada";
		if(estado == "Realizada" && selc_simb==simbd){
			result += ganancia;
		}
	}
	return result;
}

function reset_all_inputs(){
	
	var inputa = document.getElementById("inputrt10");
	var inputb = document.getElementById("inputrt11");
	var inputc = document.getElementById("inputrt12");
	var inputd = document.getElementById("inputrt13");
	var inpute = document.getElementById("inputrt14");
	var inputf = document.getElementById("inputrt15");
	var inputg = document.getElementById("inputrt16");
	var inputh = document.getElementById("text_maskrt10");
	var inputi = document.getElementById("text_maskrt11");
	var inputj = document.getElementById("text_maskrt12");

	inputa.value = "";
	inputa.setAttribute("placeholder", "Ingrese Valor");
	inputb.value = "";
	inputb.setAttribute("placeholder", "Ingrese Valor");
	inputc.value = "";
	inputc.setAttribute("placeholder", "Ingrese Valor");
	inputd.value = "";
	inpute.value = "";
	inputf.value = "";
	inputg.value = "";
	inputh.value = "";
	inputh.setAttribute("placeholder", "Ingrese Valor");
	inputi.value = "";
	inputi.setAttribute("placeholder", "Ingrese Valor");
	inputj.value = "";
	inputj.setAttribute("placeholder", "Ingrese Valor");
}


