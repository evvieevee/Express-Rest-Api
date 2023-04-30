// Alustusta mongoose ja express osalta. 
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

//määritellään  uusi schema joka tuo kappaleen.
const songSchema = new mongoose.Schema({
  name: String
});
//Määritellään uusi schema, joka tuo artistin.
const artistSchema = new mongoose.Schema({
  name: String,
  songs: [songSchema]
});

//määritellään model artistille
const Artist = mongoose.model('Artist', artistSchema);

// Määritellään reitti. Kun polku ladataan sovellus vastaa lähettämällä takaisin artist home tekstin. 
router.get('/', (req, res) => {
  res.send('artist home')
})
// Hakee kaikki artistit ja lähettää niiden listan
router.get('/getall', async (req, res) => {
  const list = await Artist.find();
  res.send(list)
})
// Hakee artistin id:n avulla.
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const list = await Artist.findById(id);
  res.send(list)
})
// post- funktio, jossa pyritään lisäämään uusi artisti ja tarkitsetaan virheiden varalta ettei nimi ole tyhjä.
//jos miltään puuttuu nimi server lähettää koodin 500 ja kertoo mitkä puuttuu. 
router.post('/add', async (req, res) => {
  const artistName = req.body.artistName;
  const songs = req.body.songs;
  if(artistName && artistName !== "" && typeof artistName === "string") {
    if(songs && songs.every(x => x.hasOwnProperty('name'))) {
      const artist = new Artist({ name: artistName});
      artist.songs = songs.length > 0 ? [...songs] : [];
      await artist.save().then((newArtist) => {
        res.status(201).send(newArtist)
      }).catch(err => res.status(500).send(err))
    }else {
      res.status(500).send("one or more songs has no name property")
    }
  }else {
    res.status(500).send("missing name")
  }
})
// Poistaa artistin id avulla
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Artist.deleteOne({ _id: id }).then((x => {
    res.send(x)
  })).catch(err => res.send(err))
})
// Päivittää yhden artistin id avulla.
router.patch('/update/:id', async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const updated = await Artist.findOneAndUpdate({_id: id}, update);
  res.send(updated);
})

//exportataan tietoja toiseen tiedostoon.
module.exports = router