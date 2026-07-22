// Sports Ticker Teams Database


const TEAM_CONFIG = {


    // NFL

    "Kansas City Chiefs": {

        short: "KC",

        color: "#E31837"

    },


    "Buffalo Bills": {

        short: "BUF",

        color: "#00338D"

    },


    "Dallas Cowboys": {

        short: "DAL",

        color: "#041E42"

    },


    "Philadelphia Eagles": {

        short: "PHI",

        color: "#004C54"

    },


    "San Francisco 49ers": {

        short: "SF",

        color: "#AA0000"

    },



    // NCAA

    "Georgia Bulldogs": {

        short: "UGA",

        color:"#BA0C2F"

    },


    "Alabama Crimson Tide": {

        short:"ALA",

        color:"#9E1B32"

    },


    "Ohio State Buckeyes": {

        short:"OSU",

        color:"#BB0000"

    },


    "Texas Longhorns": {

        short:"TEX",

        color:"#BF5700"

    },



    // MLB


    "New York Yankees": {

        short:"NYY",

        color:"#132448"

    },


    "Los Angeles Dodgers": {

        short:"LAD",

        color:"#005A9C"

    },


    "Boston Red Sox": {

        short:"BOS",

        color:"#BD3039"

    },


    "New York Mets": {

        short:"NYM",

        color:"#002D72"

    }


};





function getTeamShort(name){


    return TEAM_CONFIG[name]?.short

    || name.substring(0,3).toUpperCase();


}



function getTeamColor(name){


    return TEAM_CONFIG[name]?.color

    || "#333";


}
