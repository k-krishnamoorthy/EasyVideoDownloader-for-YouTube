const express = require('express');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const path = require('path'); // Import path module for directory operations

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
// Use path.join to construct the correct path to 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Example route handling POST request for video download
app.post('/download', async (req, res) => {
    const { url } = req.body;

    try {
        // Example: Validate and process the URL (using ytdl-core in this case)
        if (ytdl.validateURL(url)) {
            const info = await ytdl.getInfo(url);
            const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
            if (formats.length > 0) {
                const videoUrl = formats[0].url;
                res.json({ success: true, downloadLink: videoUrl });
            } else {
                res.json({ success: false, error: 'No downloadable formats found' });
            }
        } else {
            res.json({ success: false, error: 'Invalid YouTube URL' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch video' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
