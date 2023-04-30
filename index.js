//Portti 3000 avattu
const express = require('express')
const app = express()
const port = 3000
// ladataan mongoose paketti, ladataan artist.js tiedosto, 
// ladataan bodyparser paketti ja dotenv paketti. 
const mongoose = require('mongoose');
const artistRoutes = require('./artist');
const bodyParser = require('body-parser');
require('dotenv').config();

main().catch(err => console.log(err));
// yhdistetään mongodb tietokantaan. Odotetaan await funktion avulla, että yhdistytään, ennenkuin jatketaan koodissa eteenpäin.
// Yhdistetään .env tiedostossa olevilla tunnuksilla tietokantaan. 
// ilmoitetaan "atlas ready", kun on yhdistetty tietokantaan yhteys. ja tarkistetaan, että jos ei yhdisty, niin ilmoitetaan siitä. 
async function main() {
  await mongoose.connect('mongodb+srv://'+ process.env.MONGO_USERNAME + ':'+ process.env.MONGO_PASSWORD +'@cluster0.fddad9u.mongodb.net/?retryWrites=true&w=majority')
  .then(async () => {
    console.log("atlas ready");
  }).catch((e) => console.log(e))

 
}
// Muutetaan tiedot json- muotoon ja ohjataan /api polut.
app.use(bodyParser.json());
app.use('/api', artistRoutes)
// Lähettää vastauksen "hello world", kun polulle saavutaan.
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 // Kuuntelee porttia ja console log, joka ilmoittaa portin jota aplikaatio kuuntelee. 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


 