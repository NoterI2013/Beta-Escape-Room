const problemKey = "ProblemD"
const alphDisplay = document.getElementById('alphDisplay');
const judgeResult = document.getElementById('judge-result');

document.querySelectorAll('.alph-btn').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value += this.textContent;
    });
});

document.querySelector('.alph-send').addEventListener('click', function() {
    judgeResult.innerHTML = "";
    if(alphDisplay.value === "")
        return;

    judgeResult.innerHTML = generate("info");
    axios.post('/axios/test', {
        problem: problemKey,
        encrypt: alphDisplay.value
    })
    .then(function (response) {
        if(response.data.accept === true){
            judgeResult.innerHTML = generate("success");
            judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">Click here to download the certificate</a>`
        }else{
            judgeResult.innerHTML = generate("danger");
        }
    })
    .catch(function (err) {
        console.error(err);
        judgeResult.innerHTML = generate('warning');
    });
    alphDisplay.value = "";
});

document.querySelectorAll('.alph-backspace').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = alphDisplay.value.slice(0, -1);
    });
});

document.querySelectorAll('.alph-clear').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = "";
    });
});

const judgeTable = {
    info : "Judging...",
    success: "Accepted!!",
    danger: "Wrong Password",
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