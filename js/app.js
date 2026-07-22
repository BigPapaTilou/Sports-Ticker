// Sports Ticker Main Application


let currentGames = [];


let priorityGameId = null;

let priorityTimeout = null;


let lastScoreUpdate = null;


let refreshTimer = null;






async function updateSports(){


    try {


        const games = await getAllScores();



        let filteredGames = games;



        try {


            filteredGames =
            filterRelevantGames(games);



        }

        catch(error){


            console.error(
                "Filter error:",
                error
            );


            filteredGames = games;


        }





        currentGames = filteredGames;



        checkAlerts(filteredGames);





        // Détection dernier score

        const scoringGame =

        filteredGames.find(
            game => game.scoringTeam
        );



        if(scoringGame){


            lastScoreUpdate = {


                id: scoringGame.id,


                time: Date.now()


            };


        }





        // Gestion priorité temporaire

        if(lastScoreUpdate){


            const elapsed =

            Date.now()
            -
            lastScoreUpdate.time;



            if(elapsed < 8000){


                priorityGameId =
                lastScoreUpdate.id;


            }

            else {


                priorityGameId = null;


            }


        }





        filteredGames =
        sortGamesPriority(filteredGames);





        renderGames(filteredGames);



    }


    catch(error){


        console.error(
            "Sports update error:",
            error
        );


    }


}








function sortGamesPriority(games){


    return games.sort((a,b)=>{





        // Score récent prioritaire

        if(a.id === priorityGameId){

            return -1;

        }


        if(b.id === priorityGameId){

            return 1;

        }







        function getPriority(game){


            const state =

            game.raw
            ?.competitions?.[0]
            ?.status
            ?.type
            ?.state;





            // LIVE

            if(state === "in"){

                return 1;

            }




            // FINAL

            if(state === "post"){

                return 2;

            }




            // À venir

            if(state === "pre"){

                return 3;

            }




            return 4;


        }







        const priorityA =
        getPriority(a);



        const priorityB =
        getPriority(b);







        // LIVE > FINAL > PRE

        if(priorityA !== priorityB){


            return priorityA - priorityB;


        }







        // FINAL : plus récents en premier

        if(priorityA === 2){


            return (

                new Date(b.raw.date)

                -

                new Date(a.raw.date)

            );


        }







        // LIVE : garder l'ordre actuel

        if(priorityA === 1){


            return 0;


        }







        // Matchs à venir : chronologique

        return (

            new Date(a.raw.date)

            -

            new Date(b.raw.date)

        );


    });


}








function getRefreshDelay(){


    // Score récent détecté

    if(lastScoreUpdate){


        const elapsed =

        Date.now()
        -
        lastScoreUpdate.time;



        if(elapsed < 30000){


            return 5000;


        }


    }






    // Présence de matchs LIVE

    const liveGames =

    currentGames.filter(game=>{


        const state =

        game.raw?.competitions?.[0]
        ?.status?.type?.state;



        return state === "in";


    });





    if(liveGames.length > 0){


        return 15000;


    }






    // Aucun live

    return 60000;


}








function startAutoRefresh(){


    if(refreshTimer){


        clearTimeout(refreshTimer);


    }





    refreshTimer =

    setTimeout(async ()=>{


        await updateSports();


        startAutoRefresh();



    }, getRefreshDelay());



}








function startApp(){


    console.log(
        "Sports Ticker Started"
    );



    updateSports();



    startAutoRefresh();




    setTimeout(()=>{


        startTicker();



    },1000);


}







window.onload = startApp;
