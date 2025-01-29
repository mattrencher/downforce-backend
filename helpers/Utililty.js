const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

exports.getTeamname() = () => {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: ' ',
        style: 'capital'
      })
}