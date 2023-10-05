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
const scoreElements = document.querySelector('.score--value');
const scoreElement0 = document.querySelector('.score--value-0');
const scoreElement1 = document.querySelector('.score--value-1');

let characterArray = {
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

class Game {
    constructor() {
        this._isPlaying = false;
    }

}

class Team {
    constructor(name = '', char = null, score = 0, scoreText = '0') {
        this._name = name;
        this._char = char;
        this._score = score;
        this._scoreText = scoreText;
        this._scoreElement = null;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get char() {
        return this._char;
    }

    set char(value) {
        this._char = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get scoreText() {
        return this._scoreText;
    }

    set scoreText(value) {
        this._scoreText = value;
    }

    get scoreElement() {
        return this._scoreElement;
    }

    set scoreElement(value) {
        this._scoreElement = value;
    }

    goal(){
        this._score++;
        this._scoreText = this._score.toString();
        this._scoreElement.textContent = this._scoreText;
    }

}

const teams = [];

const team1 = new Team();
const team2 = new Team();

teams.push(team1);
teams.push(team2);
console.log(teams);

team1.scoreElement = document.querySelector('.score--value-0');
team2.scoreElement = document.querySelector('.score--value-1');
team1.goal();
team1.char = characterArray.character1;




console.log(team1.char);


// Starting Condition
let scoreValue0 = 0;
scoreElement0.textContent = scoreValue0.toString();
let scoreValue1 = 0;
scoreElement1.textContent = scoreValue1.toString();

let selectedCharacters = [];
let teamNames = [];
const teamImages = [];

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


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
// TODO: EDIT
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    for (let i = 0; i < players.length; i++) {
        players[i].classList.toggle('player--active');
    }
};



// TODO: Make "generatedHtml" to a dynamic function
// GENERATE HTML
let generatedHtml = Object.keys(characterArray).reduce((accum, currKey) => accum +
    `<div id="${characterArray[currKey].id}" class="character" data-name="${characterArray[currKey].id}" rel="${characterArray[currKey].name}" onclick="${characterArray[currKey].id}">
    <img class="character__img" src="${characterArray[currKey].imgSrc}" />
    <p class="character__name" ">${characterArray[currKey].name}</p>
  </div>`,
    ""
);
characters.forEach((element) => element.innerHTML = generatedHtml);

// CHARACTER SELECTION:
const characterList = document.querySelectorAll(".character");
characterList.forEach((character) => {
    character.addEventListener("click", () => {
        let container = character.parentNode;
        const containerId = container.className.split('_')[1];

        if (containerId === '0') {
            team1.char = character;
        } else if (containerId === '1') {
            team2.char = character;
        }

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


// TODO: EDIT
/*
    if (playing) {
        // 1. Add current score to active players score
        scores[activePlayer] += currentScore;
        // 2. Check if players score is >= 100

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            diceEL.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
*/









