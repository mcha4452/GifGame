
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const selectedGifsList = document.getElementById('selected-gifs-list');
const saveGameButton = document.getElementById('save-game-button');

const selectedGifs = [];

searchButton.addEventListener('click', searchGifs);
saveGameButton.addEventListener('click', saveGame);

async function searchGifs() {
    const query = searchInput.value;
    try {
        const response = await fetch(`/api/search-gifs?query=${encodeURIComponent(query)}`);
        const gifs = await response.json();
        displayResults(gifs);
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

async function saveGame() {
    const gifWords = selectedGifs.map((gif, index) => ({
        gif: gif.images.original.url,
        word: selectedGifsList.children[index].querySelector('input').value
    }));

    try {
        const response = await fetch('/api/save-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gifWords }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error saving game:', error);
        alert('Error saving game');
    }
}
