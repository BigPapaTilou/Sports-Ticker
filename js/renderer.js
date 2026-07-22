// Sports Ticker Renderer


function createScoreCard(game){


    const card = document.createElement("div");

    card.className = "score-card";



    const league = document.createElement("div");

    league.className = "league";

    league.textContent = game.league || "";



    const awayLogo = document.createElement("img");

    awayLogo.className = "team-logo";

    awayLogo.src = game.away?.logo || "";



    const homeLogo = document.createElement("img");

    homeLogo.className = "team-logo";

    homeLogo.src = game.home?.logo || "";



    const awayName = document.createElement("span");

    awayName.className = "team-name";

    awayName.textContent =
    getTeamShort(game.away?.name || "");



    const homeName = document.createElement("span");

    homeName.className = "team-name";

    homeName.textContent =
    getTeamShort(game.home?.name || "");




    const score = document.createElement("span");

    score.className = "score";

    score.textContent =
    `${game.away?.score || 0} - ${game.home?.score || 0}`;




    const status = document.createElement("span");

    status.className = "status";

    status.textContent =
    getGameStatus(game);



    const gameStatus =
    game.status || "";



    if(gameStatus.includes("Final")){

        status.classList.add("final");

    }

    else if(gameStatus.includes("Scheduled")){

        status.classList.add("upcoming");

    }

    else {

        status.classList.add("live");

    }




    card.appendChild(league);

    card.appendChild(awayLogo);

    card.appendChild(awayName);

    card.appendChild(score);

    card.appendChild(homeLogo);

    card.appendChild(homeName);

    card.appendChild(status);



    return card;


}





function renderGames(games){


    const ticker =
    document.getElementById("ticker");



    ticker.innerHTML = "";



    if(!games || !games.length){


        ticker.innerHTML = `

        <div class="score-card">

        Aucun match disponible

        </div>

        `;


        return;

    }



    games.forEach(game=>{


        const card =
        createScoreCard(game);


        ticker.appendChild(card);


    });


}





function getGameStatus(game){


    const state =
    game.raw
    ?.competitions?.[0]
    ?.status
    ?.type
    ?.state;




    if(state === "in"){


        return (
            "LIVE " +
            (game.clock || "")
        );


    }




    if(state === "post"){


        return "FINAL";


    }




    if(state === "pre"){


        const date =
        new Date(game.raw.date);



        return (

            date.toLocaleDateString(
                "fr-FR",
                {
                    day:"2-digit",
                    month:"short"
                }
            )

            +

            " "

            +

            date.toLocaleTimeString(
                "fr-FR",
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            )

        );


    }



    return game.status || "";

}
