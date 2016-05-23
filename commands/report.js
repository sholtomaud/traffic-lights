var debug = require('debug')('robo:report');

module.exports = function (state, options, callback){
    var str = '';
    for (var p in state) {
        if (state.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(state[p]) + '\n';
        }
    }
    callback(null, state, str);
}
