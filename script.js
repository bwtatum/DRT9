const backendUrl = 'https://tatumproject.com/auth/spotify/callback'; // Ensure this is your actual backend URL

// Function to handle the callback and get the authorization code
function handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
        fetch(`${backendUrl}/callback?code=${code}`)
            .then(response => response.json())
            .then(data => {
                console.log('Received tokens:', data);
                // Store tokens in localStorage or handle them as needed
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                window.location.href = '/DRT9/'; // Redirect to the home page after successful login
            })
            .catch(error => console.error('Error handling callback:', error));
    }
}

// Function to initiate the login process
function login() {
    window.location.href = `${backendUrl}/login`;
}

// Function to handle the search
function searchTracks() {
    const keyword = document.getElementById('searchKeyword').value;
    fetch(`${backendUrl}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Use the stored access token
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

// Event listener for login button
document.getElementById('login-button').addEventListener('click', login);

// Event listener for search button
document.getElementById('search-button').addEventListener('click', searchTracks);

// Handle the callback on page load
document.addEventListener('DOMContentLoaded', handleCallback);
