const htmlEntities = require('html-entities').XmlEntities

class Helpers {
	static stripHTMLEntitites = function (rawData) {
		const entities = new htmlEntities()
		return entities.decode(rawData)
	}
}

module.exports = Helpers
