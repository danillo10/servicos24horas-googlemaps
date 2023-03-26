const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/locations', (req, res) => {
  const address = req.body.address;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    
    res.json(body);
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
