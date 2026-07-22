// Sports Ticker Live Alerts


let previousGames = {};



function checkAlerts(games){


    games.forEach(game => {


        const oldGame =
        previousGames[game.id];



        if(oldGame){


            const oldTotal =

            Number(oldGame.home.score)

            +

            Number(oldGame.away.score);



            const newTotal =

            Number(game.home.score)

            +

            Number(game.away.score);



            if(newTotal > oldTotal){


                showAlert(game);


                highlightScore(game.id);


                highlightTLS();


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





function highlightScore(id){


    const cards =
    document.querySelectorAll(
        ".score-card"
    );



    cards.forEach(card=>{


        if(card.dataset.id == id){


            card.classList.add(
                "score-update"
            );



            setTimeout(()=>{


                card.classList.remove(
                    "score-update"
                );


            },1000);



        }


    });


}




function highlightTLS(){


    const tls =
    document.getElementById(
        "tls-logo"
    );



    if(!tls){

        return;

    }



    tls.classList.add(
        "tls-alert"
    );



    setTimeout(()=>{


        tls.classList.remove(
            "tls-alert"
        );


    },1000);


}
