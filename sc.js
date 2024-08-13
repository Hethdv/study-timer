document.addEventListener('DOMContentLoaded', () => {
    let countdown;
    let timeLeft = 0;
    let isRunning = false;

    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const btn50min = document.getElementById('btn-50min');
    const btn25min = document.getElementById('btn-25min');
    const btn10min = document.getElementById('btn-10min');

    if (!timerDisplay || !startButton || !btn50min || !btn25min || !btn10min) {
        console.error("One or more elements not found in the DOM.");
        return;
    }

    btn50min.addEventListener('click', () => setTime(50 * 60));
    btn25min.addEventListener('click', () => setTime(25 * 60));
    btn10min.addEventListener('click', () => setTime(10 * 60));
    startButton.addEventListener('click', toggleTimer);

    function setTime(seconds) {
        timeLeft = seconds;
        displayTimeLeft(timeLeft);
    }

    function toggleTimer() {
        if (isRunning) {
            clearInterval(countdown);
            startButton.textContent = '시작';
            isRunning = false;
        } else {
            startTimer();
            startButton.textContent = '정지';
            isRunning = true;
        }
    }

    function startTimer() {
        clearInterval(countdown);
        const now = Date.now();
        const then = now + timeLeft * 1000;
        displayTimeLeft(timeLeft);

        countdown = setInterval(() => {
            timeLeft = Math.round((then - Date.now()) / 1000);
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = '00:00';
                startButton.textContent = '시작';
                isRunning = false;
                return;
            }
            displayTimeLeft(timeLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
        timerDisplay.textContent = display;
    }
});

function toggleTimer() {
    if (isRunning) {
        clearInterval(countdown);
        startButton.textContent = '시작';
        startButton.classList.remove('running');
        isRunning = false;
    } else {
        startTimer();
        startButton.textContent = '정지';
        startButton.classList.add('running');
        isRunning = true;
    }
}
