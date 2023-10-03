// Elements (DOM)
const btnStart = document.getElementById("start--btn");
const btnTeam = document.getElementById("team--btn");

const sectionStart = document.getElementById("start-section");
const sectionTeam = document.getElementById("team-section");
const sectionCounter = document.getElementById("counter-section");
const sectionScore = document.getElementById("score-section");

const characters = document.querySelectorAll(".select-container");
const transition = document.querySelector(".fade-transition");
let clock = document.getElementById("seconds");

const teamNameElement0 = document.getElementById('team--name-0');
const teamNameElement1 = document.getElementById('team--name-1');
const scoreElement0 = document.querySelector('.score--value-0');
const scoreElement1 = document.querySelector('.score--value-1');

var characterArray = {
    character1: {
        name: "Pepe der Frosch!",
        id: "character1",
        imgSrc: "./assets/images/profile/meditate.jpg",
    },
    character2: {
        name: "Kabosu!",
        id: "character2",
        imgSrc: "./assets/images/profile/good_boi.jpg",
    },
    character3: {
        name: "EMOTIONAL DAMAGE!",
        id: "character3",
        imgSrc: "./assets/images/profile/emotional_damage.jpg",
    },
    character4: {
        name: "The Power of GOD and ANIME!",
        id: "character4",
        imgSrc: "./assets/images/profile/god_and_anime.jpg",
    },
    character5: {
        name: "Shrek",
        id: "character5",
        imgSrc: "./assets/images/profile/Shrek.jpg",
    },
    character6: {
        name: "Essential Crisis",
        id: "character6",
        imgSrc: "./assets/images/profile/pikachu.jpg",
    },
};




// Starting Condition
let scoreValue0 = 0;
scoreElement0.textContent = scoreValue0.toString();
let scoreValue1 = 0;
scoreElement1.textContent = scoreValue1.toString();

let selectedCharacters = [];
let teamNames = [];
const teamImages = [];



// FUNCTIONS
function selectCharacter(characterId) {
    const characterImage = document.getElementById(characterId);
    const playerId = characterId.split('-')[0];
    selectedCharacters[playerId] = characterImage.src;
    alert(`Player ${playerId} selected character: ${characterImage.alt}`);
}
function startGame() {

}
function sectionTransition(oldSection, newSection){
    oldSection.classList.add("hidden");
    newSection.classList.remove("hidden");
}
function countdown(){
    let secondsRemaining = 3;
    clock.innerText = secondsRemaining;
    clock.classList.add("animation");
    const myInterval = setInterval(() => {
        secondsRemaining--;
        clock.innerText = secondsRemaining;
        if (!secondsRemaining) {
            stopAnimation();
        }
        if (secondsRemaining === 0){
            setTimeout(function() {
                sectionCounter.classList.add("hidden");
                sectionScore.classList.remove("hidden");
            }, 1000);
        }
    }, 1000);
    function stopAnimation() {
        clock.classList.remove("animation");
        clearInterval(myInterval);
    }
}
function saveTeamNames(nameEl1, nameEl2){
    let names = new Array(2);
    names[0] = nameEl1.value;
    names[1] = nameEl2.value;
    return names;
}

function setProfil(namesArr, imageArr){
    //score--name score--img-container
    const names = document.querySelectorAll(".score--name");
    const images = document.querySelectorAll(".score--img");

    for(let i = 0; i < names.length; i++){
        names[i].innerHTML = namesArr[i];
        images[i].src = imageArr[i];
    }

}




// TODO: Make "generatedHtml" to a dynamic function
// GENERATE HTML
let generatedHtml = Object.keys(characterArray).reduce(
    (accum, currKey) =>
        accum +
        `<div id="${characterArray[currKey].id}" class="character" data-name="${characterArray[currKey].id}" rel="${characterArray[currKey].name}" onclick="${characterArray[currKey].id}">
    <img class="character__img" src="${characterArray[currKey].imgSrc}" />
    <p class="character__name" ">${characterArray[currKey].name}</p>
  </div>`,
    ""
);
characters.forEach((element) => element.innerHTML = generatedHtml);
/*
let team1 = document.querySelector('.select-container-01').length > 0;
let team2 = document.querySelector('.select-container-02').length > 0;
 */


// CHARACTER SELECTION:
const characterList = document.querySelectorAll(".character");
characterList.forEach((character) => {
    character.addEventListener("click", () => {
        let container = character.parentNode;
        const containerId = container.className.split('_')[1];

        for (let i = 0; i < character.childNodes.length; i++) {
            if (character.childNodes[i].className == "character__img") {
                let imageUrl = [];
                imageUrl[containerId] = character.childNodes[i].src.split('/').slice(4, 8).join('/');
                teamImages[containerId] = './' + imageUrl[containerId];
            }
        }
        if (container.querySelector(".character.active")) {
            container.querySelector(".character.active").classList.remove("active");
        }
        character.classList.add("active");
    });
});





// EVENTLISTENER

// Start Button
console.log(sectionCounter);
btnStart.addEventListener("click", function () {
    sectionTransition(sectionStart,sectionTeam);
});

// Team Button
btnTeam.addEventListener("click", function () {
    // Save Team Name
    teamNames = saveTeamNames(teamNameElement0, teamNameElement1);
    console.log(teamNames);

    // Save Team Image (each fighter)
    if (teamImages.length !== 2) {
        alert('Both players must select characters before starting the game! Please select a name');
    }else if(teamNames.length !== 2){
        alert('Both players must select a name before starting the game! Please select a name');
    } else {
        console.log('Selected Characters:', teamImages);
    }

    //transition
    sectionTransition(sectionTeam,sectionCounter);
    transition.classList.remove("hidden");
    // Counter
    countdown();

    setProfil(teamNames, teamImages);
});











