// Sports Ticker Main Application


let currentGames = [];


let priorityGameId = null;

let priorityTimeout = null;





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




        // Mise en priorité du match qui vient de scorer

        const scoringGame =

        filteredGames.find(
            game => game.scoringTeam
        );



        if(scoringGame){


            priorityGameId =
            scoringGame.id;



            clearTimeout(
                priorityTimeout
            );



            priorityTimeout =

            setTimeout(()=>{


                priorityGameId = null;


            },8000);


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
