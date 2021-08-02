import $ from 'jquery';
(function (global) {
	global.$ = $;
	global.jQuery = $;
}(typeof window !== 'undefined' ? window : this));
var Slider = require("bootstrap-slider");
import 'slick-slider/slick/slick.min.js';

// import '@fancyapps/fancybox'
// import 'bootstrap/js/dist/modal';
// import 'select2';
import Inputmask from "inputmask";

export {$, Slider, Inputmask};