const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

//set up DB Schema
const exerciseSchema = new mongoose.Schema({
  username:String,
  description:String,
  duration:Number,
  date:String,
  userId: String
})
const Exercise = mongoose.model('Exercise',exerciseSchema)

const userSchema = new mongoose.Schema({
  username:String
})
const User = mongoose.model('User',userSchema)

const logDetailSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true }, // or Date if storing actual Date objects
});

const logSchema = new mongoose.Schema({
  username:String,
  count:Number,
  date:String,
  log:[logDetailSchema]
})
const Log = mongoose.model('Log',logSchema)

var createAndSaveUser =function(username, done){
  let user = new User({username:username})
  user.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
}

var findUserById = function(userId, done) {
  User.find({_id:userId}, function (err, data) {
    if (err) return console.log(err);
    console.log('user found')
    done(null, data);
  });
};

var findAllUsers = function(done){
  User.find({},function(err,data){
     if (err) return console.log(err);
    done(null,data)
  })
}

//exercise modules

var createAndSaveExercise = function(userId,description,duration,date,done){
   console.log('Received userId:', userId);
  findUserById(userId,function(err,data){
    if(err) console.log(err)
    if (data == null) {
      console.log('User not found');
      return done(new Error('User not found'));
    }
    let exercise = new Exercise({
    username:data[0].username,
    description:description,
    duration:duration,
    date:date,
    userId:userId})
    exercise.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
})
  
  
  
}

module.exports ={
  createAndSaveUser,
  findUserById,
  findAllUsers,
  createAndSaveExercise,
}