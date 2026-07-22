// Sports Ticker Live Alerts


let previousGames = {};



function checkAlerts(games){


    games.forEach(game => {


        const oldGame =
        previousGames[game.id];



        if(oldGame){


            const oldScore =

            Number(oldGame.home.score)

            +

            Number(oldGame.away.score);



            const newScore =

            Number(game.home.score)

            +

            Number(game.away.score);



            if(newScore > oldScore){


                showAlert(game);

            }


        }



        previousGames[game.id] = game;


    });


}





function showAlert(game){


    const zone =
    document.getElementById(
        "alert-zone"
    );


    if(!zone){

        return;

    }



    zone.innerHTML =

    `

    <div class="alert">

    🚨 SCORE UPDATE 🚨

    <br>

    ${getTeamShort(game.away.name)}
    ${game.away.score}

    -

    ${getTeamShort(game.home.name)}
    ${game.home.score}

    </div>

    `;



    setTimeout(()=>{


        zone.innerHTML="";


    },5000);



}
