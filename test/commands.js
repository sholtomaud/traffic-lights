require('rooty')('./');

var test = require('tape'),
    errors = require('^errors'),
    commands = require('^commands'),
    config = require('^config'),
    testData = require('./testData.json');

test('left', function(t){
    t.plan(8);

    commands.left( testData.northStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'west');
    });
    
    commands.left( testData.westStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
    
    commands.left( testData.southStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.left( testData.eastStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });
});
    
test('right', function(t){
    t.plan(8);

    commands.right( testData.northStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.right( testData.westStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });
    
    commands.right( testData.southStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'west');
    });
    
    commands.right( testData.eastStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
});

test('move', function(t){
    t.plan(4);
    
    commands.move( testData.northStatePlaced, testData.validOptions, function(err, newPosition, msg ){
            t.equal(err.error, errors.outOfBounds);
    });
    commands.move( testData.eastStatePlaced, testData.validOptions, function(err, newPosition, msg ){
            t.equal(err.error, errors.outOfBounds);
    });
    commands.move( testData.southStatePlaced, testData.validOptions, function(err, newPosition, msg ){
            t.equal(err.error, errors.outOfBounds);
    });
    commands.move( testData.westStatePlaced, testData.validOptions, function(err, newPosition, msg ){
            t.equal(err.error, errors.outOfBounds);
    });

});

test('place', function(t){
    t.plan(4);

    commands.place(testData.stateNotPlaced, testData.validOptions, function(err, newPlace, msg ){
            t.equal(err, null);
    });

    commands.place(testData.stateNotPlaced, testData.invalidOptions,  function(err, newPlace, msg ){
            t.equal(err.error, errors.invalidOptions);
    });

    commands.place(testData.stateNotPlaced, testData.invalidPosition,  function(err, newPlace, msg ){
            t.equal(err.error, errors.outOfBounds);
    });

    commands.place(testData.stateNotPlaced, testData.invalidFacing,  function(err, newPlace, msg ){
            t.equal(err.error, errors.invalidDirection);
    });
});

test('report', function(t){
    t.plan(3);

    var str = '';
    for (var p in testData.statePlaced) {
        if (testData.statePlaced.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(testData.statePlaced[p]) + '\n';
        }
    }

    commands.report( testData.statePlaced, testData.validOptions, function(err, state, msg ){
            t.equal(err, null);
            t.deepEqual(state, testData.statePlaced );
            t.deepEqual(msg, str );
    });
});
