<?php
use infrajs\controller\Layer;
use infrajs\event\Event;
Event::handler('Controller.oninit', function () {
	Layer::parsedAdd('onsubmit');
});