var config = require('^config'),
    kgo = require('kgo'),
    validator = require('^validator'),
    debug = require('debug')('robo:move');

module.exports = function (currentState, options, callback){
    var newState = Object.create(currentState),
        newPosition = {};
        newPosition.x = new Number (currentState.position.x),
        newPosition.y = new Number (currentState.position.y);
    
    kgo
        ('move', function( done ){
            newPosition.x += new Number(config.validDirections[currentState.direction].x);
            newPosition.y += new Number(config.validDirections[currentState.direction].y);
            done(null,newPosition);
        })    
        ('validatePosition',['move'], function( newPosition, done ){
            validator.validPosition( newPosition.x, newPosition.y, function(error, msg ){
                done(error, msg);
            })
        })
        ('updatePosition',['!validatePosition'], function(){
            var msg = 'Position now: ' + JSON.stringify( newPosition);             
            newState.position = newPosition;
            callback(null, newState, msg);
        })
        (['*'], function(err){
            callback(err) ;
        })
}