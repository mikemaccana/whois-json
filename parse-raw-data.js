const os = require('os'),
log = console.log.bind(console),
changeCase = require('change-case'),
htmlEntities = require('html-entities').XmlEntities;

const REGEX = "\:( ){0,1}";
const DELIMITER = ':';
const BLOCKSTART = '# start';
const BLOCKEND = '# end';

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
	return delimiter + " ";
}

var parseRawData = function(rawData) {

	var result = {};	
	result.records = [];
	rawData = stripHTMLEntitites(rawData)
	rawData = rawData.replace(/:\s*\r\n/g, ': ');
	var lines = rawData.split('\n');
	var delimiter = DELIMITER;//getCommonDelimiterForm(rawData, DELIMITER);
	var previousKey = ""; 
	var mulvalResult = {}
	var mulvalStatus = false;
	
	lines.forEach(function(line){
		line = line.trim() + ' ';
		// colon space because that's the standard delimiter - not ':' as that's used in eg, http links
		if (line.includes(BLOCKSTART)){
			mulvalStatus = true;
		}
		
		if (line.includes(BLOCKEND)){
			mulvalStatus = false;
			result.records.push(mulvalResult);
			mulvalResult = {};
		}
		
		var regValue = line.match(REGEX)
		if ( line && regValue !== null && regValue[1] !== undefined ) {
			var lineParts = line.split(DELIMITER);
			// 'Greater than' since lines often have more than one colon, eg values with URLs
			if ( lineParts.length >= 2 ) {
				var key = changeCase.camelCase(lineParts[0]),
				value = lineParts.splice(1).join(DELIMITER).trim()
				previousKey = key;
				// If multiple lines use the same key, combine the values
				if (mulvalStatus == false) {
					if ( key in result ) {
						result[key] = `${result[key]} ${value}`;
						return
					}
					result[key] = value;	
				} else if (mulvalStatus == true) {
					if ( key in mulvalResult ) {
						mulvalResult[key] = `${mulvalResult[key]} ${value}`;
						return
					}
					mulvalResult[key] = value;	
				}
			} else if (lineParts.length == 1) {
				if (mulvalStatus == false) {
					var key = changeCase.camelCase(lineParts[0])
					previousKey = key;
					// If multiple lines use the same key, combine the values
					result[key] = "";
				} else if (mulvalStatus == true) {
					var key = changeCase.camelCase(lineParts[0])
					previousKey = key;
					// If multiple lines use the same key, combine the values
					mulvalResult[key] = "";
				}
			}
		} else {
			if (mulvalStatus == false) {
				if ( previousKey in result ) {
					result[previousKey] = `${result[previousKey]} ${line.trim()}`;
					return;
				}
			} else if (mulvalStatus == true) {
				if ( previousKey in mulvalResult ) {
					mulvalResult[previousKey] = `${mulvalResult[previousKey]} ${line.trim()}`;
					return;
				}
			}
		}
	});
	return result;
}

module.exports = parseRawData;
