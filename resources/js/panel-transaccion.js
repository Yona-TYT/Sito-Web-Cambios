var gl_selmon = 0;

function int_trans(){
	//Selecciona el tipo de moneda
	var selec = document.getElementById("selc_monert");
	selec.addEventListener("change", function(){

		var index = selec.options[selec.selectedIndex].value;
		index = parseInt(index)?parseInt(index):0;
		gl_selmon = index;
		var val = (gl_trasn_datos.sel_tasa[index]==null?0:gl_trasn_datos.sel_tasa[index]);
		var input = document.getElementById("tasa_rt");
		input.value = val;
		get_trans_datos();
		//console.log(+index+"  " );

	});

	var input = document.getElementById("tasa_rt");
	input.addEventListener("input", function(){

		var input = document.getElementById("tasa_rt");
		gl_trasn_datos.sel_tasa[gl_selmon] = parseFloat(input.value)?parseFloat(input.value):0;
		//console.log(+input.value+"  " );
		get_trans_datos();

	});

	create_table_rt();
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

	//Obtenemos los inputs ESCRITURA ---------------------------------------
	var input_a = document.getElementById("inputrt10");
	var input_b = document.getElementById("inputrt11");
	var input_d = document.getElementById("inputrt13");

	var val_a = parseFloat(input_a.value)?parseFloat(input_a.value):0;
	var val_b = parseFloat(input_b.value)?parseFloat(input_b.value):0;
	var val_d = parseFloat(input_d.value)?parseFloat(input_d.value):0;

	//Guarda los valores
	gl_trasn_datos.moneda[sel_nr] = val_a;
	gl_trasn_datos.mon_ustd[sel_nr] = val_b;
	gl_trasn_datos.mon_ustdve[sel_nr] = val_d;

	add_temp(gl_trasn_datos);
	
	//------------------------------------------------------------------------


	//Calculos de datos--------------------------------------
	var total_ves = val_a/tasa; //Total VES
	var usdt_req = total_ves/val_d; //USDT requeridos
	var mon_req = val_b*usdt_req //Requeridos (Moneda)
	var ganancia = val_a-mon_req //Ganancia

		console.log(usdt_req);

	//Obtenemos los inputs SOLO LECTURA --------------------------------------
	var input_c = document.getElementById("inputrt12");
	var input_e = document.getElementById("inputrt14"); 
	var input_f = document.getElementById("inputrt15");
	var input_g = document.getElementById("inputrt16");

	input_c.value = get_mask("", usdt_req, "(USDT)");
	input_e.value = get_mask("", total_ves, "VES");
	input_f.value = get_mask(simbi, mon_req, "");
	input_g.value = get_mask(simbi, ganancia, "");

	//------------------------------------------------------------------------

	//Obtenemos los inputs LECTURA DE MASK MONEDA
	var mask_a = document.getElementById("text_maskrt10");
	var mask_b = document.getElementById("text_maskrt11");
	var mask_d = document.getElementById("text_maskrt13");


	mask_a.value = get_mask(simbi, input_a.value, "("+simbd+")");
	mask_b.value = get_mask("", input_b.value, "("+simbd+"/USDT)");
	mask_d.value = get_mask("", input_d.value, "(VES/USDT)");

}

function resultado_conver(){
	var selec = document.getElementById("sel_conver");
	var tasa = document.getElementById("rt_tasa");
	var input_a = document.getElementById("rt_input_a");
	var input_b = document.getElementById("rt_input_b");

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

	if(moneda !=0 && mon_ustd !=0 && mon_ustdve !=0){
		//Calculos de datos--------------------------------------
		var total_ves = moneda/tasa; //Total VES
		var usdt_req = total_ves/mon_ustdve; //USDT requeridos
		var mon_req = mon_ustd*usdt_req //Requeridos (Moneda)
		var ganancia = moneda-mon_req //Ganancia



		//Reinici los valores------------------------------------
		gl_trasn_datos.moneda[gl_selmon] = 0;
		gl_trasn_datos.mon_ustd[gl_selmon] = 0;
		gl_trasn_datos.mon_ustdve[gl_selmon] = 0;

		document.getElementById("inputrt10").value = "";
		document.getElementById("inputrt11").value = "";
		document.getElementById("inputrt12").value = "";
		document.getElementById("inputrt13").value = "";
		document.getElementById("inputrt14").value = "";
		document.getElementById("inputrt15").value = "";
		document.getElementById("inputrt16").value = "";
		document.getElementById("text_maskrt10").value = "";
		document.getElementById("text_maskrt11").value = "";
		document.getElementById("text_maskrt13").value = "";

		var hoy = new Date();
		var hora =  hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
		var fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();

		var index = gl_trasn_save.index;
		var indexfec = gl_trasn_save.indexfec;
		var fechalist = gl_trasn_save.fechalist[indexfec];

		if(fechalist != fecha) {
			if(!fechalist) {
				gl_trasn_save.indexstart[indexfec] = index;
				gl_trasn_save.fechalist[indexfec] = fecha;
			}

			else{
				indexfec++
				gl_trasn_save.indexstart[indexfec] = index;
				gl_trasn_save.indexfec = indexfec;
				gl_trasn_save.fechalist[indexfec] = fecha;
			}
		}

		//Guarda los valores----------------------------------------
		gl_trasn_save.simbd[index] = simbd;
		gl_trasn_save.simbi[index] = simbi;

		gl_trasn_save.moneda[index] = moneda;
		gl_trasn_save.mon_ustd[index] = mon_ustd;
		gl_trasn_save.mon_ustdve[index] = mon_ustdve;

		gl_trasn_save.total_ves[index] = total_ves;
		gl_trasn_save.usdt_req[index] = usdt_req;
		gl_trasn_save.mon_req[index] = mon_req;
		gl_trasn_save.ganancia[index] = ganancia;
		//-----------------------------------------------------------

		gl_trasn_save.hora[index] = hora;
		gl_trasn_save.fecha[index] = fecha;
		gl_trasn_save.indexend[indexfec] = index;
		gl_trasn_save.index++;

		add_transa(gl_trasn_save);

		preloder_filtro_fec();
		selec_fechas("selchisfec");
	}
	else alert("¡No se permiten valores en blanco o cero!.");

}


function trasn_datos() {
	this.id = 1;

	this.sel_money = new Array();
	this.sel_tasa =  new Array();
	this.sel_simbd = ["COP", "ARS"];
	this.sel_simbi = ["$", "$"];

	this.moneda = new Array();
	this.mon_ustd = new Array();
	this.mon_ustdve = new Array();
}
function trasn_save() {
	this.id = 1;

	this.indexfec = 0;
	this.fechalist = new Array();

	this.indexstart = new Array();
	this.indexend = new Array();

	this.index = 0;

	this.fecha = new Array();
	this.hora = new Array();

	this.simbd = new Array();
	this.simbi = new Array();


	this.tasa = new Array();
	this.moneda = new Array();
	this.mon_ustd = new Array();
	this.mon_ustdve = new Array();

	this.total_ves = new Array();
	this.usdt_req = new Array();
	this.mon_req = new Array();
	this.ganancia = new Array();
}
