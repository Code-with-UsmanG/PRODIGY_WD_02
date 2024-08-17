let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        if (difference === undefined) {
            difference = 0;
        }
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = 'Pause';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = 'Resume';
        difference = updatedTime - startTime;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    startStopBtn.innerHTML = 'Start';
    laps.innerHTML = '';
    lapCount = 0;
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapDiv = document.createElement('div');
        lapDiv.innerHTML = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
