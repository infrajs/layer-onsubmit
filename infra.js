infrajs.onsubmitinit();

Event.handler('layer.onshow', function (layer) {
	//onsubmit
	infrajs.setonsubmit(layer);
});