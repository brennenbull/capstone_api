const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const notes = require('./routes/notes.js');
const port = process.env.PORT || 8380;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/notes', notes);

app.listen(port, ()=>{
  console.log('app listening on post '+ port);
});
