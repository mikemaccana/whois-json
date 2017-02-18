var whois = require('node-whois');
var changeCase = require('change-case');
var os = require('os');

require('es6-shim')

var log = console.log.bind(console);

function parseRawData(rawData) {
    var result = {};
    var lines = rawData.split(os.EOL);

    lines.forEach(function(line){
        line = line.trim();
        if ( line && line.includes(': ') ) {
            var lineParts = line.split(':');

            // greater than since lines often have more than one colon, eg values with URLS
            if ( lineParts.length >= 2 ) {
                var keyName = changeCase.camelCase(lineParts[0]);
                if ( !(keyName in result) )
                  result[keyName] = [];
                result[keyName].push(lineParts.splice(1).join(':').trim());
            }
        }
    });

    return result;
}

module.exports = function(domain, options, cb, filterData){

    if ( typeof cb === 'undefined' && typeof options === 'function' ) {
        cb = options;
        options = {};
    }

    whois.lookup(domain, options, function(err, rawData) {

        if ( err ) {
            return cb(err, null);
        }
		if( typeof filterData === 'function' ) {
			rawData = filterData(rawData);
		}
        var result = {};

        if ( typeof rawData == 'object' ) {
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


