const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const {createAndSaveUser, findAllUsers, createAndSaveExercise, findUserById} = require('./Database.js')

app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



//end-points
//create new user
app.post('/api/users',function(req,res){
  let username = req.body.username
  let id =''
  createAndSaveUser(username,function(err,data){
    if(err) console.log(err)
    return res.json({username: username, _id: data._id});
  })
})

//get users
app.get('/api/users',function(req,res){
  let users =[] //array to be returned
  findAllUsers(function(err,data){
    if(err) console.log(err)
    data.forEach(u=>{
      users.push(u)
    })
    return res.json({users:users})
  })
  
})

//create exercise
app.post('/api/users/:_id/exercises',function(req,res){
  
  const userId = req.params._id; // Access _id from route params
  console.log('Received userId:', userId);
  createAndSaveExercise(
    userId,
    req.body.description,
    req.body.duration,
    req.body.date,
    function(err,data){
    if (err) console.log(err)
    console.log(data)
    return res.json({
      username: data.username,
      description: data.description,
      duration: data.duration,
      date: data.date,
      _id: data.userId
    
    });
  })
  
 
})

//get logs
//add to and from
app.get('/api/users/:_id/logs',function(req,res){
  let users =[] //array to be returned
  return res.json({logs:'logs', id:req.params._id, count:'count of exercises', exercises:[]})
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
