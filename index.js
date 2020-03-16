// Externals
const util = require('util')
const whois = require('whois')

// Internal Libs
const parseRawData = require('./lib/parse-raw-data.js')

const lookup = util.promisify(whois.lookup)

module.exports = async function (domain, options) {

	const rawData = await lookup(domain, options || {})

	let result = {}

	if (typeof rawData === 'object') {
		result = rawData.map(function (data) {
			data.data = parseRawData(data.data)
			return data
		})
	} else {
		result = parseRawData(rawData)
	}

	return result
}


