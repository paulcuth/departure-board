

var DepartureBoard = function (element, options) {
	options = options || {};
	
	this._element = element;
	this._letters = [];
	
	element.className += ' departure-board';

	var rowCount = options.rowCount || 1,
		letterCount = options.letterCount || 25,
		letter,
		rowElement;
	
	for (var r = 0; r < rowCount; r++) {
		this._letters.push ([]);

		rowElement = document.createElement ('div');
		rowElement.className = 'row';
		element.appendChild (rowElement);
		
		for (var l = 0; l < letterCount; l++) {
			letter = new DepartureBoard.Letter ();
			this._letters[r].push (letter);
			rowElement.appendChild (letter.getElement ());
		}
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
	if (!(value instanceof Array)) value = [value];
	var me = this;

	for (var r = 0, rl = this._letters.length; r < rl; r++) {
		value[r] = value[r]? value[r].toUpperCase () : '';
	
		for (var i = 0, l = this._letters[r].length; i < l; i++) {
			(function (r, i) {
				window.setTimeout (function () {
					var letterValue = value[r].substr (i, 1) || '';
					me._letters[r][i].setValue (letterValue);
				}, 2000 * r + 25 * i + Math.random () * 400);
			})(r, i);
		}
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

	this._fallingText.style.WebkitTransitionDuration = this._fallingText.style.MozTransitionDuration = 
		this._fallingText.style.OTransitionDuration = this._fallingText.style.transitionDuration = DepartureBoard.Letter.DROP_TIME * 0.5 + 'ms';

	this._falling.appendChild (this._fallingText);
	
	
	this._index = 0;
	this._interval = null;
	this._stopAt = null;
};


DepartureBoard.Letter.DROP_TIME = 100;




DepartureBoard.Letter.prototype.getElement = function () {
	return this._element;
};




DepartureBoard.Letter.prototype.spin = function (clear) {
	if (clear !== false) this._stopAt = null;
	
	var me = this;	
	this._interval = window.setInterval (function () { me._tick (); }, DepartureBoard.Letter.DROP_TIME * 1.1);
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
		fallingTextStyle.WebkitTransitionTimingFunction = fallingTextStyle.MozTransitionTimingFunction = fallingTextStyle.OTransitionTimingFunction = fallingTextStyle.transitionTimingFunction = 'ease-in';
		fallingTextStyle.WebkitTransform = fallingTextStyle.MozTransform = fallingTextStyle.OTransform = fallingTextStyle.transform = 'scaleY(0)';
	}, 1);


	window.setTimeout (function () {
		me._fallingText.innerHTML = newValue;

		fallingStyle.top = '-.03em';
		fallingStyle.bottom = 'auto';
		fallingTextStyle.top = '-.65em';
		
		fallingTextStyle.WebkitTransitionTimingFunction = fallingTextStyle.MozTransitionTimingFunction = fallingTextStyle.OTransitionTimingFunction = fallingTextStyle.transitionTimingFunction = 'ease-out';
		fallingTextStyle.WebkitTransform = fallingTextStyle.MozTransform = fallingTextStyle.OTransform = fallingTextStyle.transform = 'scaleY(1)';
	}, DepartureBoard.Letter.DROP_TIME / 2);

	
	window.setTimeout (function () {
		me._bottomText.innerHTML = newValue;
		fallingStyle.display = 'none';

		fallingStyle.top = 'auto';
		fallingStyle.bottom = 0;
		fallingTextStyle.top = 0;		
	}, DepartureBoard.Letter.DROP_TIME);
	

	if (this._index === this._stopAt) {
		clearInterval (this._interval);
		delete this._interval;
	}
};

