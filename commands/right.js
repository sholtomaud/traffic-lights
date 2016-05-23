var config = require('^config'),
    debug = require('debug')('robo:right');
            
module.exports = function (currentState, options, callback){
    var newState = Object.create(currentState);
    var newDirection = config.validTurn[currentState.direction].right;
    var msg = 'Direction now: ' + newDirection;             
    newState.direction = newDirection;
    callback(null, newState, msg);
}