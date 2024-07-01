const sounds = {
    'z': document.querySelector('#s1'),
    'x': document.querySelector('#s2'),
    'c': document.querySelector('#s3'),
    'v': document.querySelector('#s4'),
    'b': document.querySelector('#s5'),
    'n': document.querySelector('#s6'),
    'm': document.querySelector('#s7'),
    'a': document.querySelector('#s8'),
    's': document.querySelector('#s9'),
};

let channels = [[], [], [], []];
let isRecording = [false, false, false, false];
let startTime = [0, 0, 0, 0];

document.addEventListener('keypress', ev => {
    const key = ev.key;
    const sound = sounds[key];
    if (sound) {
        sound.currentTime = 0;
        sound.play();
        recordSound(key);
    }
});

function addChannelListeners() {
    const recordButtons = document.querySelectorAll('.channel-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    recordButtons.forEach((button, index) => {
        button.removeEventListener('click', handleRecordButtonClick);
        button.addEventListener('click', handleRecordButtonClick);
    });

    deleteButtons.forEach((button, index) => {
        button.removeEventListener('click', handleDeleteButtonClick);
        button.addEventListener('click', handleDeleteButtonClick);
    });
}

function handleRecordButtonClick(event) {
    const index = Array.from(document.querySelectorAll('.channel-btn')).indexOf(event.currentTarget);
    if (event.target.classList.contains('play-icon')) {
        playChannel(index);
    } else {
        isRecording[index] = !isRecording[index];
        event.currentTarget.classList.toggle('recording');
        if (isRecording[index]) {
            channels[index] = [];
            startTime[index] = Date.now();
        }
    }
}

function handleDeleteButtonClick(event) {
    const index = Array.from(document.querySelectorAll('.delete-btn')).indexOf(event.currentTarget);
    deleteChannel(index);
}

function recordSound(key) {
    const time = Date.now();
    isRecording.forEach((recording, index) => {
        if (recording) {
            channels[index].push({ key, time: time - startTime[index] });
        }
    });
}

function playChannel(channelIndex) {
    const channel = channels[channelIndex];
    channel.forEach(soundEvent => {
        setTimeout(() => {
            const sound = sounds[soundEvent.key];
            sound.currentTime = 0;
            sound.play();
        }, soundEvent.time);
    });
}

function deleteChannel(channelIndex) {
    channels.splice(channelIndex, 1);
    isRecording.splice(channelIndex, 1);
    startTime.splice(channelIndex, 1);
    document.querySelectorAll('.channel')[channelIndex].remove();
    addChannelListeners();
}

function addNewChannel() {
    channels.push([]);
    isRecording.push(false);
    startTime.push(0);

    const channelContainer = document.createElement('div');
    channelContainer.classList.add('channel');

    const newChannelIndex = channels.length;

    channelContainer.innerHTML = `
        <button class="channel-btn">Ch${newChannelIndex} <span class="play-icon">▶️</span></button>
        <button class="delete-btn">🗑️</button>
    `;

    document.getElementById('channels').appendChild(channelContainer);
    addChannelListeners();
}

function playAllChannels() {
    channels.forEach((channel, index) => {
        playChannel(index);
    });
}

const playAllButton = document.getElementById('playAllChannels');
playAllButton.addEventListener('click', playAllChannels);

const addChannelButton = document.getElementById('addChannel');
addChannelButton.addEventListener('click', addNewChannel);

const metronomeToggle = document.getElementById('metronomeToggle');
const bpmInput = document.getElementById('bpm');
let metronomeInterval;
let isMetronomeOn = false;
const metronomeSound = sounds['s'];

metronomeToggle.addEventListener('click', () => {
    if (isMetronomeOn) {
        clearInterval(metronomeInterval);
        isMetronomeOn = false;
    } else {
        const bpm = bpmInput.value;
        const interval = (60 / bpm) * 1000;
        metronomeInterval = setInterval(() => {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
        }, interval);
        isMetronomeOn = true;
    }
});

addChannelListeners();