
function set_basededatos(name)
{
	var solicitud = indexedDB.open(name, 1);
	solicitud.addEventListener("error", mostrarerror);
	solicitud.addEventListener("success", comenzar);
	solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
	alert("Error: tyt tyt " + evento.code + " " + evento.message);
}
function comenzar(evento) {
	var selec = document.getElementById("selc_monert");
	var current_select = selec.options[selec.selectedIndex].value;

	gl_selmon = parseInt(current_select);

	bd = evento.target.result;

	gl_trasn_datos = new trasn_datos();
	gl_trasn_save = new trasn_save();

	mostrar_temp(0);

	//gl_curr_optsel = gl_trasn_datos.save_id;
	//mostrar_datos(0);
	//mostrar_selec();

}

function crearbd(evento) {
	var basededatos = evento.target.result;
	var almacen_trans = basededatos.createObjectStore("datos_save", {keyPath:"id", autoIncrement: true});
	almacen_trans.createIndex("buscarnombre", "nombre", {unique: true});
	var almacen_temp = basededatos.createObjectStore("temp_save", {keyPath:"id", autoIncrement: true});
	almacen_temp.createIndex("buscarnombre", "nombre", {unique: true});

}

function add_transa(datos) {

	var transaccion = bd.transaction(["datos_save"], "readwrite");
	var almacen = transaccion.objectStore("datos_save");

	var id = gl_trasn_datos.save_id;
		//console.log(" Index?-" +gl_trasn_save.index+"");	
		//console.log(" iddd-" +id+"");	
	var solicitud = almacen.put({
					id: id, rtdatos: datos
				});

}
function add_temp(datos) {

	var transaccion = bd.transaction(["temp_save"], "readwrite");
	var almacen = transaccion.objectStore("temp_save");

	var solicitud = almacen.put({
					id: 0, tmpdatos: datos
				});

}

//Manejo de datos desde el selector de fechas -----------------------------------------
function mostrar_selec(clave) {
	var transaccion = bd.transaction(["datos_save"]);
	var almacen = transaccion.objectStore("datos_save");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_selec);
	
}
function obtener_selec(evento) {
	var resultado = evento.target.result;
	gl_hist_save = new trasn_save();
	if(resultado){
		//var id = resultado.id;
		gl_hist_save = resultado.rtdatos;
		var nr = gl_hist_save.index;
		for (var j = nr;  j >= 0; j--) {
			//console.log(j+" j");
			//var index = gl_trasn_save.savindex[j];
			gl_total_day += crear_historial(j);
		}
		var selc_simb = gl_trasn_datos.sel_simbd[gl_selmon];
		var result = get_mask("",gl_total_day,"("+selc_simb+")");
		var in_hist = document.getElementById("total_hist");
		in_hist.value = result;

		//console.log(" Index-" +gl_trasn_save.index+"");	
		
	}
}
//---------------------------------------------------------------------------------------

//Manejo de datos desde la transferencia y al inicio -----------------------------------------
function mostrar_datos(clave) {

	var transaccion = bd.transaction(["datos_save"]);
	var almacen = transaccion.objectStore("datos_save");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_datos);
	
}

function obtener_datos(evento) {
	var hoy = new Date();
	var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();
	var index = gl_trasn_datos.index;
	var fecha = gl_trasn_datos.fecha;
	var curr_id = gl_trasn_datos.save_id;

	var resultado = evento.target.result;
	if(resultado){
		var id = resultado.id;
		if(id == curr_id){
			if(!fecha){
				gl_trasn_datos.fecha = curr_fecha;
				gl_trasn_datos.fechalist[gl_trasn_datos.index] = curr_fecha;
				gl_trasn_save = new trasn_save();
				//console.log(+puntero.value.id+"  noo" );
			}
			else if(curr_fecha != fecha){
				gl_trasn_datos.index = 0;
				gl_trasn_datos.save_id++;
				gl_trasn_datos.fecha = curr_fecha;
				gl_trasn_datos.fechalist[gl_trasn_datos.save_id] = curr_fecha;
				add_temp(gl_trasn_datos);
				//add_transa(gl_trasn_save);

			}
		}	
		//console.log(" ---" +resultado.rtdatos.id+"");
		if(curr_fecha == fecha){
			gl_trasn_save = resultado.rtdatos;
			gl_hist_save = resultado.rtdatos;
		}

		//console.log(""+gl_trasn_datos.save_id+" index");
	}
	preloder_filtro_fec();
	selec_fechas("selchisfec", false);
	var nr = gl_hist_save.index;

	for (var j = nr;  j >= 0; j--) {
		gl_total_day += crear_historial(j);
	}
}
//---------------------------------------------------------------------------------------

function removerobjeto(clave) {

	var transaccion = bd.transaction(["datos_save"], "readwrite");
	var almacen = transaccion.objectStore("datos_save");
	var solicitud = almacen.delete(clave);

}

function remove_temp(clave) {

	var transaccion = bd.transaction(["temp_save"], "readwrite");
	var almacen = transaccion.objectStore("temp_save");
	var solicitud = almacen.delete(clave);

}

//Se obtine la lista de Transaciones -----------------------------------------
function mostrar_temp(clave) {
	var transaccion = bd.transaction(["temp_save"]);
	var almacen = transaccion.objectStore("temp_save");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_temp);
	
}

function obtener_temp(evento) {
	var resultado = evento.target.result;
	if(resultado){
		gl_trasn_datos = resultado.tmpdatos;
		gl_curr_optsel = gl_trasn_datos.save_id;

		var input = document.getElementById("tasa_rt");
		var valor = parseFloat(gl_trasn_datos.sel_tasa[gl_selmon])?parseFloat(gl_trasn_datos.sel_tasa[gl_selmon]):0;
		input.value = valor;

		//console.log(""+gl_trasn_datos.save_id+" index");
		mostrar_datos(gl_curr_optsel);
	}
}

//---------------------------------------------------------------------------

function trasn_datos() {
	this.id = 0;

	this.sel_money = new Array();
	this.sel_tasa =  new Array();
	this.sel_simbd = ["COP", "ARS"];
	this.sel_simbi = ["$", "$"];

	this.moneda = new Array();
	this.mon_ustd = new Array();
	this.mon_ustdve = new Array();

	//Control de trasn_save()
	this.index = 0;			//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	this.fecha = null;		//Fecha actual
	this.save_id = 0;		//ID actual (Va incrementando por dia)
	this.fechalist = new Array(); //Lista de fechas por dia
}

function trasn_save() {
	this.id = 0;

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
	this.estado = new Array();
}
//End
