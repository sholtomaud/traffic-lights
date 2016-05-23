var fastn = require('^fastn'),
    debug = require('debug')('traffic-lights:index'),
    start = new Date("2016-01-01T00:00:00"),
    startMil = start.getTime(),
    h = start.getHours(), 
    m = ( '00' + + Math.floor( start.getMinutes() )).slice(-2) ,
    _time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM'),
    now = 0,
    fiveMin = 1000 * 60 * 5,
    thirtySec = 1000 * 30,
    starter;

var lightsModel = new fastn.Model({
    startingLight: 'red',
    currentLight: 'red',
    log : [],
    green: 'green-off',
    orange: 'orange-off',
    red: 'red-on',
    lightStyles : {   
        green: { 
            green: 'green-on', 
            orange: 'orange-off',
            red: 'red-off'
        },
        orange: { 
            green: 'green-off', 
            orange: 'orange-on',
            red: 'red-off'
        },
        red: { 
            green: 'green-off', 
            orange: 'orange-off',
            red: 'red-on'
        }
    }
});

var timeModel = new fastn.Model({
    hours: '00',
    minutes: '00',
    startTime: _time,
    currentTime: startMil,
    elapsedTime: 0,
    fiveMinCounter: fiveMin,
    thirtySecCounter: thirtySec,
    timeIncrement: 1
});

lightsModel.on('.|*',function(data){
    // console.log(data.currentLight);
})

timeModel.on('.|*',function(data){
    //console.log(data);
    // if ( Number ( data.fiveMinCounter ) < 0 ) {
    //     changeLights();
    //     // console.log('counter', data);
    //     timeModel.update({
    //         fiveMinCounter : fiveMin   
    //     })
    // }
})

var timeData = timeModel.get('.'),
        nextTime = timeData.currentTime + ( timeData.timeIncrement * 60000 ),
        timeUpdate = new Date(nextTime);

        timeModel.update({
            fiveMinCounter : timeData.fiveMinCounter - 10000, 
            currentTime: nextTime
        })

function changeLights(){
    var lightsData = lightsModel.get('.'),
        startingLight = lightsData.startingLight,
        lightStyles = lightsData.lightStyles,
        nextLight, 
        lightsStatus = {};

    if ( lightsData.currentLight == 'orange' ){
        nextLight = ( startingLight == 'green' )? 'red' : 'green';
        
        startingLight = nextLight;
    }
    else {
        nextLight = 'orange'; 
    }
    
    // console.log(lightStyles, nextLight);

    lightsModel.update({
        startingLight: startingLight,
        currentLight: nextLight,
        green: lightStyles[nextLight]['green'],
        orange: lightStyles[nextLight]['orange'],
        red: lightStyles[nextLight]['red']
        
    })
}

var interval = 1000;

function updateElapsedTime(){
    var timeData = timeModel.get('.'),
        nextTime = timeData.currentTime + ( timeData.timeIncrement * 60000 ),
        timeUpdate = new Date(nextTime);

        timeModel.update({
            fiveMinCounter : timeData.fiveMinCounter - 10000, 
            currentTime: nextTime
        })

        if ( ! ( timeUpdate.getMinutes() % 5 ) ) changeLights();
            // console.log('timeupdate', timeUpdate.getMinutes() );
        timeModel.update({
            hours: ('00' + Math.floor( timeUpdate.getHours() ) ).slice(-2),
            minutes: ( '00' + Math.floor( timeUpdate.getMinutes() ) ).slice(-2), 
            seconds: ('00' + Math.floor( timeUpdate.getSeconds() ) ).slice(-2) 
        });
}


function startLights(){
    starter  = ( ! starter  ) ? setInterval(updateElapsedTime, interval) : null;
}

function stopLights(){
    starter = clearTimeout(starter);
}

var app = fastn('div', {class: 'page'},
        fastn('div', {class: 'page-title'},'Traffic light'),
        fastn('div', {class: 'container'},
            fastn('div', {class: 'time'}, 
                'Time increment (min)',
                fastn('input',{
                    value: fastn.binding('timeIncrement'),
                    onkeyup: 'value:value'
                }),
                'Start Time',
                fastn('input',{
                    value: fastn.binding('startTime')
                }).on('change',function(event,scope){
                    console.log('scope',scope.get('.'));
                        
                    timeModel.update({
                          startTime: scope.get('startTime')
                        });
                 }),
                fastn('div', {class: 'time-buttons'},
                    fastn('button', 'Start Lights')
                    .on('click',function(event,scope){
                        startLights( scope.get('timeIncrement') )
                    }).attach(timeModel),
                    fastn('button', 'Stop Lights')
                    .on('click',function(event,scope){
                        stopLights();
                    })
                )
            ).attach(timeModel),
            fastn('div', {class: 'trafficLight-container'},
                'Current Simulation Time',
                fastn('div', {class: 'stopwatch'},
                    fastn('label', fastn.binding('hours') ),
                    ':',
                    fastn('label', fastn.binding('minutes') )

                    // ,
                    // ':',
                    // fastn('label', fastn.binding('seconds') )
                    
                ).attach(timeModel),
                fastn('div', {class: 'trafficLight'},
                    fastn('div', {class: fastn.binding('green') }),
                    fastn('div', {class: fastn.binding('orange') }),
                    fastn('div', {class: fastn.binding('red') })
                ).attach(lightsModel),
                fastn('button', 'Change lights')
                .on('click',function(event,scope){
                    changeLights()
                })
            )
        ),
        fastn('div',  {class: 'log-container'},
            '9am to 9:30am Log',
            fastn('list', {
                class: 'log-items',
                items: fastn.binding('log|*'),
                template: function( model ){
                    return  fastn('label', fastn.binding('item.name'));
                }
            })
            .attach(lightsModel)
        )
        
    );

module.exports = function(){
    
    return app;
}