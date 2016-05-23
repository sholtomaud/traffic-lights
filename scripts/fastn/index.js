module.exports = require('fastn')({
    _generic: require('fastn/genericComponent'),
    templater: require('fastn/templaterComponent'),
    list: require('fastn/listComponent'),
    text: require('fastn/textComponent')
}, true);