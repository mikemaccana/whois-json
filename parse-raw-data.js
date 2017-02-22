var os = require('os'),
	log = console.log.bind(console),
	changeCase = require('change-case');

function parseRawData(rawData) {

	var result = {};
	var lines = rawData.split('\n');

	lines.forEach(function(line){

		line = line.trim();
		if ( line && line.includes(': ') ) {
			var lineParts = line.split(':');

			// 'Greater than' since lines often have more than one colon, eg values with URLs
			if ( lineParts.length >= 2 ) {
				var key = changeCase.camelCase(lineParts[0]),
					value = lineParts.splice(1).join(':').trim()

				// If multiple lines use the same key, combine the values
				if ( key in result ) {
					result[key] = `${result[key]} ${value}`;
					return
				}
				result[key] = value;
			}
		}
	});

	return result;
}

module.exports = parseRawData