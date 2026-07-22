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





        // =====================
        // Match en direct
        // =====================

        if(state === "in"){

            return true;

        }





        // =====================
        // Match à venir 48h
        // =====================

        if(state === "pre"){


            return (

                gameDate >= now

                &&

                gameDate <= limit

            );


        }





        // =====================
        // Match terminé
        // Garder 24h après le début
        // =====================

        if(state === "post"){



            const hoursSinceStart =

            (

                now - gameDate

            )

            /

            (1000 * 60 * 60);




            return hoursSinceStart <= 12;


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







        // =====================
        // 1 - LIVE en premier
        // =====================

        if(
            stateA === "in"
            &&
            stateB !== "in"
        ){

            return -1;

        }



        if(
            stateB === "in"
            &&
            stateA !== "in"
        ){

            return 1;

        }







        // =====================
        // 2 - FINAL avant PRE
        // =====================

        if(
            stateA === "post"
            &&
            stateB === "pre"
        ){

            return -1;

        }



        if(
            stateB === "post"
            &&
            stateA === "pre"
        ){

            return 1;

        }







        // =====================
        // 3 - FINAL récents
        // du plus récent au plus ancien
        // =====================

        if(
            stateA === "post"
            &&
            stateB === "post"
        ){


            return (

                new Date(b.raw.date)

                -

                new Date(a.raw.date)

            );


        }







        // =====================
        // 4 - Matchs à venir
        // ordre chronologique
        // =====================

        return (

            new Date(a.raw.date)

            -

            new Date(b.raw.date)

        );


    });


}
