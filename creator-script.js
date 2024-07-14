const GIPHY_API_KEY = 'ph4bDCK5BwAL6TXfJo7XOdMc02FFI6JN'; // Replace with your actual Giphy API key

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const selectedGifsList = document.getElementById('selected-gifs-list');
const saveGameButton = document.getElementById('save-game-button');
const gameLinkContainer = document.getElementById('game-link-container');
const gameLinkInput = document.getElementById('game-link');
const copyLinkButton = document.getElementById('copy-link-button');

const selectedGifs = [];

searchButton.addEventListener('click', searchGifs);
saveGameButton.addEventListener('click', generateGameLink);
copyLinkButton.addEventListener('click', copyGameLink);

async function searchGifs() {
    const query = searchInput.value;
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=20`);
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error('Error searching GIFs:', error);
    }
}

function displayResults(gifs) {
    resultsContainer.innerHTML = '';
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height_small.url;
        img.alt = gif.title;
        img.classList.add('gif-result');
        img.addEventListener('click', () => addSelectedGif(gif));
        resultsContainer.appendChild(img);
    });
}

function addSelectedGif(gif) {
    if (selectedGifs.length < 8) {
        selectedGifs.push(gif);
        updateSelectedGifsList();
    } else {
        alert('You can only select up to 8 GIFs.');
    }
}

function updateSelectedGifsList() {
    selectedGifsList.innerHTML = '';
    selectedGifs.forEach((gif, index) => {
        const li = document.createElement('li');
        li.classList.add('selected-gif-item');
        li.innerHTML = `
            <img src="${gif.images.fixed_height_small.url}" alt="${gif.title}">
            <input type="text" placeholder="Enter emotion/action" value="${gif.title}">
            <button onclick="removeSelectedGif(${index})">Remove</button>
        `;
        selectedGifsList.appendChild(li);
    });
}

function removeSelectedGif(index) {
    selectedGifs.splice(index, 1);
    updateSelectedGifsList();
}

function generateGameLink() {
    console.log("generateGameLink function called");
    const gifWords = selectedGifs.map((gif, index) => {
        const word = selectedGifsList.children[index].querySelector('input').value.trim();
        console.log(`GIF ${index + 1}:`, { gif: gif.images.original.url, word: word });
        return {
            gif: gif.images.original.url,
            word: word
        };
    });
    console.log("gifWords array:", gifWords);
    const gameData = JSON.stringify(gifWords);
    console.log("Stringified game data:", gameData);
    const encodedGameData = encodeURIComponent(gameData);
    console.log("Encoded game data:", encodedGameData);
    const gameLink = `${window.location.origin}/GifGame/game.html?data=${encodedGameData}`;
    console.log("Generated game link:", gameLink);
    
    gameLinkInput.value = gameLink;
    gameLinkContainer.style.display = 'block';
}

function copyGameLink() {
    gameLinkInput.select();
    document.execCommand('copy');
    alert('Game link copied to clipboard!');
}
