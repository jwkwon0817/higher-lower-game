function gameStart(list, obj) {
    const maxScore = document.querySelector('.max-score > h3');
    maxScore.innerHTML = localStorage.getItem('maxScore') ? localStorage.getItem('maxScore') : 0;

    let current = 0;

    const gameContainer = document.querySelector('.game-container');

    gameContainer.innerHTML = `
        <div class="keyword keyword-quiz-white">
            <h2>${list[current]}</h2>
            <h3>${format(obj[list[current]])}회</h3>
        </div>
        <div class="keyword keyword-quiz-black">
            <h2>${list[current + 1]}</h2>
            <h3 class="current"></h3>

            <div class="quiz-buttons">
                <button class="quiz-button quiz-button-white quiz-button-up">
                    더 많이
                    <img src="assets/arrow_up_white.png" alt="Arrow" class="arrow-up">
                </button>
                <button class="quiz-button quiz-button-white quiz-button-down">
                    더 적게
                    <img src="assets/arrow_down_white.png" alt="Arrow" class="arrow-down">
                </button>
            </div>
        </div>
    `

    const quizButton = document.querySelectorAll('.quiz-button');

    quizButton.forEach((button) => {
        button.addEventListener('click', () => {

            if (button.classList.contains('quiz-button-up')) {
                if (obj[list[current]] < obj[list[current + 1]]) {
                    next();
                } else {
                    wrong(obj, list, current);
                }
            } else {
                if (obj[list[current]] > obj[list[current + 1]]) {
                    next();
                } else {
                    wrong(obj, list, current);
                }
            }
        })
    })

    function next() {
        const currentScore = document.querySelector('.current-score > h3');
        currentScore.innerHTML = `${current + 1}`;

        const statusElement = document.querySelector('.status');

        statusElement.style.transform = 'rotateY(180deg)';

        setTimeout(() => {
            statusElement.style.transform = 'rotateY(0deg)';
        }, 1000); 

        const currentCount = document.querySelector('.current');
        currentCount.innerHTML = `${format(obj[list[current + 1]])}회`;

        let quizButton = document.querySelectorAll('.quiz-button');

        quizButton.forEach((button) => {
            button.remove()
        });
            

        current += 1;

        // gameContainer.style.width = `${100 + current * 50}vw`;
        gameContainer.style.width = '150vw';

        if (current % 2 == 0) {
            gameContainer.innerHTML += `
                <div class="keyword keyword-quiz-black">
                    <h2>${list[current + 1]}</h2>
                    <h3 class="current">${format(obj[list[current + 1]])}회</h3>
        
                    <div class="quiz-buttons">
                        <button class="quiz-button quiz-button-white quiz-button-up">
                            더 많이
                            <img src="assets/arrow_up_white.png" alt="Arrow" class="arrow-up">
                        </button>
                        <button class="quiz-button quiz-button-white quiz-button-down">
                            더 적게
                            <img src="assets/arrow_down_white.png" alt="Arrow" class="arrow-down">
                        </button>
                    </div>
                </div>
            `
        } else {
            gameContainer.innerHTML += `
                <div class="keyword keyword-quiz-white">
                    <h2>${list[current + 1]}</h2>
                    <h3 class="current">${format(obj[list[current + 1]])}회</h3>
        
                    <div class="quiz-buttons">
                        <button class="quiz-button quiz-button-black quiz-button-up">
                            더 많이
                            <img src="assets/arrow_up_black.png" alt="Arrow" class="arrow-up">
                        </button>
                        <button class="quiz-button quiz-button-black quiz-button-down">
                            더 적게
                            <img src="assets/arrow_down_black.png" alt="Arrow" class="arrow-down">
                        </button>
                    </div>
                </div>
            `
        }

        quizButton = document.querySelectorAll('.quiz-button');

        quizButton.forEach((button) => {
            button.addEventListener('click', () => {
    
                if (button.classList.contains('quiz-button-up')) {
                    if (obj[list[current]] < obj[list[current + 1]]) {
                        next();
                    } else {
                        wrong(obj, list, current);
                    }
                } else {
                    if (obj[list[current]] > obj[list[current + 1]]) {
                        next();
                    } else {
                        wrong(obj, list, current);
                    }
                }
            })
        })

        gameContainer.style.transition = 'transform 0.5s ease-in-out';
        gameContainer.style.transform = `translateX(-50vw)`;

        setTimeout(() => {
            gameContainer.style.transition = 'none';
            gameContainer.style.transform = `translateX(0)`;
            gameContainer.style.width = '100vw';

            if (current % 2 == 0) {
                const keywordDiv = document.querySelectorAll('.keyword.keyword-quiz-black');
                keywordDiv[0].remove();   
            } else {
                const keywordDiv = document.querySelectorAll('.keyword.keyword-quiz-white');
                keywordDiv[0].remove();
            }
        }, 500);
    }
}

function format(number) {
    return number.toLocaleString();
}

function wrong(obj, list, current) {
    const currentScore = document.querySelector('.current-score > h3');
    if (localStorage.getItem('maxScore') && (current > localStorage.getItem('maxScore'))) {
        localStorage.setItem('maxScore', currentScore.innerHTML);
    }

    const quizButtons = document.querySelectorAll('.quiz-button');

    quizButtons.forEach((button) => {
        button.remove(); 
    });

    const currentCount = document.querySelector('.current');
    currentCount.innerHTML = `${format(obj[list[current + 1]])}회`;

    const statusElement = document.querySelector('.status');
    const backElement = document.querySelector('.status-back')

    backElement.style.backgroundImage = 'url(../assets/x.png)';

    statusElement.style.transform = 'rotateY(180deg)';

    setTimeout(() => {
        const gameScreen = document.querySelector('.game-screen');
        gameScreen.style.display = 'none';
        const endScreen = document.querySelector('.end-screen');
        endScreen.style.display = 'flex';

        end(current)
    }, 1000);

    // location.reload();
}