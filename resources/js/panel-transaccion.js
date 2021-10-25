var gl_selmon_a = 0;
var gl_selmon_b = 0;

function int_trans(){
	//Selecciona el tipo de moneda
	var sel_a = document.getElementById("selc_mone_a");
	sel_a.addEventListener("change", function(){
		selec_change_mo();
		selec_fechas('selchisfec');

	});

	var sel_b = document.getElementById("selc_mone_b");
	sel_b.addEventListener("change", function(){
		selec_change_mo();
		selec_fechas('selchisfec');

	});

	var input = document.getElementById("input_tasa");
	input.addEventListener("input", function(){
		var input = document.getElementById("input_tasa");
		var mask = document.getElementById("text_mask_tasa");

		var tx = input.value
		tx = tx.replace(/[0]($)/, "1");

		//input.value = tx;

		var valor = parseFloat(input.value)?parseFloat(input.value):0;
		gl_trasn_datos.sel_tasa[gl_selmon_a][gl_selmon_b] = valor;

		mask.value = get_mask("", valor,"", decim_len(valor));

		//console.log(" len: " +decim_len(valor)+" Tx: "+tx);	
		input.setAttribute("step", ""+get_step(valor)+"");
		//console.log(+input.value+"  " );
		get_trans_datos();

	});
	input.addEventListener("focus", el_selec);

	create_table_rt();
}

function selec_change_mo(){
	var selec_a = document.getElementById("selc_mone_a");
	var selec_b = document.getElementById("selc_mone_b");

	var inx_a = selec_a.options[selec_a.selectedIndex].value;
	var inx_b = selec_b.options[selec_b.selectedIndex].value;

	for (var j = 0; j < gl_trasn_datos.sel_simbd.length; j++) {
		if(j == inx_a){
			if(j == inx_b){
				selec_b.options[3].selected=true;
				inx_b = 3;
			}
			selec_b.options[j].setAttribute("class", "input_style_hidden");
		}
		else
			selec_b.options[j].setAttribute("class", "");
	}


	gl_selmon_a = inx_a;
	gl_selmon_b = inx_b;

	if(gl_selmon_b == 3) return null;

	gl_trasn_datos.sel_mon_a = inx_a;
	gl_trasn_datos.sel_mon_b = inx_b;

	var inp_nam_a = document.getElementById("inputrt00");
	var inp_nam_b = document.getElementById("inputrt01");
	var inp_nam_c = document.getElementById("inputrt05");

	var simb_a = gl_trasn_datos.sel_simbd[gl_selmon_a];
	if(simb_a){
		inp_nam_a.value = ""+simb_a+"";
		inp_nam_b.value = ""+simb_a+"/USDT";
		inp_nam_c.value = ""+simb_a+" Requeridos";
	}

	var inp_nam_a = document.getElementById("inputrt02");
	var inp_nam_b = document.getElementById("inputrt04");
	var simb_b = gl_trasn_datos.sel_simbd[gl_selmon_b];
	if(simb_b){
		inp_nam_a.value = ""+simb_b+"/USDT";
		inp_nam_b.value = "Total "+simb_b;
	}

	var val = gl_trasn_datos.sel_tasa[inx_a][inx_b];
	var input = document.getElementById("input_tasa");
	input.setAttribute("step", ""+get_step(val)+"");
	input.value = val;

	var mask = document.getElementById("text_mask_tasa");
	mask.value = get_mask("", val,"", decim_len(val));


	//Iniciamos los inputs ESCRITURA ---------------------------------------
	var input_a = document.getElementById("inputrt10");
	var input_b = document.getElementById("inputrt11");
	var input_c = document.getElementById("inputrt12");

	var moneda = gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b];
	var mon_ustd = gl_trasn_datos.mon_ustd[gl_selmon_a][gl_selmon_b];
	var mon_ustdve = gl_trasn_datos.mon_ustdve[gl_selmon_a][gl_selmon_b];

	input_a.value = parseFloat(moneda)?parseFloat(moneda):0;
	input_b.value = parseFloat(mon_ustd)?parseFloat(mon_ustd):0;
	input_c.value = parseFloat(mon_ustdve)?parseFloat(mon_ustdve):0;

	get_trans_datos();
}

var gl_trasn_datos = new trasn_datos();
var gl_trasn_save = new trasn_save();

function get_trans_datos() {
	if(gl_selmon_b == 3) return alert("Tipo de Moneda Esata Vacio!.");
	//Iniciar areglos
	var tasa = gl_trasn_datos.sel_tasa[gl_selmon_a][gl_selmon_b];
	var simbd_a = gl_trasn_datos.sel_simbd[gl_selmon_a];
	var simbi_a = gl_trasn_datos.sel_simbi[gl_selmon_a];
	var simbd_b = gl_trasn_datos.sel_simbd[gl_selmon_b];
	var simbi_b = gl_trasn_datos.sel_simbi[gl_selmon_b];

	//Revisa el cuadro de tasa
	var tas_input = document.getElementById("input_tasa");
	var mask = document.getElementById("text_mask_tasa");
	if(tasa==0){
		tasa = parseFloat(tas_input.value)?parseFloat(tas_input.value):0;
		gl_trasn_datos.sel_tasa[gl_selmon_a][gl_selmon_b] = tasa;
	}	
	//mask.value = tasa;
	//Obtenemos los inputs ESCRITURA ---------------------------------------
	var input_a = document.getElementById("inputrt10");
	var input_b = document.getElementById("inputrt11");
	var input_c = document.getElementById("inputrt12");

	var val_a = parseFloat(input_a.value)?parseFloat(input_a.value):0;
	var val_b = parseFloat(input_b.value)?parseFloat(input_b.value):0;
	var val_c = parseFloat(input_c.value)?parseFloat(input_c.value):0;

	//Guarda los valores
	gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b] = val_a;
	gl_trasn_datos.mon_ustd[gl_selmon_a][gl_selmon_b] = val_b;
	gl_trasn_datos.mon_ustdve[gl_selmon_a][gl_selmon_b] = val_c;

	var moneda = val_a;
	var mon_ustd = val_b;
	var mon_ustdve = val_c;

	//console.log(" Input: "+ val_a+"SAVE: "+gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b]+" b: "+gl_selmon_b);

	add_temp(gl_trasn_datos);
	
	//------------------------------------------------------------------------
	//Calculos de datos--------------------------------------
	var total_tranf = 0; 	//Total Moneda a Calcular
	var usdt_req = 0;		 //USDT requeridos
	var mon_req = 0; //Requeridos (Moneda)
	//COP
	if(gl_selmon_a == 0){
	 	if(gl_selmon_b == 1){	//ARS
			return alert("No disponible!.");
		}
		else if(gl_selmon_b == 2){	//VES
			total_tranf = moneda/tasa;
			usdt_req = total_tranf/mon_ustdve;
			mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
		}
	}

	//ARS
	else if(gl_selmon_a == 1){
		if(gl_selmon_b == 0){	//COP
			total_tranf = moneda*tasa;
			usdt_req = total_tranf/mon_ustdve;
			mon_req = mon_ustd*usdt_req; //Requeridos (Moneda)
		}

		else if(gl_selmon_b == 2){	//VES
			total_tranf = moneda*tasa;
			usdt_req = total_tranf/mon_ustdve;
			mon_req = mon_ustd*usdt_req; //Requeridos (Moneda)
		}
	}

	//VES
	else if(gl_selmon_a == 2){
		if(gl_selmon_b == 0){	//COP
			total_tranf = moneda*tasa;
			usdt_req = total_tranf/mon_ustdve;
			mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
		}
		else if(gl_selmon_b == 1){	//ARS
			return alert("No disponible!.");
		}
	}
	//console.log(" Tasa: "+ tasa+" a: "+gl_selmon_a+" b: "+gl_selmon_b);
	//console.log(" mon_ustd: "+ mon_ustd+" usdt_req: "+usdt_req+" b: "+gl_selmon_b);

	var ganancia = moneda-mon_req //Ganancia

	//Obtenemos los inputs SOLO LECTURA --------------------------------------
	var input_d = document.getElementById("inputrt13");
	var input_e = document.getElementById("inputrt14"); 
	var input_f = document.getElementById("inputrt15");
	var input_g = document.getElementById("inputrt16");

	input_d.value = get_mask("", usdt_req, "(USDT)");
	input_e.value = get_mask("", total_tranf, ""+simbd_b+"");
	input_f.value = get_mask(simbi_a, mon_req, "");
	input_g.value = get_mask(simbi_a, ganancia, "")+" ("+get_mask_simple((ganancia/moneda*100), "%")+")";

	//------------------------------------------------------------------------
	//Obtenemos los inputs LECTURA DE MASK MONEDA
	var mask_a = document.getElementById("text_maskrt10");
	var mask_b = document.getElementById("text_maskrt11");
	var mask_c = document.getElementById("text_maskrt12");

	mask_a.value = get_mask(simbi_a, input_a.value, "("+simbd_a+")");
	mask_b.value = get_mask("", input_b.value, "("+simbd_a+"/USDT)");
	mask_c.value = get_mask("", input_c.value, "("+simbd_b+"/USDT)");

}

function resultado_conver(){
	var selec = document.getElementById("sel_conver");
	var tasa = document.getElementById("input_tasa");
	var input_a = document.getElementById("cv_input_a");
	var input_b = document.getElementById("cv_input_b");
	var input_c = document.getElementById("cv_input_c");
	var gan = document.getElementById("cv_input_gan");

	if(gl_selmon_b == 3) return alert("Tipo de Moneda Esata Vacio!.");

	var num_a =  parseFloat(input_a.value)?parseFloat(input_a.value):0;
	var num_b =  parseFloat(input_b.value)?parseFloat(input_b.value):0;
	var num_tasa =  parseFloat(tasa.value)?parseFloat(tasa.value):0;
	var num_gan =  parseFloat(gan.value)?parseFloat(gan.value):0;



	console.log("Result: "+ num_a);
	if(selec.value == "0"){
		var result = num_a/num_tasa;
		var res_gan = calc_ganancia(num_gan, result);

		input_b.value = get_mask("",res_gan,"Bs");
		input_c.value = get_mask("$",(res_gan-result),"");
	}
	if(selec.value == "1"){
		var result = num_a*num_tasa;
		var res_gan = calc_ganancia(num_gan, result);

		input_b.value = get_mask("$",res_gan,"");
		input_c.value = get_mask("$",(res_gan-result),"");
	}
}

function guardar_trans_datos(){
	//Iniciar areglos
	var tasa = gl_trasn_datos.sel_tasa[gl_selmon_a][gl_selmon_b];
	var simbd_a = gl_trasn_datos.sel_simbd[gl_selmon_a];
	var simbi_a = gl_trasn_datos.sel_simbi[gl_selmon_a];
	var simbd_b = gl_trasn_datos.sel_simbd[gl_selmon_b];
	var simbi_b = gl_trasn_datos.sel_simbi[gl_selmon_b];

	var moneda = (gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b]==null?0:gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b]);
	var mon_ustd = (gl_trasn_datos.mon_ustd[gl_selmon_a][gl_selmon_b]==null?0:gl_trasn_datos.mon_ustd[gl_selmon_a][gl_selmon_b]);
	var mon_ustdve = (gl_trasn_datos.mon_ustdve[gl_selmon_a][gl_selmon_b]==null?0:gl_trasn_datos.mon_ustdve[gl_selmon_a][gl_selmon_b]);

	if(gl_selmon_b == 3) return alert("Tipo de Moneda Esata Vacio!.");

	if(moneda !=0 && mon_ustd !=0 && mon_ustdve !=0 && tasa !=0){
		//Calculos de datos--------------------------------------
		var total_tranf = 0; 	//Total Moneda a Calcular
		var usdt_req = 0;		 //USDT requeridos
		var mon_req = 0; //Requeridos (Moneda)
		//COP
		if(gl_selmon_a == 0){
		 	if(gl_selmon_b == 1){	//ARS
				//return alert("No disponible!.");
			}
			else if(gl_selmon_b == 2){	//VES
				total_tranf = moneda/tasa;
				usdt_req = total_tranf/mon_ustdve;
				mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
			}
		}
		//ARS
		else if(gl_selmon_a == 1){
			if(gl_selmon_b == 0){	//COP
				total_tranf = moneda*tasa;
				usdt_req = total_tranf/mon_ustdve;
				mon_req = mon_ustd*usdt_req; //Requeridos (Moneda)
			}

			else if(gl_selmon_b == 2){	//VES
				total_tranf = moneda*tasa;
				usdt_req = total_tranf/mon_ustdve;
				mon_req = mon_ustd*usdt_req; //Requeridos (Moneda)
			}
		}
		//VES
		else if(gl_selmon_a == 2){
			if(gl_selmon_b == 0){	//COP
				//return alert("No disponible!.");
			}
			else if(gl_selmon_b == 1){	//ARS
				//return alert("No disponible!.");
			}
		}
		var ganancia = moneda-mon_req 			//Ganancia

		//Reinici los valores------------------------------------
		gl_trasn_datos.moneda[gl_selmon_a][gl_selmon_b] = 0;
		gl_trasn_datos.mon_ustd[gl_selmon_a][gl_selmon_b] = 0;
		gl_trasn_datos.mon_ustdve[gl_selmon_a][gl_selmon_b] = 0;
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
		gl_trasn_save.simbd_a[index] = simbd_a;
		gl_trasn_save.simbi_a[index] = simbi_a;
		gl_trasn_save.simbd_b[index] = simbd_b;
		gl_trasn_save.simbi_b[index] = simbi_b;
		gl_trasn_save.tasa[index] = tasa;
		gl_trasn_save.moneda[index] = moneda;
		gl_trasn_save.mon_ustd[index] = mon_ustd;
		gl_trasn_save.mon_ustdve[index] = mon_ustdve;
		gl_trasn_save.total_ves[index] = total_tranf;
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
		var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon_a];
		var simbd = gl_trasn_save.simbd_a[j];
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


