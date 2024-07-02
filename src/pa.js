const numDisplay = document.getElementById('numDisplay');

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
    // console.log('enter clicked');
    if(numDisplay.value === "")
        return;

    // alert(`User Input: ${numDisplay.value}`);
    axios.post('/axios/test', {
        problem: "pa",
        encrypt: numDisplay.value
    })
    .then(function (response) {
        console.log(response.data.accept);
    })
    .catch(function (err) {
        console.error(err);
    })
    // .finally(function () {
    //     console.log('hi ho');
    // });
    numDisplay.value = "";

});