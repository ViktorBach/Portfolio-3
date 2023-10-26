    const holes = document.querySelectorAll(".hole");
    const scoreBoard = document.querySelector(".score");
    const moles = document.querySelectorAll(".mole");
    const startBtn = document.querySelector(".start-button");
    const rulesButton = document.querySelector(".rules-button");
    const rulesModal = document.querySelector(".modal");
    const closeRules = document.querySelector(".close");

    let lastHole;
    let timeUp = false;
    let score = 0;
    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const randomNumber = Math.floor(Math.random() * holes.length);
        const hole = holes[randomNumber];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }


    function peep(show, hide) {
        const time = randomTime(show, hide);
        const hole = randomHole(holes);
        hole.classList.add("up");
        setTimeout(() => {
            hole.classList.remove("up");
            if (!timeUp) {
                peep(show, hide);
            }
        }, time);
    }

    function startGame() {
        let show, hide;
        const difficulty = document.getElementById("difficulty").options.selectedIndex
        if (difficulty === 0) {
            show = 500;
            hide = 1500;
        } else if (difficulty === 1) {
            show = 400;
            hide = 1250;
        } else {
            show = 250
            hide = 800
        }
        scoreBoard.textContent = 0;
        timeUp = false;
        startBtn.innerHTML = "running..";
        startBtn.disabled = true;
        score = 0;
        peep(show, hide);
        setTimeout(() => {
            timeUp = true;
            startBtn.innerHTML = "start!";
            startBtn.disabled = false;
        }, 15000);
    }

    function hitTheMole(e) {
        if (!e.isTrusted) {
            return;
        }
        score++;
        this.parentNode.classList.remove("up");
        scoreBoard.textContent = score;
    }

    moles.forEach((mole) => mole.addEventListener("click", hitTheMole));

    rulesButton.addEventListener('click', () => {
        rulesModal.style.display = 'block';
    })

    closeRules.addEventListener('click', () => {
        rulesModal.style.display = 'none';
    })