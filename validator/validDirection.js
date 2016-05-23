var config = require('^config'),
    errors = require('^errors'),
    debug = require('debug')('robo:validDirection'),
    err = {};

module.exports = function (direction, callback){
    err.error =errors.invalidDirection;
    err.msg = '\nPlease choose from: ' +  Object.keys(config.validDirections).join(', '); 
    
    debug('Validation direction: ' + direction);

    if ( ! ( direction in config.validDirections ) ) {
        debug('Invalid direction');
        callback(err) ;
    }  
    else { 
        debug('Valid direction');
        callback(null,'Direction valid');
    }
}


