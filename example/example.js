
(function () {
	
	var generators = [];
	
	$('.generator').each (function () {

		var $this = $(this),
			generator = {
				yql: $this.attr ('data-yql'),
				element: $this.attr ('data-element'),
				board: new DepartureBoard ($this.find ('p.result')[0], { letterCount: 30 }),
				go: function () {
					var me = this;
					$.getJSON (this.yql, function (data) {
						console.log (data, me.element);
						if (data && data.query && data.query.results && data.query.results.postresult && data.query.results.postresult[me.element]) { 
							me.board.setValue (data.query.results.postresult[me.element].content || data.query.results.postresult[me.element]);
						}
					});
				}
			};
		
		generators.push (generator);
		generator.go ();
	});
			
		
		
		
	
		
	
})();