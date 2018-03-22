var os = require('os'),
	log = console.log.bind(console),
	changeCase = require('change-case'),
	htmlEntities = require('html-entities').XmlEntities;

function parseRawData(rawData) {

	var result = {};	
	
	// Parse HTML Entities
	let entities = new htmlEntities();
	rawData = entities.decode(rawData);
	
	// Handle .co.uk edge case where newline follows key (e.g. Registrant: \r\n google \r\n\r\n)
	rawData = rawData.replace(/:\s*\r\n/g, ': ');
	var lines = rawData.split('\n');
	
	lines.forEach(function(line){
	
		line = line.trim();
		// colon space because that's the standard delimiter - not ':' as that's used in eg, http links
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