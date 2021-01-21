
const express = require('express');
const loginAgenda = require('./loginAgenda');
const app = express();
const PORT = 3333;
app.use(express.json())

app.post('/agenda', loginAgenda.login);

app.get('/', (req, res) => {
    res.json({ok:true})
});

app.listen(PORT, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server listening on Port", PORT); 
})