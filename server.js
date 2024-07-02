const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.json());

app.get('/', function(req, res) {
    // res.json({"Hello": "EJS"});
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

app.get('/pb', function(req, res) {
    res.render('pages/pb.ejs');
});

app.post('/axios/test', function(req, res) {
    let answer = process.env.ProblemA;
    // console.log(answer, req.body.encrypt);
    // console.log(typeof(answer), typeof(req.body.encrypt));
    let judge_result = answer === req.body.encrypt;
    res.json({
        accept: judge_result
    });
});

app.listen(3000);
console.log("Server is listening on port 3000");