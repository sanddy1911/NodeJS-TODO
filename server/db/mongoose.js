var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb+srv://sundeep:' + 'ZqX8gYNBg5Mv9gkK' + '@cluster0-60xdb.mongodb.net/todo?retryWrites=true', { useNewUrlParser: true } )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


module.exports = {mongoose}