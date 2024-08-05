window.onload = async () => {
    const mainScreen = document.querySelector('.main-screen');
    const gameScreen = document.querySelector('.game-screen');

    const startButton = document.querySelector('.start');
    const blackButton = document.querySelector('.arrow-black');
    const whiteButton = document.querySelector('.arrow-white');

    startButton.addEventListener('mouseover', () => {
        blackButton.style.display = 'none';
        whiteButton.style.display = 'block';
    })

    startButton.addEventListener('mouseout', () => {
        blackButton.style.display = 'block';
        whiteButton.style.display = 'none';
    })

    const result = await fetch('https://api.sunrin.kr')
        .then((response) => response.json())
        .then((data) => data)

    const shuffledKeys = shuffleArray(Object.keys(result))

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        gameStart(shuffledKeys, result);
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0 이상 i 이하의 정수
        [array[i], array[j]] = [array[j], array[i]]; // 배열 요소 스와핑
    }
    return array;
}