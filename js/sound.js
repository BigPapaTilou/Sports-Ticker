let soundEnabled = false;


const scoreSound = new Audio(
    "sounds/score.mp3"
);



function initSound(){


    const button =

    document.getElementById(
        "sound-toggle"
    );



    if(!button){

        return;

    }




    soundEnabled =

    localStorage.getItem(
        "soundEnabled"
    ) === "true";



    updateSoundButton();





    button.onclick = ()=>{


        soundEnabled =
        !soundEnabled;



        localStorage.setItem(
            "soundEnabled",
            soundEnabled
        );



        updateSoundButton();


    };


}







function updateSoundButton(){


    const button =

    document.getElementById(
        "sound-toggle"
    );



    if(!button){

        return;

    }



    button.textContent =

    soundEnabled

    ? "🔊"

    : "🔇";


}







function playScoreSound(){


    if(!soundEnabled){

        return;

    }



    scoreSound.currentTime = 0;

    scoreSound.play();


}
