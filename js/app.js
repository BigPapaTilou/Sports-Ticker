// Sports Ticker Main Application


let currentGames = [];



async function updateSports(){


    try {


     const games = await getAllScores();


const relevantGames =
filterRelevantGames(games);


currentGames = relevantGames;


checkAlerts(relevantGames);


renderGames(relevantGames);


    }

    catch(error){


        console.error(
            "Update error:",
            error
        );


    }


}





function startApp(){


    console.log(
        "Sports Ticker Started"
    );



    updateSports();



    // Mise à jour scores

    setInterval(()=>{


        updateSports();



    },30000);



    // démarrage animation

    setTimeout(()=>{


        startTicker();



    },1000);


}





window.onload = startApp;
