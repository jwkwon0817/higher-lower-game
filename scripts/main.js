window.onload = async () => {
    if (localStorage.getItem('maxScore') === null) {
        localStorage.setItem('maxScore', 0);
    }

    const mainScreen = document.querySelector('.main-screen');
    const gameScreen = document.querySelector('.game-screen');

    const startButton = document.querySelector('.start');    

    const result = await getKeywords();

    const shuffledKeys = shuffleArray(Object.keys(result))

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        gameStart(shuffledKeys, result);
    })
}

async function getKeywords() {
    const result = await fetch('https://api.sunrin.kr')
        .then((response) => response.json())
        .then((data) => data)

    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0 이상 i 이하의 정수
        [array[i], array[j]] = [array[j], array[i]]; // 배열 요소 스와핑
    }
    return array;
}