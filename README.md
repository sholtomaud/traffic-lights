# traffic-lights [![Build Status](https://travis-ci.org/shotlom/traffic-lights.svg?branch=master)](https://travis-ci.org/shotlom/traffic-lights)

Basic traffic-lights example for Node.js recruiters

## Mission

Create a Node.js application that simulates a set of traffic lights at an intersection and provide unit tests for all logic.

**NOTE** for simulation purposes the 5min traffic light change has been scaled to one day. 

## Install Procedure

You need Node.js, npm, & nvm. 

shotlom-traffic-lights-demo is built and tested on node v4.1, so 

```bash
    nvm i 4.1
    nvm use 4.1
    npm i shotlom-traffic-lights-demo
```

## Run Procedure

```bash
    cd shotlom-traffic-lights-demo
    npm run
```

**Testing**

Run `npm test`, to run tape tests.

**Debugging**

Run `npm run debug`, to run in debugging mode.

## Functional Requirements

- [ ] The lights must change automatically every 5 minutes.
- [ ] The traffic light must switch from green to red
- [ ] When switching from green to red, the yellow light must be displayed for 30 seconds prior to it switching to red
- [ ] When switching from red to green, the yellow light must be displayed for 30 seconds prior to it switching to green
- [ ] Light changes between 9am and 9:30am must be output

## Constraints

* The traffic lights are designated (N, S) and (E, W) like a compass.

### COMMANDS
- [ ] push 
- [ ] 
- [ ] 

#### push
Will simulate a pedestrian pushing the pedestrian button