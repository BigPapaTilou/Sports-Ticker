// Sports Ticker API
// ESPN unofficial endpoints


const ESPN_API = {

    nfl:
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",

    ncaa:
    "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",

    mlb:
    "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",

    premierleague:
    "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",

};






function getDateList(){


    const dates = [];


    const today = new Date();




    for(let i = 0; i <= 1; i++){


        const date = new Date();


        date.setDate(
            today.getDate() - i
        );



        dates.push(

            date
            .toISOString()
            .slice(0,10)
            .replaceAll("-","")

        );


    }



    return dates;


}







async function fetchSport(url, league){


    try {



        const dates = getDateList();



        let events = [];





        for(const date of dates){



            const response =

            await fetch(

                url +
                "?dates=" +
                date

            );



            const data =

            await response.json();




            events.push(

                ...(data.events || [])

            );



        }






        return parseGames(

            events,

            league

        );



    }


    catch(error){


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

        game.competitions?.[0];



        const competitors =

        competition?.competitors || [];



        const home =

        competitors.find(

            team =>
            team.homeAway === "home"

        );



        const away =

        competitors.find(

            team =>
            team.homeAway === "away"

        );




        return {


            league: league,


            id: game.id,



            date:

            game.date,



            status:

            competition
            ?.status
            ?.type
            ?.description || "",



            clock:

            competition
            ?.status
            ?.displayClock || "",





            home: {


                name:

                home
                ?.team
                ?.displayName || "",



                logo:

                home
                ?.team
                ?.logo || "",



                score:

                home?.score || "0"


            },





            away: {


                name:

                away
                ?.team
                ?.displayName || "",



                logo:

                away
                ?.team
                ?.logo || "",



                score:

                away?.score || "0"


            },





            raw:

            game



        };


    });


}








async function getAllScores(){


    const [

        nfl,

        ncaa,

        mlb,

        premierleague

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

            ESPN_API.premierleague,

            "PREMIER LEAGUE"

        )



    ]);





    return [


        ...nfl,

        ...ncaa,

        ...mlb,

        ...premierleague


    ];


}
