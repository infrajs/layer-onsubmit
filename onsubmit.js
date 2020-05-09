//onsubmit - обработка ответа формы. Ответ обработчика находится в layer.config.ans (обрабатываются параметры в ответе result, msg
//Проверки перед отправки формы не предусмотрено. Всё проверяет сервер и отвечает в msg.
//При изменении msg слой перепарсивается
import { Event } from '/vendor/infrajs/event/Event.js'
import { Fire } from '/vendor/akiyatkin/load/Fire.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
let ws = new WeakSet()
Controller.setonsubmit = function (layer) {
	if (!layer.onsubmit) return
	if (!layer.config) layer.config = {}
	let div = document.getElementById(layer.div)
	let tag = tag => div.getElementsByTagName(tag)
	let cls = (cls, div = div) => div.getElementsByClassName(cls)
	let form = tag('form')[0]
	if (!form) return
	if (ws.has(form)) return
	ws.add(form)

	for (let btn of cls('submit', form)) {
		btn.addEventListener('click', form.submit)
	}
	//Event, Crumb, Controller
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (layer.config.onsubmit) return false;//Защита от двойной отправки
		layer.config.onsubmit = true;

		setTimeout(async () => {
			// Надо чтобы все обработчики сделали всё что нужно с отправляемыми данными и только потом отправлять
			//autosave должен примениться
			let response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})
			let msg = 'Connect Error'
			let ans = false
			if (response) {
				try {
					ans = await response.json()
				} catch (e) {
					msg = ' Server Error'
					let text = await response.text()
					let { Access } = await import('/vendor/infrajs/access/Access.js')
					if (await Access.debug()) msg += '<hr>' + e + '<hr>' + text
				}
			}
			if (layer.global) {
				let { Global } = await import('/vendor/infrajs/layer-global/Global.js')
				Global.set(layer.global); //Удаляет config.ans у слоёв
			}
			if (!ans) ans = {
				result: 0,
				msg: msg
			}
			layer.config.ans = ans
			await Session.async()
			layer.config.onsubmit = false
			let { Layer } = await import('/vendor/infrajs/controller/src/Layer.js')
			await Fire.on(Layer, 'submit', layer)
			Event.fire('Layer.onsubmit', layer) //в layers.json указывается onsubmit:true, а в tpl осуществляется подписка на событие onsubmit и обработка
			if (typeof (layer.onsubmit) == 'function') layer.onsubmit(layer)
			if (ans.go) Crumb.go(ans.go)
			if (ans.popup) {
				let { Popup } = await import('/vendor/infrajs/popup/Popup.js')
				if (ans.result) Popup.success(ans.msg)
				else Popup.error(ans.msg)
			} else {
				Controller.check(layer)
				//Controller.check()
			}
		}, 200);
		return false;
	})
};