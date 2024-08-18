let keySequence = []; // Array to store the sequence of button presses
const specialKey = "EDCDE"; // The special key sequence you're looking for
const maxSequenceLength = specialKey.length; // Maximum allowed length of the sequence

document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.piano-key');
    // console.log(typeof(keys), keys);

    keys.forEach(key => {
        if(key.dataset.enable === "false") return;

        key.addEventListener('click', () => {
            playSound(key);
        });

        key.addEventListener('mousedown', (event) => {
            event.preventDefault();
            key.classList.add('active');
        });

        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });

        key.addEventListener('mouseleave', () => {
            key.classList.remove('active');
        });
    });

    function playSound(key) {
        keySequence.push(key.dataset.note); // Add the button's text content to the array

        if (keySequence.length > maxSequenceLength) {
            keySequence.shift(); // Remove the first element to keep the array size within the limit
        }

        // console.log(key.dataset.note, "enable =", key.dataset.enable);
        const note = key.dataset.note;
        const sound = new Howl({
            src: [`/public/sounds/${note}4.mp3`]
        });
        sound.play();

        
        axios.post('axios/test', {
            problem: "ProblemC",
            encrypt: keySequence.slice(-specialKey.length).join('')
        })
        .then(function (response) {
            console.log(response.data.accept);
        })
        .catch(function (err) {
            console.error(err);
        });


        // console.log(keySequence);
        // Check if the last few entries match the special key sequence
        if (keySequence.slice(-specialKey.length).join('') === specialKey) {
            console.log("You unlock");
            // Optionally clear the sequence after unlocking
            keySequence = [];
        }
    }
});