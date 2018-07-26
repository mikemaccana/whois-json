var util = require('util'),
	whois = require('whois')
	log = console.log.bind(console),
	parseRawData = require('./parse-raw-data.js')

var lookup = util.promisify(whois.lookup);

module.exports = async function(domain, options){

	var rawData = await lookup(domain, options || {})

	var result = {};

	if ( typeof rawData === 'object' ) {
		result = rawData.map(function(data) {
			data.data = parseRawData(data.data);
			return data;
		});
	} else {
		// let parsed = parseRawData(rawData);
		// console.log(parsed);
		// for (var i = parsed.length - 1; i >= 0; i--) {
		// 		result = parsed[i];
		// }
		result = parseRawData(rawData);
	}

	return result;
}
