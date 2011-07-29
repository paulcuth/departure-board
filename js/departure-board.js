

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


DepartureBoard.LETTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,':()&!?+-";




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
	var me = this;
	
	for (var i = 0, l = this._letters.length; i < l; i++) {
		(function (i) {
			window.setTimeout (function () {
				var letterValue = value.substr (i, 1) || '';
				me._letters[i].setValue (letterValue);
			}, 20 * i + Math.random () * 400);
		})(i);
	}
};








DepartureBoard.Letter = function () {	
	this._element = document.createElement ('span');
	this._element.className = 'letter';

	this._bottom = document.createElement ('span');
	this._bottom.className = 'flap bottom';
	this._element.appendChild (this._bottom);
	
	this._bottomText = document.createElement ('span');
	this._bottomText.className = 'text';
	this._bottom.appendChild (this._bottomText);


	this._top = document.createElement ('span');
	this._top.className = 'flap top';
	this._element.appendChild (this._top);
	
	this._topText = document.createElement ('span');
	this._topText.className = 'text';
	this._top.appendChild (this._topText);
	

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
	this._interval = window.setInterval (function () { me._tick (); }, 150);
};




DepartureBoard.Letter.prototype.setValue = function (value) {
	this._stopAt = DepartureBoard.LETTERS.indexOf (value);
	if (this._stopAt < 0) this._stopAt = 0;

	if (!this._interval && this._index != this._stopAt) this.spin (false);
};




DepartureBoard.Letter.prototype._tick = function () {
	var me = this,
		oldValue = DepartureBoard.LETTERS.charAt (this._index),
		fallingStyle = this._falling.style,
		fallingTextStyle = this._fallingText.style,
		newValue;
	

	this._index = (this._index + 1) % DepartureBoard.LETTERS.length;
	newValue = DepartureBoard.LETTERS.charAt (this._index);

	this._fallingText.innerHTML = oldValue;
	fallingStyle.display = 'block';
	
	this._topText.innerHTML = newValue;

	window.setTimeout (function () {
		fallingTextStyle.WebkitTransitionTimingFunction = fallingTextStyle.MozTransitionTimingFunction = 'ease-in';
		fallingTextStyle.WebkitTransform = fallingTextStyle.MozTransform ='scaleY(0)';
	}, 1);
	

	window.setTimeout (function () {
		me._fallingText.innerHTML = newValue;
	
		fallingStyle.top = '-.03em';
		fallingStyle.bottom = 'auto';
		fallingTextStyle.top = '-.65em';
		
		fallingTextStyle.WebkitTransitionTimingFunction = fallingTextStyle.MozTransitionTimingFunction = 'ease-out';
		fallingTextStyle.WebkitTransform = fallingTextStyle.MozTransform = 'scaleY(1)';
	}, 50);
	
	
	window.setTimeout (function () {
		me._bottomText.innerHTML = newValue;
		fallingStyle.display = 'none';

		fallingStyle.top = 'auto';
		fallingStyle.bottom = 0;
		fallingTextStyle.top = 0;		
	}, 100);
	

	if (this._index === this._stopAt) {
		clearInterval (this._interval);
		delete this._interval;
	}
};

