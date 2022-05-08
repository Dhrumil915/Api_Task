const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect("mongodb+srv://bunny1996:bunny1996@cluster0.jd4lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
  }).then((data)=>{
    console.log(`mongo is connected ${data.connection.host}`)
  })
console.log("AAAAAAAAAA")
}

module.exports = connectDatabase