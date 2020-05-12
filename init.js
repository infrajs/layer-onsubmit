//import { Controller } from '/vendor/infrajs/controller/src/Controller.js'
//import { Event } from '/vendor/infrajs/event/Event.js'
import { Parsed } from '/vendor/infrajs/controller/src/Parsed.js'
//import { Submit } from '/vendor/infrajs/layer-onsubmit/Submit.js'
//import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'

Parsed.add(layer => { //parsed должен забираться после установки msg config-a
	//После onsubmit слой должен перепарсится
	if (!layer.onsubmit) return ''
	if (!layer.config || !layer.config.ans) return ''
	let str = layer.config.ans.msg
	if (!str) str = ''
	if (layer.config.ans.time) {
		str += layer.config.ans.time
	}
	return str
})

// let iscontext = (div) => {
// 	do if (div.tagName == 'HTML') return true
// 	while (div = div.parentElement)
// }

// Event.handler('Layer.onshow', async layer => {
// 	if (!layer.onsubmit) return
// 	let div = document.getElementById('{div}')
// 	let tag = tag => div.getElementsByTagName(tag)[0]
// 	let form = tag('form')
// 	let ans = await Submit.init(form)

// 	await Session.async()
// 	if (layer.global) {
// 		let { Global } = await import('/vendor/infrajs/layer-global/Global.js')
// 		Global.set(layer.global); //Удаляет config.ans у слоёв
// 	}
	
// 	if (ans.go) {
// 		Crumb.go(ans.go)
// 	}
// 	if (ans.popup) {
// 		let { Popup } = await import('/vendor/infrajs/popup/Popup.js')
// 		if (ans.result) Popup.success(ans.msg)
// 		else Popup.error(ans.msg)
// 	}


// 	if (!layer.config) layer.config = {}
// 	layer.config.ans = ans
// 	Controller.check(layer)
// }, ':dom');

