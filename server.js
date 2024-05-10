const dotenv = require('dotenv').config();
const session = require('express-session')
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODBURI);
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name} 🗄️`)
})

const authController = require('./controllers/auth.js');
const drugsController = require('./controllers/drugs.js');
const indicationController = require('./controllers/indications.js');


const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
const user = require('./models/user');

app.use(morgan('dev'));
app.use(express.urlencoded ({ extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
app.use(passUserToView);
app.use('/auth', authController);
app.use('/drugs', drugsController);
app.use('/indications', indicationController);


app.get('/', (req, res) => {
    res.render("index", {user: req.session.user})
})







app.use('/auth', authController);





app.listen((process.env.PORT), () => {
    console.log(`listening on ${process.env.PORT} 💊`);
});