// Function to handle video download and display
const downloadVideo = () => {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    if (!videoUrl) {
        displayMessage('Please enter a valid video URL.', 'error');
        return;
    }

    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayMessage('Video fetched successfully.', 'success');

            // Display the video in the videoContainer div
            const videoContainer = document.getElementById('videoContainer');
            videoContainer.innerHTML = `
                <video id="downloadedVideo" controls>
                    <source src="${data.downloadLink}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;

            // After video has loaded, adjust aspect ratio
            const videoElement = document.getElementById('downloadedVideo');
            videoElement.onloadedmetadata = () => {
                const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
                videoContainer.style.aspectRatio = videoAspectRatio;
            };
        } else {
            displayMessage(`Error: ${data.error}`, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('An error occurred. Please try again later.', 'error');
    });
};

// Event listener to call downloadVideo() when button is clicked
document.getElementById('downloadButton').addEventListener('click', downloadVideo);

// Function to display messages
const displayMessage = (message, type) => {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
    messageElement.className = type;
};
