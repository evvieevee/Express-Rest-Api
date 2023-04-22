const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
const artistRoutes = require('./artist');
const bodyParser = require('body-parser');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://'+ process.env.MONGO_USERNAME + ':'+ process.env.MONGO_PASSWORD +'@cluster0.fddad9u.mongodb.net/?retryWrites=true&w=majority')
  .then(async () => {
    console.log("atlas ready");
  }).catch((e) => console.log(e))

 
}

app.use(bodyParser.json());
app.use('/api', artistRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


