var whois = require('node-whois'),
	log = console.log.bind(console),
	parseRawData = require('./parse-raw-data.js')

module.exports = function(domain, options, cb){

	if ( typeof cb === 'undefined' && typeof options === 'function' ) {
		cb = options;
		options = {};
	}

	whois.lookup(domain, options, function(err, rawData) {

		if ( err ) {
			return cb(err, null);
		}

		var result = {};

		if ( typeof rawData === 'object' ) {
			result = rawData.map(function(data) {
				data.data = parseRawData(data.data);
				return data;
			});
		} else {
			result = parseRawData(rawData);
		}

		cb(null, result);
	});
}


