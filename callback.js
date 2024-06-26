const backendUrl = 'https://tatumproject.com'; // Updated to use your custom domain with HTTPS

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

// Handle the callback on page load
document.addEventListener('DOMContentLoaded', handleCallback);
