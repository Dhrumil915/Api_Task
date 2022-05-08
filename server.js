// Import
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDatabase = require('./database');
const app = express()

connectDatabase();
dotenv.config();

// Middleware
app.use(express.json())
app.use(cookieParser())

// Import All user Routes
const user = require('./routes/userRoutes')
const post = require('./routes/postRoutes')

app.use('/api/user/v1', user)
app.use('/api/post/v1', post)


app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
