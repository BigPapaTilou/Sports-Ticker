// Sports Ticker Main Application


let currentGames = [];


let priorityGameId = null;

let priorityTimeout = null;


let lastScoreUpdate = null;





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





        // Détection du dernier score

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






        // Gestion de la priorité temporaire

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






        // Réorganisation temporaire

        if(priorityGameId){


            filteredGames.sort((a,b)=>{


                if(a.id === priorityGameId){

                    return -1;

                }



                if(b.id === priorityGameId){

                    return 1;

                }



                return 0;


            });


        }





        renderGames(filteredGames);



    }


    catch(error){


        console.error(
            "Sports update error:",
            error
        );


    }


}







function startApp(){


    console.log(
        "Sports Ticker Started"
    );



    updateSports();



    setInterval(()=>{


        updateSports();



    },30000);



    setTimeout(()=>{


        startTicker();



    },1000);


}





window.onload = startApp;
