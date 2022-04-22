const express = require ('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');



app.use(cors());
app.use(morgan('tiny'));
app.use(history());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));



app.use('/mesero',require('./routes/mesero'));


app.listen(3000,function(){
    console.log('API corriendo');
});