const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const postRoutes = require('./routes/postRoutes/');
const authRoutes = require('./routes/authRoutes/');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(postRoutes);
app.use(authRoutes);

app.listen(3000, () => {
  console.log('listening');
});
