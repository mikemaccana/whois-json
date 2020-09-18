const os = require('os'),
	log = console.log.bind(console),
	changeCase = require('change-case'),
	htmlEntities = require('html-entities').XmlEntities;

const DELIMITER = ':';
const JPRS_DATABASE_HEADER = '[ JPRS database provides information on network administration. Its use is    ]';

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

var normaliseJprsData = function (data) {
	// Normalise square bracketed keys to use colon delimiter, i.e. [Domain Name] => Domain Name:
	var output = data.replace(/^\[([ \w]+)\]/gm, '$1:');
	// Remove empty fields
	output = output.replace(/^[ \w]+: *$/gm, '');
	return output;
}

var parseRawData = function(rawData) {
	
	var result = {};	
	
	rawData = stripHTMLEntitites(rawData)

	if (rawData.startsWith(JPRS_DATABASE_HEADER)) {
		rawData = normaliseJprsData(rawData);
	}

	rawData = rawData.replace(/:\s*\r\n/g, ': ');
	var lines = rawData.split('\n');
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

module.exports = parseRawData;
