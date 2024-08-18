const numDisplay  = document.getElementById('numDisplay');
const judgeResult = document.getElementById('judge-result');

document.querySelectorAll('.num-btn').forEach(button => {
    button.addEventListener('click', function() {
        // let numDisplay = document.getElementById('numDisplay');
        numDisplay.value += this.textContent;
    })
});

document.querySelector('.num-clear').addEventListener('click', function() {
    // console.log('clear clicked');
    numDisplay.value = "";
});

document.querySelector('.num-backspace').addEventListener('click', function() {
    numDisplay.value = numDisplay.value.slice(0, -1);
});

document.querySelector('.num-enter').addEventListener('click', function() {
    judgeResult.innerHTML = "";
    if(numDisplay.value === "")
        return;

    // console.log(document.getElementById('judge-result'));
    // console.log(generate("info"));
    axios.post('/axios/test', {
        problem: "ProblemA",
        encrypt: numDisplay.value
    })
    .then(function (response) {
        console.log(response.data.accept);
        // console.log(typeof response.data.accept);
        if(response.data.accept === true){
            // console.log(generate("success"));
            judgeResult.innerHTML = generate("success");
        }else if(response.data.accept === false){
            // console.log(generate("danger"));
            judgeResult.innerHTML = generate("danger");
        }
    })
    .catch(function (err) {
        console.error(err);
        judgeResult.innerHTML = generate("warning");
    })
    // .finally(function () {
    //     console.log('hi ho');
    // });
    numDisplay.value = "";

});

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

const judgeTable = {
    info : "Judging...",
    success: "Accepted",
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