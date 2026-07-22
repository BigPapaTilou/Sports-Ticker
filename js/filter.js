// Sports Ticker Filters


function filterRelevantGames(games){


    const now = new Date();


    const limit = new Date(
        now.getTime() + 48 * 60 * 60 * 1000
    );



    return games

    .filter(game => {


        const gameDate =
        new Date(game.date);



        const state =
        game.raw
        ?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        // Match live

        if(state === "in"){

            return true;

        }



        // Match terminé

        if(state === "post"){

            return false;

        }



        // Match programmé dans les 48h

        if(state === "pre"){


            return (
                gameDate >= now &&
                gameDate <= limit
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



        if(stateA === "in" && stateB !== "in"){

            return -1;

        }


        if(stateB === "in" && stateA !== "in"){

            return 1;

        }



        return (
            new Date(a.date)
            -
            new Date(b.date)
        );


    });


}
