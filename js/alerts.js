// Sports Ticker Live Alerts


let previousGames = {};



// Vérification des changements de score

function checkAlerts(games){


    games.forEach(game => {


        const oldGame =
        previousGames[game.id];



        if(oldGame){


            const oldHome =
            Number(oldGame.home.score || 0);


            const newHome =
            Number(game.home.score || 0);



            const oldAway =
            Number(oldGame.away.score || 0);


            const newAway =
            Number(game.away.score || 0);



            const oldTotal =
            oldHome + oldAway;



            const newTotal =
            newHome + newAway;



            if(newTotal > oldTotal){


                const scoringTeam =
                getScoringTeam(
                    oldGame,
                    game
                );



                game.scoringTeam =
                scoringTeam;



                showAlert(game);


                highlightScore(game.id);


                highlightTLS();


            }


        }



        previousGames[game.id] = game;


    });


}






// Affichage alerte

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


        zone.innerHTML = "";


    },5000);



}






// Flash de la carte concernée

function highlightScore(id){


    const cards =

    document.querySelectorAll(
        ".score-card"
    );



    cards.forEach(card => {



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






// Animation logo TLS

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






// Détermine quelle équipe a marqué

function getScoringTeam(oldGame, newGame){


    const oldHome =
    Number(oldGame.home.score || 0);


    const newHome =
    Number(newGame.home.score || 0);



    const oldAway =
    Number(oldGame.away.score || 0);


    const newAway =
    Number(newGame.away.score || 0);



    if(newHome > oldHome){

        return "home";

    }



    if(newAway > oldAway){

        return "away";

    }



    return null;


}
