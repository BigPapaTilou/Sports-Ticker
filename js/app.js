// Sports Ticker Main Application


let currentGames = [];



async function updateSports(){


    try {


const games = await getAllScores();


const now = new Date();


const limit = new Date(
    now.getTime() + 48 * 60 * 60 * 1000
);



let relevantGames = games.filter(game => {


    const date =
    new Date(game.raw.date);



    const state =
    game.raw.competitions[0]
    ?.status
    ?.type
    ?.state;



    // Toujours garder les matchs en direct

    if(state === "in"){

        return true;

    }



    // Garder uniquement les matchs à venir dans 48h

    if(state === "pre"){

        return (
            date >= now &&
            date <= limit
        );

    }



    return false;


});

try {

    relevantGames =
    filterRelevantGames(games);

}

catch(error){

    console.log(
        "Filter disabled:",
        error
    );

}



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
