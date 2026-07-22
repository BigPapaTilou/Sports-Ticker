// Sports Ticker API
// ESPN unofficial endpoints


const ESPN_API = {

    nfl:
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",

    ncaa:
    "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",

    mlb:
    "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",

    soccer:
    "https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard"

};



async function fetchSport(url, league){


    try {


        const response = await fetch(url);


        const data = await response.json();


        return parseGames(
            data.events || [],
            league
        );


    } catch(error){


        console.error(
            "API Error:",
            league,
            error
        );


        return [];


    }


}



function parseGames(events, league){


    return events.map(game => {


        const competition =
            game.competitions[0];


        const competitors =
            competition.competitors || [];



        const home =
            competitors.find(
                team => team.homeAway === "home"
            );


        const away =
            competitors.find(
                team => team.homeAway === "away"
            );



        return {


            league: league,


            id: game.id,


            status:
            competition.status
            ?.type
            ?.description || "",



            clock:
            competition.status
            ?.displayClock || "",



            home: {

                name:
                home?.team?.displayName || "",


                logo:
                home?.team?.logo || "",


                score:
                home?.score || "0"

            },



            away: {

                name:
                away?.team?.displayName || "",


                logo:
                away?.team?.logo || "",


                score:
                away?.score || "0"

            },


            competitors,

            raw:event

        };


    });


}




async function getAllScores(){


    const [

        nfl,

        ncaa,

        mlb,

        soccer


    ] = await Promise.all([


        fetchSport(
            ESPN_API.nfl,
            "NFL"
        ),


        fetchSport(
            ESPN_API.ncaa,
            "NCAA"
        ),


        fetchSport(
            ESPN_API.mlb,
            "MLB"
        ),


        fetchSport(
            ESPN_API.soccer,
            "SOCCER"
        )


    ]);



    return [

        ...nfl,

        ...ncaa,

        ...mlb,

        ...soccer

    ];

}
