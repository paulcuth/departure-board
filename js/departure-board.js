

var DepartureBoard = function (element, options) {
	options = options || {};
	
	this._element = element;
	this._letters = [];
	
	element.className += ' departure-board';

	var letterCount = options.letterCount || 25,
		letter;
	
	for (var i = 0; i < letterCount; i++) {
		letter = new DepartureBoard.Letter ();
		this._letters.push (letter);
		element.appendChild (letter.getElement ());
	}
	
};


DepartureBoard.LETTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,'()&!?+-";




DepartureBoard.prototype.spin = function () {
	var me = this;
	
	for (var i = 0, l = this._letters.length; i < l; i++) {
		(function (i) {
			window.setTimeout (function () {
				me._letters[i].spin ();
			}, 20 * i + Math.random () * 400);
		})(i);
	}	
};




DepartureBoard.prototype.setValue = function (value) {
	value = value.toUpperCase ();
	
	for (var i = 0, l = this._letters.length; i < l; i++) {
		var letterValue = value.substr (i, 1) || '';
		this._letters[i].setValue (letterValue);
	}
};








DepartureBoard.Letter = function () {	
	this._element = document.createElement ('span');
	this._element.className = 'letter';

	// this._top = document.createElement ('span');
	// this._top.className = 'letter top';
	// this._element.appendChild (this._top);
	// 
	// this._fold = document.createElement ('span');
	// this._fold.className = 'fold';
	// this._element.appendChild (this._fold);
	// 
	// this._flap = document.createElement ('span');
	// this._flap.className = 'letter flap';
	// this._fold.appendChild (this._flap);
	
	
	this._index = 0;
	this._interval = null;
	this._stopAt = null;
};




DepartureBoard.Letter.prototype.getElement = function () {
	return this._element;
};




DepartureBoard.Letter.prototype.spin = function (clear) {
	if (clear !== false) this._stopAt = null;
	
	var me = this;	
	this._interval = window.setInterval (function () { me._tick (); }, 40);
};




DepartureBoard.Letter.prototype.setValue = function (value) {
	this._stopAt = DepartureBoard.LETTERS.indexOf (value);
	if (this._stopAt < 0) this._stopAt = 0;

	if (!this._interval && this._index != this._stopAt) this.spin (false);
};




DepartureBoard.Letter.prototype._tick = function () {
	var me = this;

	this._index = (this._index + 1) % DepartureBoard.LETTERS.length;
	this._element.innerHTML = DepartureBoard.LETTERS.charAt (this._index);

	// this._flap.innerHTML = this._element.innerHTML;
	// this._top.innerHTML = DepartureBoard.LETTERS.charAt (this._index);
	// 
	// this._flap.style.transform = 'scaleX (0)'
	// 
	// window.setTimeout (function () {
	// 	me._flap.style
	// }, 10);
	// 

	if (this._index === this._stopAt) {
		clearInterval (this._interval);
		delete this._interval;
	}
};

