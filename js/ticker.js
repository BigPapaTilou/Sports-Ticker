// Sports Ticker Animation Engine


let tickerPosition = 0;

let tickerSpeed = 1.2;

let tickerElement = null;



function startTicker(){


    tickerElement =
    document.getElementById("ticker");



    if(!tickerElement){

        return;

    }



    // duplication pour créer une boucle infinie

    tickerElement.innerHTML +=
    tickerElement.innerHTML;



    animateTicker();

}





function animateTicker(){


    tickerPosition -= tickerSpeed;



    const halfWidth =
    tickerElement.scrollWidth / 2;



    if(
        Math.abs(tickerPosition) >= halfWidth
    ){

        tickerPosition = 0;

    }



    tickerElement.style.transform =

    `translate3d(${tickerPosition}px,0,0)`;



    requestAnimationFrame(
        animateTicker
    );


}





function setTickerSpeed(speed){


    tickerSpeed = speed;


}
