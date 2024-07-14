const gifContainer = document.getElementById('gif-container');
const checkAnswersButton = document.getElementById('check-answers-button');

let gameData = [];

function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (encodedData) {
        gameData = JSON.parse(decodeURIComponent(encodedData));
        displayGame();
    } else {
        gifContainer.innerHTML = '<p>No game data found. Please use a valid game link.</p>';
    }
}

function displayGame() {
    gifContainer.innerHTML = '';
    const allWords = gameData.map(item => item.word);
    
    gameData.forEach((item, index) => {
        const gifDiv = document.createElement('div');
        gifDiv.className = 'gif-word-pair';
        
        const img = document.createElement('img');
        img.src = item.gif;
        img.alt = `GIF ${index + 1}`;
        
        const select = document.createElement('select');
        select.id = `select${index}`;
        select.innerHTML = '<option value="">Choose a word</option>' + 
            allWords.map(word => `<option value="${word}">${word}</option>`).join('');
        
        gifDiv.appendChild(img);
        gifDiv.appendChild(select);
        gifContainer.appendChild(gifDiv);
    });
}

function checkAnswers() {
    let correct = 0;
    gameData.forEach((item, index) => {
        const select = document.getElementById(`select${index}`);
        if (select.value === item.word) {
            correct++;
            select.style.backgroundColor = 'lightgreen';
        } else {
            select.style.backgroundColor = 'lightcoral';
        }
    });
    alert(`You got ${correct} out of ${gameData.length} correct!`);
}

window.onload = loadGameData;
checkAnswersButton.addEventListener('click', checkAnswers);
