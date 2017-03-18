if (Controller && Controller.parsedAdd) Controller.parsedAdd(function(layer){//parsed должен забираться после установки msg config-a
	//После onsubmit слой должен перепарсится
	if (!layer.onsubmit) return '';
	if (!layer.config || !layer.config.ans) return '';
	var str=layer.config.ans.msg;
	if (!str) str='';
	if (layer.config.ans.time) {
		str += layer.config.ans.time;
	}
	return str;		
});
Event.handler('layer.onshow', function (layer) {
	//onsubmit
	infrajs.setonsubmit(layer);
});
