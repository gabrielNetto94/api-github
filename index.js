const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();

const teste = require('./teste');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/user/:username', (req, res) => {

    const { username } = req.params;

    var followersNames = [];
    var jsonFollowers;

    axios.get('https://api.github.com/users/' + username, {})
        .then(function (response) {

            const { name, followers, avatar_url } = response.data;

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

                    jsonFollowers = JSON.stringify(followersNames)

                    fs.writeFileSync(path + username + ".json", jsonFollowers, 'utf8', () => { });

                }).catch(function (error) {
                    res.json({ error });
                });

                
            var fileJson = fs.readFileSync('users/' + username + '.json');
            var obj = JSON.parse(fileJson);

            res.json({
                name,
                avatar_url,
                followers,
                followersNames: obj
            });
        })
        .catch(function (error) {
            res.json({ error });
        });
});

app.listen(3000);
console.log("Server running on port 3000!")