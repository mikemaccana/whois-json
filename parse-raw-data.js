const os = require('os'),
	log = console.log.bind(console),
	changeCase = require('change-case'),
	htmlEntities = require('html-entities').XmlEntities;

const DELIMITER = ':';

var stripHTMLEntitites = function(rawData){
	var entities = new htmlEntities();
	return entities.decode(rawData);
}

//Checks whether a delimiter followed by a space common in this result
var getCommonDelimiterForm = function(rawData, delimiter) {
	var delimiterPattern = new RegExp(delimiter + '\\S+', 'g');
	var delimiterWSpacePattern = new RegExp(delimiter + ' ', 'g');
	var delimiterMatches = rawData.match(delimiterPattern) || [];
	var delimiterWSpaceMatches = rawData.match(delimiterWSpacePattern) || [];

	if (delimiterMatches.length > delimiterWSpaceMatches.length) {
		return delimiter;
	}
	return delimiter + ' ';
}

var parseRawData = function(rawData) {

	var result = [];

	rawData = stripHTMLEntitites(rawData)
	rawData = rawData.replace(/:\s*\r\n/g, ': ');
	var lines = rawData.split('\n');

	entry = {};
	var delimiter = getCommonDelimiterForm(rawData, DELIMITER);

	lines.forEach(function(line){

		line = line.trim();

		// colon space because that's the standard delimiter - not ':' as that's used in eg, http links
		if ( line && line.includes(delimiter) ) {
			var lineParts = line.split(DELIMITER);

			// 'Greater than' since lines often have more than one colon, eg values with URLs
			if ( lineParts.length >= 2 ) {
				var key = changeCase.camelCase(lineParts[0]),
					value = lineParts.splice(1).join(DELIMITER).trim()

				// If multiple lines use the same key, combine the values
				if ( key in entry ) {
					entry[key] = `${entry[key]} ${value}`;
					return
				}
				entry[key] = value;
			}
		}
		if (line == '# end') {
			result.push(entry);
			entry = {};
		}
	});

	if (result.length == 0) {
		// only one result, push it
		result.push(entry);
	} else {
		result.sort(function (a, b) {
			// Sort Dsc  " > -1 "
			// Sort Asc  " < -1 "
			if (a.netHandle > b.netHandle) {
				return -1;
			}
			if (a.netHandle < b.netHandle) {
				return 1;
			}

			// names must be equal
			return 0;
		});
	}

	return result;
}

module.exports = parseRawData;
