const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    // Fetch all user data asynchronously
    let results = await Promise.all(req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`)));

    // Extract required data from results
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    // Send the response as JSON
    res.json(out);
  } catch (err) {
    // Pass any errors to the error handler
    next(err);
  }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
