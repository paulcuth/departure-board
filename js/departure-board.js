

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


DepartureBoard.LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,'()&!?+-";




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

	this._top = document.createElement ('span');
	this._top.className = 'flap top';
	this._element.appendChild (this._top);
	
	this._topText = document.createElement ('span');
	this._topText.className = 'text';
	this._top.appendChild (this._topText);
	

	this._bottom = document.createElement ('span');
	this._bottom.className = 'flap bottom';
	this._element.appendChild (this._bottom);
	
	this._bottomText = document.createElement ('span');
	this._bottomText.className = 'text';
	this._bottom.appendChild (this._bottomText);


	this._fold = document.createElement ('span');
	this._fold.className = 'fold';
	this._element.appendChild (this._fold);
	
	this._falling = document.createElement ('span');
	this._falling.className = 'flap falling';
	this._fold.appendChild (this._falling);
	
	this._fallingText = document.createElement ('span');
	this._fallingText.className = 'text';
	this._falling.appendChild (this._fallingText);
	
	
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
	this._interval = window.setTimeout (function () { me._tick (); }, 400);
};




DepartureBoard.Letter.prototype.setValue = function (value) {
	this._stopAt = DepartureBoard.LETTERS.indexOf (value);
	if (this._stopAt < 0) this._stopAt = 0;

	if (!this._interval && this._index != this._stopAt) this.spin (false);
};




DepartureBoard.Letter.prototype._tick = function () {
	var me = this,
		oldValue = DepartureBoard.LETTERS.charAt (this._index);
	

	this._index = (this._index + 1) % DepartureBoard.LETTERS.length;

	this._fallingText.innerHTML = oldValue;
	this._falling.style.display = 'block';
	
	this._topText.innerHTML = DepartureBoard.LETTERS.charAt (this._index);
	
	this._fallingText.style.WebkitTransform = 'scaleY(0)';
	 
	window.setTimeout (function () {
		me._fallingText.innerHTML = me._topText.innerHTML;
		me._falling.style.display = 'block';
	
		me._falling.style.top = 0;
		me._falling.style.bottom = 'auto';
		me._falling.style.height = 'auto';
		
		me._fallingText.style['-webkit-transform'] = 'scaleY(1)';
	}, 1000);
	
	// window.setTimeout (function () {
	// 	me._bottomText.innerHTML = me._topText.innerHTML;
	// 	me._falling.style.display = 'none';
	// 
	// 	me._falling.style.top = 'auto';
	// 	me._falling.style.bottom = 0;
	// }, 2000);
	

	if (this._index === this._stopAt) {
		clearInterval (this._interval);
		delete this._interval;
	}
};

