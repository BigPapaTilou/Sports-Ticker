// Sports Ticker Filters


function filterRelevantGames(games){


    const now = new Date();


    const limit = new Date(
        now.getTime() + 48 * 60 * 60 * 1000
    );



    return games.filter(game => {


        const gameDate = new Date(
            game.raw?.date
        );



        const state =
        game.raw
        ?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        // Match en direct

        if(state === "in"){

            return true;

        }



        // Match à venir dans les 48h

        if(state === "pre"){

            return (
                gameDate >= now &&
                gameDate <= limit
            );

        }



        return false;


    })


    .sort((a,b)=>{


        return (
            new Date(a.raw.date)
            -
            new Date(b.raw.date)
        );


    });


}
