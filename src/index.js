const express = require('express');
const app = express();

app.get('/projects', (request, response) => {
    return response.json({
        message: 'Hello DEV'
    });
});

app.listen(3333, () => {
    console.log('Backend started!');
});