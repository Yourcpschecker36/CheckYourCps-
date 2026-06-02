let clicks = 0;
let selectedTime = 5;
let started = false;

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

const modal =
document.getElementById("resultModal");

const finalClicks =
document.getElementById("finalClicks");

const finalCps =
document.getElementById("finalCps");

const closeModal =
document.getElementById("closeModal");

loadBest();

function setTime(time){
    selectedTime = time;
}

clickArea.addEventListener("click", function(){

    if(!started){
        startTest();
        return;
    }

    clicks++;
    clicksEl.textContent = clicks;

});

function startTest(){

    started = true;

    clicks = 0;

    clicksEl.textContent = "0";
    cpsEl.textContent = "0.00";

    clickArea.innerHTML =
    "<h2>⏳ " +
    selectedTime +
    "s Running...</h2><p>Click Fast!</p>";

    setTimeout(function(){

        started = false;

        let cps =
        (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML =
        "<h2>🔥 CLICK TO START</h2>";

        updateBest(cps);

        finalClicks.textContent = clicks;
        finalCps.textContent = cps;

        modal.style.display = "flex";

    }, selectedTime * 1000);

}

function loadBest(){

    let best =
    localStorage.getItem("bestCPS");

    if(best){
        bestEl.textContent = best;
    }else{
        bestEl.textContent = "0.00";
    }

}

function updateBest(cps){

    let best =
    localStorage.getItem("bestCPS");

    if(
        !best ||
        parseFloat(cps) >
        parseFloat(best)
    ){

        localStorage.setItem(
            "bestCPS",
            cps
        );

        bestEl.textContent = cps;

    }

}

closeModal.addEventListener(
    "click",
    function(){

        modal.style.display = "none";

    }
);

function submitScore(){

    let username =
    document
    .getElementById("username")
    .value
    .trim();

    if(username === ""){
        return;
    }

    console.log(
        "Username:",
        username,
        "CPS:",
        cpsEl.textContent
    );

}
