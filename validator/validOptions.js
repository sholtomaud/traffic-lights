var config = require('^config'),
    errors = require('^errors'),
    debug = require('debug')('robo:validOptions'),
    err = {};

module.exports = function (cmd, options, callback){
    err.error = errors.invalidOptions;
    err.msg = '\nYou need to place robo with 3 options. x & y positions and a direction\nE.g. robo >place 1,2,north';

    debug('Validating options for cmd: ' + cmd);

    if ( cmd == 'place' && options.length != 3 ) {
        debug('Invalid options');
        callback(err, cmd);
    } 
    else {
        debug('Valid options');
        callback(null, cmd);
    }
    
}
