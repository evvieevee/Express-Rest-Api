const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://evepuurtinen00:koalakarhu1@cluster0.t14h9zc.mongodb.net/?retryWrites=true&w=majority')
  .then(async () => {
    console.log("atlas ready");


    const albumSchema = new mongoose.Schema({
      name: String
    });

    const artistSchema = new mongoose.Schema({
      name: String,
      albums: {
        type: [albumSchema],
        default: []
      }
    });
    
    const Artist = mongoose.model('Artist', artistSchema);
    
    const artist = new Artist({ name: 'Silence' });

    await artist.save();

    const Album = mongoose.model('Album', albumSchema);
    const album = new Album({ name: 'Songs List' });
    await album.save()
    artist.albums.push(album);
    await artist.updateOne()

  }).catch((e) => console.log(e))

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


