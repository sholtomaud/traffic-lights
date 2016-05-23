var errors = require('^errors'),
    debug = require('debug')('robo:validCommand'),
    err = {};

module.exports = function (cmd, commands, callback) {
    err.error =errors.invalidCommand;
    err.msg = validCommands(commands);
    
    debug('Validating command' + cmd);
    if ( !( cmd in commands ) ) {
        debug('Command not valid');
        callback( err )
    }
    else{
        debug('Command valid');
        callback(null, cmd) ;
    }  
}

function validCommands (commands) {
    var str = '';

    for (var c in commands) {
        debug('Assembling valid commands: ' + c);
        if (commands.hasOwnProperty(c)) { str += '\n' + c  ; }
    }
    return str;
}
