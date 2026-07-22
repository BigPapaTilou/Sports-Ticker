// Sports Ticker Filters


function filterRelevantGames(games){


    const now = new Date();


    const limit = new Date(
        now.getTime() + 48 * 60 * 60 * 1000
    );



    return games

    .filter(game => {


        const date =
        new Date(game.raw?.date);



        const state =
        game.raw
        ?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        // Matchs en direct

        if(state === "in"){

            return true;

        }



        // Matchs à venir dans les 48h

        if(state === "pre"){

            return (
                date >= now &&
                date <= limit
            );

        }



        return false;


    })


    .sort((a,b)=>{


        const stateA =
        a.raw
        ?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        const stateB =
        b.raw
        ?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        // LIVE en premier

        if(stateA === "in" && stateB !== "in"){

            return -1;

        }


        if(stateB === "in" && stateA !== "in"){

            return 1;

        }



        return (
            new Date(a.raw.date)
            -
            new Date(b.raw.date)
        );


    });


}
