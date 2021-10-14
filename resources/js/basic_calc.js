
function calc_dolarporunidad(margen, margenunidad, precio)
{
	var a =  parseFloat(precio)? parseFloat(precio):0;
	var b =  parseFloat(margenunidad)? parseFloat(margenunidad):0;	
	var c =  parseFloat(margen)? parseFloat(margen):0;

	var calc = (a*(b+c)*0.01)+a;
	//add_message(""+a+"---"+b+"---"+(c)+"");
	var result = parseFloat(calc)? parseFloat(calc) : 0;

	return calc;
}


function calc_bolivarprecio(bolivares, dolar)
{
	var a =  parseFloat(bolivares)?parseFloat(bolivares):0;
	var b =  parseFloat(dolar)?parseFloat(dolar):0;
	//add_message(""+a+"---"+b+"");

	var calc = a*b;

	return calc;
}

function addCommas(nStr,simbd,simbi){
		
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		   x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}

		return simbi+" "+ x1 + x2.replace(".",",") + " "+simbd;
}

function get_mask(simbi, numer,simbd , fix = 2){
	numer = parseFloat(numer)? parseFloat(numer).toFixed(fix) : parseFloat(0).toFixed(fix);
	return addCommas(numer,simbd,simbi);
}

function get_mask_simple(numer,simb){
	numer = parseFloat(numer)? parseFloat(numer).toFixed(2) : parseFloat(0).toFixed(2);
	return numer+" "+simb;

}

function get_colum_nr(num, tabble_siz, j){
		return j+(tabble_siz*j)-num;
}

function get_fila_nr(num, tabble_siz, i){

		var resusl = ((num)/(tabble_siz))-(2/tabble_siz);

		return resusl;
}
function num_len(num){
	var dig = Math.log(num) * Math.LOG10E + 1 | 0;
	var res = 1;
	for(j = 1; j<dig;j++){
		res *= 10;
	}
	return res;
}
function decim_len(num){
	var val = (Math.log(num) * Math.LOG10E + 1 | 0)*(-1)
	var txt = ""+num+"";

	var text_list = txt.split('.')

	if(text_list.length>0){
		var test = text_list[1]
		var dig = test?test.length:0;//(Math.log(n) * Math.LOG10E + 1 | 0)-1;
		var res = "";
		//console.log(" num: " +Math.max(dig, val)+"");
		return Math.max(dig, val);
	}
	return 0;
}
function decim_len_tx(num){
	var val = num - Math.floor(num);
	var txt = ""+num+"";

	var text_list = txt.split('.')

	if(text_list.length>0){
		var test = text_list[1]
		var dig = test?test.length:0;//(Math.log(n) * Math.LOG10E + 1 | 0)-1;
		var res = "";
		var flag = true;
		for(j = 0; j<dig;j++){
			if(flag){
				//console.log(" len" +test[j]+"");
				if(test[j] && test[j] != '0'){
					//res += "0";	
					flag = false;
					continue;
				}
				res += "0";
			}
			else
				res += "0";
		}
		return res.replace(/($)/, "1");
	}
	return "0";
}
function get_step(num){
	return (Number.isInteger(num)?1:"0.00000001");
}

