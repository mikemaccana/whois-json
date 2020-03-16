const Helpers = require('./helpers')
const { specialParse } = require('./identify-special-structures')

const changeCase = require('change-case')

// Configs
let BASE_DELIMITER = ':'

//Checks whether a delimiter followed by a space common in this result
const getCommonDelimiterForm = function (rawData, delimiter) {
	const delimiterPattern = new RegExp(delimiter + '\\S+', 'g')
	const delimiterWSpacePattern = new RegExp(delimiter + ' ', 'g')
	const delimiterMatches = rawData.match(delimiterPattern) || []
	const delimiterWSpaceMatches = rawData.match(delimiterWSpacePattern) || []

	if (delimiterMatches.length > delimiterWSpaceMatches.length) {
		return delimiter
	}
	return delimiter + ' '
}

const parseRawData = function (rawData) {

	const result = {}

	rawData = Helpers.stripHTMLEntitites(rawData)
	rawData = rawData.replace(/:\s*\r\n/g, ': ')

	const lines = rawData.split('\n')

	let delimiter = getCommonDelimiterForm(rawData, BASE_DELIMITER)

	const specialParseConfig = specialParse(rawData)

	if (specialParseConfig) {
		// A special structure was detected on this Whois Raw Data
		delimiter = specialParseConfig.delimiter
		BASE_DELIMITER = delimiter
	}

	lines.forEach(function (line) {

		line = line.trim()

		// colon space because that's the standard delimiter - not ':' as that's used in eg, http links
		if (line && line.includes(delimiter)) {
			const lineParts = line.split(BASE_DELIMITER)

			// 'Greater than' since lines often have more than one colon, eg values with URLs
			if (lineParts.length >= 2) {
				const key = changeCase.camelCase(lineParts[0]),
					value = lineParts.splice(1).join(BASE_DELIMITER).trim()

				// If multiple lines use the same key, combine the values
				if (key in result) {
					result[key] = `${result[key]} ${value}`
					return
				}
				result[key] = value
			}
		}
	})

	return result
}

module.exports = parseRawData
