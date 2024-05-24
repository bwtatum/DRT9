const backendUrl = 'http://my-env.eba-xvpxz4mk.us-east-1.elasticbeanstalk.com/'; // Replace with your actual URL

function searchTracks() {
    const keyword = document.getElementById('searchKeyword').value;
    fetch(`${backendUrl}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword })
    }).then(response => response.json())
      .then(tracks => {
          const resultsElement = document.getElementById('results');
          resultsElement.innerHTML = '';
          tracks.forEach(track => {
              const li = document.createElement('li');
              li.textContent = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
              resultsElement.appendChild(li);
          });
      }).catch(error => console.error('Error:', error));
}
