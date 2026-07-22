// Sports Ticker Filters - Debug


function filterRelevantGames(games){


    console.log(
        "TOTAL GAMES :",
        games.length
    );



    games.forEach(game => {


        console.log(

            game.league,

            game.home?.name,

            game.date,

            game.raw?.date

        );


    });



    return games;


}
