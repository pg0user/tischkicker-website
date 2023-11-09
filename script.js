// Elements (DOM)
const sectionStart = document.getElementById("start-section");
const sectionTeam = document.getElementById("team-section");
const sectionCounter = document.getElementById("counter-section");
const sectionScore = document.getElementById("score-section");
const sectionWinner = document.getElementById("winner-section");

const characters = document.querySelectorAll(".select-container");
const transition = document.querySelector(".fade-transition");
let clock = document.getElementById("seconds");

const teamNameElement0 = document.getElementById('team--name-0');
const teamNameElement1 = document.getElementById('team--name-1');

let scoreValueEl0 = document.getElementById('score--value-0');
let scoreValueEl1 = document.getElementById('score--value-1');

let scores = document.querySelectorAll(`.values`);


var characterArray = {
    character1: {
        name: "Pepe der Frosch!",
        id: "character1",
        imgSrc: "./assets/images/profile/kermit2.png",
    },
    character2: {
        name: "Kabosu!",
        id: "character2",
        imgSrc: "./assets/images/profile/kabuso.png",
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
        name: "SUS",
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
scoreValueEl0.textContent = scoreValue0.toString();
let scoreValue1 = 0;
scoreValueEl1.textContent = scoreValue1.toString();

let selectedCharacters = [];
let teamNames = [];
let teamImages = [];
let playing = true;


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

// FUNCTIONS
function sectionTransition(oldSection, newSection){
    oldSection.classList.add("hidden");
    newSection.classList.remove("hidden");
}
function selectCharacter(characterId) {
    const characterImage = document.getElementById(characterId);
    const playerId = characterId.split('-')[0];
    selectedCharacters[playerId] = characterImage.src;
    alert(`Player ${playerId} selected character: ${characterImage.alt}`);
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

function checkIfWon(score, element){
    let elementId = element.charAt(element.length-1);
    if(score === 10){

        console.log(elementId);
        console.log(teamNames[elementId]);
        console.log(teamImages[elementId]);
        document.querySelector('.winner--name').textContent = `Team ${teamNames[elementId]}`;
        document.querySelector('.winner--img').src = teamImages[elementId];
        sectionTransition(sectionScore, sectionWinner);
    }
}
function goal(teamid){
    if(teamid === 0){
        scoreValue0++;
        document.getElementById(`score--value-${teamid}`).textContent = scoreValue0.toString();
        checkIfWon(scoreValue0, 'scoreValue0');
    }else if(teamid === 1){
        scoreValue1++;
        document.getElementById(`score--value-${teamid}`).textContent = scoreValue1.toString();
        checkIfWon(scoreValue1, 'scoreValueEl1');
    }else{
        console.log('An Error occurred at line 70')
    }
}
function resetGame(){
    scoreValue0 = 0;
    scoreValue1 = 0;
    scoreValueEl0.textContent = 0;
    scoreValueEl1.textContent = 0;


    document.getElementById('team--name-0').value = '';
    document.getElementById('team--name-1').value = '';
    document.querySelectorAll(".character").forEach((character) => {
        if(character.classList.contains('active')){
            character.classList.remove('active');
        }
    });

    selectedCharacters = [];
    teamNames = [];
    teamImages = [];
    playing = true;
    sectionTransition(sectionWinner, sectionStart);
}

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


// Start Button
document.getElementById("start--btn").addEventListener("click", function () {
    sectionTransition(sectionStart,sectionTeam);
});

// Team Button
document.getElementById("team--btn").addEventListener("click", function () {
    // Save Team Name
    teamNames = saveTeamNames(teamNameElement0, teamNameElement1);
    console.log(teamNames);

    // Save Team Image (each fighter)
    if (teamNames.length !== 2 || (teamNames[0] === '' || teamNames[1] === '')) {
        alert('Beide Spieler müssen einen Teamnamen auswählen um spielen zu können! Bitte wähle deinen Teamnamen aus:');
    }else if(teamImages.length !== 2){
        alert('Beide Spieler müssen einen Charakter auswählen um spielen zu können! Bitte wähle deinen Charakter aus:');
    }else if(teamNames.length !== 2 && teamImages.length !== 2){
        alert('Beide Spieler müssen einen Teamnamen und einen Charakter auswählen um spielen zu können! Bitte wähle deinen Teamnamen und Charakter aus:');
    } else {
        //transition
        sectionTransition(sectionTeam,sectionCounter);
        transition.classList.remove("hidden");
        // Counter
        countdown();
        setProfil(teamNames, teamImages);
    }
});







