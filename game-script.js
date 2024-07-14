const gifContainer = document.getElementById('gif-container');
const checkAnswersButton = document.getElementById('check-answers-button');

let gameData = [];

function loadGameData() {
    console.log("loadGameData function called");
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    console.log("Encoded data from URL:", encodedData);
    
    if (encodedData) {
        try {
            const decodedData = decodeURIComponent(encodedData);
            console.log("Decoded data:", decodedData);
            gameData = JSON.parse(decodedData);
            console.log("Parsed game data:", gameData);
            displayGame();
        } catch (error) {
            console.error("Error parsing game data:", error);
            gifContainer.innerHTML = '<p>Error loading game data. Please check the URL and try again.</p>';
        }
    } else {
        console.log("No 'data' parameter found in URL");
        gifContainer.innerHTML = '<p>No game data found. Please use a valid game link.</p>';
    }
}

function displayGame() {
    console.log("displayGame function called");
    gifContainer.innerHTML = '';
    const allWords = gameData.map(item => item.word);
    console.log("All words:", allWords);
    
    gameData.forEach((item, index) => {
        console.log(`Creating element for GIF ${index + 1}:`, item);
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
    console.log("checkAnswers function called");
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

console.log("Script loaded, adding event listeners");
window.addEventListener('load', loadGameData);
checkAnswersButton.addEventListener('click', checkAnswers);
