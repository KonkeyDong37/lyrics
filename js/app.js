import { API } from './api.js';
import * as UI from './ui.js';

UI.serachForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Read the form data
    const artistName = UI.artistInput.value,
          songName = UI.songInput.value;

    // Validate the form
    if(artistName === '' || songName === '') {
        UI.messageDiv.innerHTML = 'Error... All fields are mandatory';
        UI.messageDiv.classList.add('error');
        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');
        }, 3000);
    } else {
        // Query the rest API
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                if(data.lyric.lyrics) {
                    // a SONG WAS FOUND
                    let result = data.lyric.lyrics;
                    UI.resultDiv.textContent = result;
                } else {
                    // No results found
                    UI.messageDiv.innerHTML = 'No Lyricks Found';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');
                        UI.serachForm.reset();
                    }, 3000);
                }
            })
        
    }
})