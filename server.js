const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });

// bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'production') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', formRoutes);

// port
const port = process.env.PORT || 8003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
