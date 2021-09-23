const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + 'public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

const url = "mongodb+srv://admin-asgreen:0353297204@cluster0.aywbz.mongodb.net/foodDB";

mongoose.connect(url);

const foodSchema = mongoose.Schema({

    name: String, 
    url: String,
    cost: Number,
    type: String
});

const Food = mongoose.model('Food', foodSchema);


app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/foods', function(req, res) {

    Food.find({}, (err, result) => {
        res.send(result);
    })
})

app.post('/submit' , (req , res)=>{

    const name = req.body.name;
    const url = req.body.url;
    const cost = req.body.cost;
    let food = new Food(
        {
            name: name,
            url: url,
            cost: cost
        });
    food.save().then(
        res.redirect('/')
    )
});

app.listen(process.env.PORT, () => console.log("The server ran!"));