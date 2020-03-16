const specialStructureConfig = [
	{ name: 'JPRS Database', patterns: ['JPRS', 'whois.jprs.jp'], delimiter: ']', remove: '/\[' }
]

const matchAll = (string, patterns) => {
	return patterns.every(pattern => string.includes(pattern))
}

const specialParse = (rawData) => {
	for (const config of specialStructureConfig) {
		if (matchAll(rawData, config.patterns)) {
			return config
		}
	}
}

module.exports = {
	specialParse
}
