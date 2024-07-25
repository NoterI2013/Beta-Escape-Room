document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.piano-key');
    // console.log(typeof(keys), keys);

    keys.forEach(key => {
        if(key.dataset.enable === "false") return;

        key.addEventListener('click', () => playSound(key));

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
        // console.log(key.dataset.note, "enable =", key.dataset.enable);
        const note = key.dataset.note;
        const sound = new Howl({
            src: [`/public/sounds/${note}4.mp3`]
        });
        sound.play();
    }
});