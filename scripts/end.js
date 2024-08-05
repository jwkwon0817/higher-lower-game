
function end(current) {
    const mainButton = document.querySelector('.goto-main');
    const restartButton = document.querySelector('.restart');
    const mainBlackButton = document.querySelector('.main-black');
    const mainWhiteButton = document.querySelector('.main-white');
    const restartBlackButton = document.querySelector('.restart-black');
    const restartWhiteButton = document.querySelector('.restart-white');

    const endCurrentScore = document.querySelector('.end-current-score > h3');
    endCurrentScore.innerHTML = `${current}`;
    const endMaxScore = document.querySelector('.end-max-score > h3');
    endMaxScore.innerHTML = localStorage.getItem('maxScore') ? localStorage.getItem('maxScore') : 0;

    mainButton.addEventListener('mouseover', () => {
        mainBlackButton.style.display = 'none';
        mainWhiteButton.style.display = 'block';
    })

    mainButton.addEventListener('mouseout', () => {
        mainBlackButton.style.display = 'block';
        mainWhiteButton.style.display = 'none';
    })

    restartButton.addEventListener('mouseover', () => {
        restartBlackButton.style.display = 'none';
        restartWhiteButton.style.display = 'block';
    })

    restartButton.addEventListener('mouseout', () => {
        restartBlackButton.style.display = 'block';
        restartWhiteButton.style.display = 'none';
    })

    mainButton.addEventListener('click', () => {
        location.reload();
    });

    restartButton.addEventListener('click', async () => {
        const mainScreen = document.querySelector('.main-screen');
        const gameScreen = document.querySelector('.game-screen');
        const endScreen = document.querySelector('.end-screen');

        const result = await fetch('https://api.sunrin.kr')
            .then((response) => response.json())
            .then((data) => data)

        const shuffledKeys = shuffleArray(Object.keys(result))


        gameScreen.innerHTML = `
        <div class="max-score score">
                <h2>최고 점수</h2>
                <h3>1</h3>
            </div> 
            <div class="current-score score">
                <h2>현재 점수</h2>
                <h3>0</h3>
            </div>
            <div class="status-container">
                <div class="status">
                <div class="status-inner status-front"></div>
                <div class="status-inner status-back"></div>
                </div>
            </div>

            <div class="game-container">
            </div>`

        mainScreen.style.display = 'none';
        endScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        gameStart(shuffledKeys, result);
    });
}