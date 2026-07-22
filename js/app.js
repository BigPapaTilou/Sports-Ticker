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


        if(a.id === priorityGameId){

            return -1;

        }


        if(b.id === priorityGameId){

            return 1;

        }





        const stateA =

        a.raw?.competitions?.[0]
        ?.status
        ?.type
        ?.state;



        const stateB =

        b.raw?.competitions?.[0]
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






        // Matchs à venir avant les terminés

        if(stateA === "pre" && stateB === "post"){

            return -1;

        }



        if(stateB === "pre" && stateA === "post"){

            return 1;

        }






        return new Date(a.raw.date)
        -
        new Date(b.raw.date);


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
