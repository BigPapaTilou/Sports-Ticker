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






        // Match terminé : garder 3 heures

        if(state === "post"){


            const hoursSinceEnd =

            (
                now - gameDate
            )

            /

            (1000 * 60 * 60);



            return hoursSinceEnd <= 3;


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





        // Puis les matchs récents terminés

        if(stateA === "post" && stateB !== "post"){

            return 1;

        }


        if(stateB === "post" && stateA !== "post"){

            return -1;

        }





        return (
            new Date(a.raw.date)
            -
            new Date(b.raw.date)
        );


    });


}
