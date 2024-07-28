const alphDisplay = document.getElementById('alphDisplay');
// console.log(alphDisplay);

document.querySelectorAll('.alph-btn').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value += this.textContent;
    });
});

document.querySelector('.alph-send').addEventListener('click', function() {
    if(alphDisplay.value === "")
        return;

    axios.post('/axios/test', {
        problem: "ProblemB",
        encrypt: alphDisplay.value
    })
    .then(function (response) {
        console.log(response.data.accept);
    })
    .catch(function (err) {
        console.error(err);
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