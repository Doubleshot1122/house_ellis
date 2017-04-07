'use strict'

///////////// Initalize Global Variables /////////////
const express = require('express')
const port = process.env.PORT || 4000
const app = express()

const faker = require('faker')

const pg = require('pg')
const config = require('./knexFile.js')['development']
const knex = require('knex')(config)


///////////// Define Routes /////////////
app.get('/',retreiveFakeData('company'))
app.post('/post',postFakeData('company'))

app.listen(port,() => {
  console.log(`Server is listening on port ${port}`)
})



///////////// Routing Functions /////////////
function retreiveFakeData(dataTable){
  return (req,res,next) => {
    return knex(dataTable)
      .then((data) => {
        console.log(data)
        res.send(data)
        // knex.destroy()
      })
      .catch((err) => {
        console.error(err)
        // knex.destroy()
      })
  }
}


function postFakeData(dataTable){
  return (req,res,next) => {
    return knex(dataTable)
      .insert(generateData())
      .then((result) => {
        console.log("New row added to database")
        res.send(result)
      })
      .catch((err) => {
        console.error(err);
        // knex.destroy();
      });
  }
}


///////////// Utility FUNCTIONS /////////////
function generateData() {
  var fakeName = faker.name.findName();
  var catchPhrase = faker.company.catchPhrase();
  var bs = faker.company.bs();
  var randomWord = faker.random.word();
  var fakeObject = {
        name: fakeName,
        catch_phrase: catchPhrase,
        bs: bs,
        random_word: randomWord,
  }
  console.log(fakeObject);
  return fakeObject;
};
