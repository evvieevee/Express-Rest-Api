const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: String
});

const artistSchema = new mongoose.Schema({
  name: String,
  songs: [songSchema]
});


const Artist = mongoose.model('Artist', artistSchema);


router.get('/', (req, res) => {
  res.send('artist home')
})

router.get('/getall', async (req, res) => {
  const list = await Artist.find();
  res.send(list)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const list = await Artist.findById(id);
  res.send(list)
})

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

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Artist.deleteOne({ _id: id }).then((x => {
    res.send(x)
  })).catch(err => res.send(err))
})

router.patch('/update/:id', async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const updated = await Artist.findOneAndUpdate({_id: id}, update);
  res.send(updated);
})

module.exports = router