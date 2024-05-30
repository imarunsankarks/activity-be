const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const allroutes = require('./routes/allrouter');
const userRoutes = require('./routes/userRouter');



// express apps
const app = express();

// middleware
app.use(cors());
app.use(express.json());




app.use('/api/routes', allroutes);
app.use('/api/user', userRoutes)




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to MongoDB and listening to port ', process.env.PORT);
        })
    })
    .catch(err => console.log(err))