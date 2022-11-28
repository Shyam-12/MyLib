// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').load();
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

require('dotenv').config();

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public')); 

// database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', ()=> console.log('Connected to mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);