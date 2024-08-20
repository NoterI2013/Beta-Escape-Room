const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.json());

app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

app.get('/pa', function(req, res) {
    res.render('pages/pa.ejs');
});

// app.get('/pb', function(req, res) {
//     res.render('pages/pb.ejs');
// });

// app.get('/pc', function(req, res) {
//     res.render('pages/pc.ejs');
// });

app.get('/pd', function(req, res) {
    res.render('pages/pd.ejs');
});

// app.get('/pe', function(req, res) {
//     res.render('pages/pe.ejs');
// });

app.post('/axios/test', function(req, res) {
    let response_message = {}
    let answer_key = req.body.problem;
    let answer = (process.env)[answer_key];
    let judge_result = answer === req.body.encrypt;
    console.log(req.body.problem, "input: ", req.body.encrypt, "; Judge Result: ", judge_result);
    response_message.accept = judge_result;
    if(judge_result === true){
        secret_token_key = `${req.body.problem}_Secret`;
        response_message.secret = (process.env)[secret_token_key];
    }
    res.json(response_message);
});

app.get('/certificate', function(req, res) {
    let file_name_key = `${req.query.p}_filename`;
    if(Object.prototype.hasOwnProperty.call(process.env, file_name_key)){
        let file_name = (process.env)[file_name_key];
        res.download(path.join(__dirname, `/private/${req.query.arg}`), file_name, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error! Please retry or ask the administrator");
            }
        });
    }else{
        res.status(500).send("Humm... It seems that the file isn't exist");
    }
});

app.listen(3000);
console.log("Server is listening on port 3000");