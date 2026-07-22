// Sports Ticker Main Application


let currentGames = [];



async function updateSports(){


    try {


        const games = await getAllScores();



        let filteredGames = games;



        try {


            filteredGames = [];

console.log("FORCE EMPTY TEST");



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
