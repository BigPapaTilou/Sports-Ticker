// Sports Ticker Animation Engine


let tickerPosition = 0;

let tickerSpeed = 1.2;

let tickerElement = null;

let animationStarted = false;






function startTicker(){


    tickerElement =
    document.getElementById("ticker");



    if(!tickerElement){

        return;

    }





    createInfiniteLoop();



    if(!animationStarted){


        animationStarted = true;


        animateTicker();


    }


}







function createInfiniteLoop(){


    // éviter les duplications multiples

    if(
        tickerElement.dataset.cloned === "true"
    ){

        return;

    }





    const items =

    Array.from(
        tickerElement.children
    );





    items.forEach(item=>{


        const clone =
        item.cloneNode(true);


        tickerElement.appendChild(
            clone
        );


    });





    tickerElement.dataset.cloned = "true";


}








function animateTicker(){



    tickerPosition -= tickerSpeed;





    const halfWidth =

    tickerElement.scrollWidth / 2;







    if(
        Math.abs(tickerPosition)
        >=
        halfWidth
    ){


        // reset invisible

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
