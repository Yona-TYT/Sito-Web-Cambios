
var cajadatos, bd;
var claveventa = 001;

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

	mostrar_temp(gl_trasn_datos.id);
	mostrar_datos(gl_trasn_save.id);


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

	var solicitud = almacen.put({
							id: datos.id, rtdatos: datos
				});

}
function add_temp(datos) {

	var transaccion = bd.transaction(["temp_save"], "readwrite");
	var almacen = transaccion.objectStore("temp_save");

	var solicitud = almacen.put({
							id: datos.id, tmpdatos: datos
				});

}

//Se obtine la lista de Transaciones -----------------------------------------
function mostrar_datos(clave) {
	var transaccion = bd.transaction(["datos_save"]);
	var almacen = transaccion.objectStore("datos_save");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_datos);
	
}

function obtener_datos(evento) {
	var resultado = evento.target.result;
	if(resultado){
		gl_trasn_save = resultado.rtdatos;

		var hoy = new Date();
		var index = gl_trasn_save.index;
		var indexfec = gl_trasn_save.indexfec;
		var fechalist = gl_trasn_save.fechalist[indexfec];
		var fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();


		if(fechalist != fecha) {

			if(!fechalist) {

				gl_lista_ventas.indexstart[indexfec] = index;
				gl_lista_ventas.fechalist[indexfec] = fecha;
			}

			else{
				indexfec++
				gl_lista_ventas.indexstart[indexfec] = index;
				gl_lista_ventas.indexfec = indexfec;
				gl_lista_ventas.fechalist[indexfec] = fecha;
			}
		}
		preloder_filtro_fec();
		selec_fechas("selchisfec");
	}
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

		load_save_data();
	}
}

//----------------------------------------------------------------------

function all_ventas() {
	this.indexnomb = 0;
	this.nombrecl = new Array();

	this.indexfec = 0;
	this.fechalist = new Array();

	this.indexstart = new Array();
	this.indexend = new Array();

	this.index = 0;
	this.cliente = new Array();
	this.detalles = new Array();
	this.totaldol = new Array();
	this.totalbsf = new Array();
	this.fecha = new Array();
	this.hora = new Array();
	this.estado = new Array();

	this.pdtindex = new Array();
	this.pdtclave = new Array();
	this.pdtcantidad = new Array();
	this.pdtdesc = new Array();
}

function allnames_list() {
	this.list_id = [0, 1, 2, 3, 4, 5];
	this.list_nam = ["Liata Numero 1", "Liata Numero 2", "Liata Numero 3", "Liata Numero 4", "Liata Numero 5", "Liata Numero 6"];
	this.clave = 0001;
	this.genmargen = 0;
	this.genprecio = 0;
}

function result_list_a() {
	this.listatamaño = 10;
	this.clave = 0001;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
