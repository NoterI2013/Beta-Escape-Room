let keySequence = []; // Array to store the sequence of button presses
const specialKey = "KEYS"; // The special key sequence you're looking for
const maxSequenceLength = specialKey.length; // Maximum allowed length of the sequence

const problemKey = "ProblemE"
const judgeResult = document.getElementById("judge-result");

document.querySelectorAll('.weapon-btn').forEach(button => {
    button.addEventListener('click', function() {

        keySequence.push(button.dataset.note);
        if(keySequence.length > maxSequenceLength){
            keySequence.shift();
        }

        if(keySequence.length != maxSequenceLength){
            judgeResult.innerHTML = "";
            return;
        }

        judgeResult.innerHTML = generate("info");
        axios.post('axios/test', {
            problem: problemKey,
            encrypt: keySequence.slice(-specialKey.length).join('')
        })
        .then(function (response) {
            if(response.data.accept === true){
                judgeResult.innerHTML = generate("success");
                judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">Click here to download the certificate</a>`
                keySequence = [];
            }else{
                judgeResult.innerHTML = generate("danger");
                judgeResult.children[0].innerHTML += `<button class="btn btn-outline-primary btn-sm float-right" id="key-seq-reset">Reset</button>`
                document.getElementById('key-seq-reset').addEventListener('click', function() {
                    keySequence = [];
                    judgeResult.innerHTML = "";
                });
            }
        })
        .catch(function (err) {
            console.error(err);
            judgeResult.innerHTML = generate("warning");
        })
        // .finally(function () {
        //     keySequence = [];
        // })
    });
});

const judgeTable = {
    info : "Judging...",
    success: "Accepted!",
    danger: "Failed...",
    warning: "Error! Please retry or ask the administrator"
};

function generate(property){
    const resultDisplay = `
        <div class="alert alert-${property}" role="alert">
            ${judgeTable[property]}
        </div>
    `;
    // console.log(resultDisplay);
    return resultDisplay;
}