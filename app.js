let container = document.querySelector('#container');
let dino = document.querySelector('#dino');
let block = document.querySelector('#block');
let road = document.querySelector('#road');
let cloud = document.querySelector('#cloud');
let score = document.querySelector('#score');
let gameOver = document.querySelector('#gameOver');
let controls = document.querySelector('#controls');

// Counter and CSS animations

let interval = null;
let playerScore = 0;
const scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score: <b>${playerScore}</b>`
}

window.addEventListener('keydown', (start) => {
    if(start.code == 'Space') {
        gameOver.style.display = 'none';
        block.classList.add('blockActive');
        road.firstElementChild.style.animation = 'animateRoad 1s linear infinite';
        cloud.firstElementChild.style.animation = 'animateCloud 20s linear infinite';
        controls.style.display = 'none';

        let playerScore = 0;
        interval = setInterval(scoreCounter, 100);
    }
})

// Dinosaur jump

window.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowUp' || event.key == 'w') {
        if(dino.classList != 'dinoActive') {
            dino.classList.add('dinoActive');

            // remove class after 0.5s
            setTimeout(() => {
                dino.classList.remove('dinoActive');
            }, 500);
        }
    }
})

// Game Over screen

let result = setInterval(() => {
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
    /* console.log('Dino Bottom: ' + dinoBottom); */

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue('left'));
    /* console.log('Block Left: ' + blockLeft); */

    if(dinoBottom <= 100 && blockLeft >= 20 && blockLeft <= 65) {
        gameOver.innerHTML = `Game Over \n <p>Você bateu ${playerScore} pontos.</p>`
        gameOver.style.display = 'block';
        block.classList.remove('blockActive')
        road.firstElementChild.style.animation = 'none';
        cloud.firstElementChild.style.animation = 'none';

        clearInterval(interval);
        playerScore = 0;
    }
}, 10);

