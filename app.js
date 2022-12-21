const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/user-auth');

    //use `await mongoose.connect('mongodb://user:password@localhost:27017/user-auth');`
  }

  require('./models/User')

app.use('/user',require('./routes/user'))

app.get('/', function (req, res) {
res.send("HII")
})

app.listen(3000, (err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("App Started at port 3000");
    }
})