
// const searchInputForm = document.getElementById("searchBtn");
//   searchInputForm.addEventListener('click', function(){
   
function getSongName(){
   const songName = document.getElementById("search-input-form").value;
   document.getElementById('fancy-result').style.display = 'block';
   
   fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then (res => res.json())
    .then(data =>{
        console.log(data);
        const song = data.data;
        for (let i = 0; i < 10; i++) {
            const element = song[i];
            const title = element.title;
            const artist = element.artist.name;
            const image =  element.artist.picture_small;
            // document.getElementById('song-name').innerText = `${title}`;
            // document.getElementById('artist-name').innerText = `${artist}`;

            document.getElementById('fancy-result').innerHTML += `
            <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-2">
                    <img class="img-thumbnail" src="${image}" alt="Cover Picture">
                    </div>
                    <div class="col-md-7">
                        <h3 id="song-name" class="lyrics-name">${title}</h3>
                        <p style="font-size:13px" class="author lead">Album by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`  
        }    
    })
}

function getLyrics(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>
        {
            const lyrics = data.lyrics;
            console.log(data);
            document.getElementById('all-lyrics').style.display = 'block';
            document.getElementById('all-lyrics').innerHTML = `
            <button class="btn go-back">&lsaquo;</button>
            <h2 class="text-success mb-4">${artist} - ${title}</h2>
            <pre class="lyric text-white"> ${lyrics}

            </pre>
            `
        })
}


