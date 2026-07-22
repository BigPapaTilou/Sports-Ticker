// Sports Ticker Renderer


function createScoreCard(game){


    const card = document.createElement("div");

    card.className = "score-card";



    const league = document.createElement("div");

    league.className = "league";

    league.textContent = game.league;



    const awayLogo = document.createElement("img");

    awayLogo.className = "team-logo";

    awayLogo.src =
    game.away.logo || "";



    const homeLogo = document.createElement("img");

    homeLogo.className = "team-logo";

    homeLogo.src =
    game.home.logo || "";



    const awayName = document.createElement("span");

    awayName.className = "team-name";

    awayName.textContent =
    getTeamShort(game.away.name);



    const homeName = document.createElement("span");

    homeName.className = "team-name";

    homeName.textContent =
    getTeamShort(game.home.name);



    const score = document.createElement("span");

    score.className = "score";

    score.textContent =

    `${game.away.score} - ${game.home.score}`;



    const status = document.createElement("span");

    status.className =
    "status";



    status.textContent =
    game.clock
    ? `${game.status} ${game.clock}`
    : game.status;



    if(
        game.status.includes("Final")
    ){

        status.classList.add("final");

    }

    else if(

        game.status.includes("Scheduled")

    ){

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



    if(!games.length){


        ticker.innerHTML =

        `
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
