// Sports Ticker Main Application


let currentGames = [];



async function updateSports(){


    try {


        const games = await getAllScores();



        currentGames = games;



        checkAlerts(games);



        renderGames(games);



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
