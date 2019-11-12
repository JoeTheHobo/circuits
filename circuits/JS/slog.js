/*EG
slog('.[color: green; font-weight: bold;]Hello .[background: green]world!');

*/


const slog = (txt) => {
	let texts = [];
	let addons = [];
	let text = '';
	let prev = false;
	for (var i = 0; i < txt.length; i++) {
		if (txt.charAt(i) == '.' && txt.charAt(i + 1) == '[') {
			if (prev) {
				texts.push(text);
				text = '';
			}
			i += 2;
			let add = '';

			for (var j = i; j < txt.length; j++) {
				if (txt.charAt(j) == ']') {
					addons.push(add);
					i = j;
					j = txt.length;
				} else {
					add += txt.charAt(j);
				}
			}
			prev = true;
		} else {
			text += txt.charAt(i);
		}
	}
	texts.push(text);

	let string = 'console.log(';
	for (var i = 0; i < texts.length; i++) {
		string += ' "%c' + texts[i] + '" +';
	}
	string = string.substring(0, string.length - 1);
	string += ',';
	let numAdd = 0;
	if (addons == 0)
		numAdd = 1;
	for (var i = 0; i < addons.length + numAdd; i++) {
		string += ' "' + addons[i] + '",';
	}		
	string = string.substring(0, string.length - 1);
	string += ')';
	eval(string);
}
slog.error = (text = '') => {
	slog('.[background: red; font-weight: bold] ERROR: .[background: red; color: black]' + text);
}
slog.warn = (text = '') => {
	slog('.[background: yellow; font-weight: bold] WARNING: .[background: yellow; color: black]'+text);
}
slog.debug = (text = '') => {
	slog('.[background: orange; font-weight: bold] DEBUG: .[background: orange; color: black]'+text);
}



