var config = require('^config'),
    tableDimensions = config.tableDimensions,
    tableEval = config.tableEval,
    debug = require('debug')('robo:validPosition'),
    errors = require('^errors');
    
module.exports = function (x,y, callback){
    var err = {};
    err.error = errors.outOfBounds;
    err.msg = validate(x,y);

    debug('Validating position for x: ' + x +', y:' + y);

    if( err.msg ){ 
        debug( errors.invalidPosition );
        callback( err, errors.invalidPosition );
    } 
    else {
        debug( errors.validPosition ); 
        callback(null, errors.validPosition);
    }
}

function validate(x,y){
    var msg = null;
    for (edge in tableDimensions ){
        var evalX = x + ' '+ tableEval[edge].x + ' '+ tableDimensions[edge].x;
        var evalY = y + ' '+ tableEval[edge].y + ' '+ tableDimensions[edge].y;

        if  ( !eval (evalX) ) {
            msg += '\nFor the ' + edge + ' corner, x must be ' + tableEval[edge].x + ' ' + tableDimensions[edge].x + ', you gave ' + x;
        }

        if (  !eval ( evalY ) ) {
            msg += '\nFor the ' + edge + ' corner, y must be ' + tableEval[edge].y + ' ' + tableDimensions[edge].y + ', you gave ' + y;
            
        }
    }
    return msg; 
}