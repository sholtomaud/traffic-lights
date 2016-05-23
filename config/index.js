module.exports = {
    tableDimensions : {
            "sw": { "x":0, "y":0 },
            "nw": { "x":0, "y":5 },
            "ne": { "x":5, "y":5 },
            "se": { "x":5, "y":0 }
    },
    tableEval : {
            "sw": { "x":">=", "y":">=" },
            "nw": { "x":">=", "y":"<=" },
            "ne": { "x":"<=", "y":"<=" },
            "se": { "x":"<=", "y":">=" }
    },
    validDirections: {
        "north": {  
            "y" : 1, 
            "x" : 0
        },
        "south" :{  
            "x" : 0, 
            "y" : -1 
        },
        "east" : {  
            "x" : 1,
            "y" : 0
        },
        "west" : {  
            "y" : 0,
            "x" : -1
        }
    },
    validTurn:{
         "north": {  
            "left" : "west", 
            "right" : "east"
        },
        "south" :{  
            "left" : "east", 
            "right" : "west"
        },
        "east" : {  
            "left" : "north", 
            "right" : "south"
        },
        "west" : {  
            "left" : "south", 
            "right" : "north"
        }
    }
}