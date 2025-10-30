document.addEventListener('DOMContentLoaded', () => {

    const penguinClicker = document.getElementById('penguinClicker'); 

    const vocationalChoice = document.querySelector('.vocational-choice'); 

    if (penguinClicker && vocationalChoice) {
        penguinClicker.addEventListener('click', () => {

            vocationalChoice.classList.toggle('is-indecisive');
        });
    
        document.addEventListener('click', (event) => {
            if (!vocationalChoice.contains(event.target) && vocationalChoice.classList.contains('is-indecisive')) {
                vocationalChoice.classList.remove('is-indecisive');
            }
        });
    }
});