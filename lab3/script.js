const clap = document.querySelector('#clap')
const boom = document.querySelector('#boom')
const hihat = document.querySelector('#hihat')

const sounds = {
    'z': document.querySelector('#s1'),
    'x': document.querySelector('#s2'),
    'c': document.querySelector('#s3'),
}

document.addEventListener('keypress', ev => {
    console.log(ev)
    const key = ev.key
    const sound = sounds[key]
    sound.currentTime = 0
    sound.play()
})

// var recordChannelOne = document.getElementById('recordChannelOne')

// recordChannelOne.onclick = () => {
//     let recordingStart = Date.now()
//     console.log(recordingStart)

//     var buttonsClicked = []

//     function handleKeyPress(ev) {
//         var pressedKey = ev.key

//         if (!buttonsClicked.includes(pressedKey)) {
//             buttonsClicked.push(pressedKey)
//             console.log("pressed key:", pressedKey)
//         }
//     }
    
// }