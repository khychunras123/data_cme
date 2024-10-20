const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));

// Endpoint to receive the image
app.post('/upload', (req, res) => {
    const imageData = req.body.image;  // This will be the Base64 encoded image

    // Strip out the "data:image/png;base64," part of the data
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Save the image to the local directory
    fs.writeFile('uploads/captured_image.png', base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ message: 'Failed to save image' });
        }

        console.log('Image saved successfully');
        res.status(200).json({ message: 'Image uploaded successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
