
(function () {

	
	var Generator = function (element) {
		var $element = $(element);

		this._yql = $element.attr ('data-yql');
		this._tagName = $element.attr ('data-tag-name');
		this._board = new DepartureBoard ($element.find ('p.result')[0], { letterCount: 30 });		
	};


	
	
	Generator.prototype.go = function (name) {
		var me = this,
			url = this._yql.replace (':name:', name);

		$.getJSON (url, function (data) {
			if (data && data.query && data.query.results && data.query.results.postresult && data.query.results.postresult[me._tagName]) { 
				me._board.setValue (data.query.results.postresult[me._tagName].content || data.query.results.postresult[me._tagName]);
			}
		});
	};
	
	


	var generators = [],
		generatorElements = document.getElementsByClassName ('generator'),
		i, l;
		
	for (i = 0, l = generatorElements.length; i < l; i++) {
		generators.push (new Generator (generatorElements[i]));
	}


	$('button').click (function () {
		var name = document.getElementById ('name').value,
			i, l;

		for (i = 0, l = generators.length; i < l; i++) {
			generators[i].go (name);
		}
	})
			
		
			
	
})();