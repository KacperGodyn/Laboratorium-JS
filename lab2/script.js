const box = document.querySelector('.box')
const controls = document.querySelectorAll('.control')
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')

let position = 0
let intervalId

const updateSlider = () => {
    box.style.transform = `translateX(-${position * 900}px)`
    controls.forEach((control, index) => {
        if (index === position) {
            control.classList.add('active')
        } else {
            control.classList.remove('active')
        }
    })
}

const goToSlide = (index) => {
    position = index
    if (position < 0) {
        position = 5
    } else if (position > 5) {
        position = 0
    }
    updateSlider()
};

controls.forEach((control, index) => {
    control.addEventListener('click', () => {
        goToSlide(index)
        intervalId = setInterval(() => {
            if (position === 5) {
                position = 0
            } else {
                position++
            }
            updateSlider()
        }, 3000)
    })
})

prevButton.addEventListener('click', () => {
    clearInterval(intervalId)
    if (position === 0) {
        position = 5
    } else {
        position--
    }
    updateSlider()
})

nextButton.addEventListener('click', () => {
    clearInterval(intervalId)
    if (position === 5) {
        position = 0
    } else {
        position++
    }
    updateSlider()
});

intervalId = setInterval(() => {
    if (position === 5) {
        position = 0
    } else {
        position++
    }
    updateSlider()
}, 3000)
