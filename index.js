const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();

const teste = require('./teste');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var numberFollowers;

app.get('/user/:username', (req, res) => {

    const { username } = req.params;

    var followersNames = [];
    var jsonFollowers;

    axios.get('https://api.github.com/users/' + username, {})
        .then(function (response) {

            const { name, followers, avatar_url } = response.data;

            numberFollowers = followers;

            axios.get('https://api.github.com/users/' + username + '/followers', {})
                .then(function (response) {

                    var json = JSON.stringify(response.data)
                    obj = JSON.parse(json);

                    for (var i = 0; i < obj.length; i++) {
                        followersNames.push(obj[i].login);
                    }

                    var path = 'users/';
                    if (!fs.existsSync(path)) {
                        fs.mkdirSync(path);
                    }

                    if (fs.existsSync(path + username + '.json')) {
                        fs.unlinkSync(path + username + '.json');
                    }

                    //stringfy  object to JSON
                    //parse JSON to object
                    jsonFollowers = JSON.stringify(followersNames)
                
                    fs.writeFileSync(path + username + ".json", jsonFollowers, 'utf8', () => {
                        console.log('Arquivo criado!');
                    });

                    var teste = JSON.parse(jsonFollowers);

                }).catch(function (error) {
                    res.json({ error });
                });

            res.json({
                name,
                followers,
                followersNames,
                avatar_url

            });
        })
        .catch(function (error) {
            res.json({ error });
        });


});

app.get('/userfile/:username', (req, res) => {

    const { username } = req.params;

    var fileJson = fs.readFileSync('users/' + username + '.json');
    
    var obj = JSON.parse(fileJson);
    
    res.json({
        username,
        numberFollowers,
        followers:obj
    });

});



app.listen(3000);
console.log("Server running on port 3000!")