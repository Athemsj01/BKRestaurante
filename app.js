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


app.use('/menu_comida',require('./routes/menuco'));
app.use('/menu_bebidas',require('./routes/menu_bebida'));
app.use('/meseros',require('./routes/meseros'));
app.use('/ordenes',require('./routes/orden'));
app.use('/alimentos_orden',require('./routes/alimentos orden'));
app.use('/bebidas',require('./routes/bebidas_orden'));
app.use('/consulta',require('./routes/consultas'));


app.listen(3000,function(){
    console.log('API corriendo');
});
