const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const { sha256 } = require('js-sha256');

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

app.get('/pd', function(req, res) {
    res.render('pages/pd.ejs');
});

app.get('/pe', function(req, res) {
    res.render('pages/pe.ejs');
});

app.post('/axios/test', function(req, res) {
    let response_message = {}
    let answer_key = req.body.problem;

    // Handle case where the environment variable does not exist
    if (!Object.prototype.hasOwnProperty.call(process.env, answer_key)) {
        return res.status(400).json({ error: "Invalid problem key" });
    }

    let answer = (process.env)[answer_key];
    let user_password = sha256(req.body.encrypt);
    let judge_result = answer === user_password;
    // let judge_result = answer === req.body.encrypt;
    // console.log(`${req.body.problem} | Raw Input: ${req.body.encrypt} \nsha256:  ${user_password} \nJudge Result:  ${judge_result}`);
    response_message.accept = judge_result;

    if(judge_result === true){
        let secret_token_key = `${req.body.problem}_Secret`;
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
                // Ensure that this error response is only sent if no response was already sent
                if (!res.headersSent) {
                    res.status(500).send("Error! Please retry or ask the administrator");
                }
            }
        });
    }else{
        res.status(500).send("Humm... It seems that the file isn't exist");
    }
});

app.listen(25566, () => {
    console.log("Server is listening on port 25566");
}).on('error', (err) => {
    console.error("Server error:", err);
});