const grid = document.querySelector('.grid')
const startBtn = document.querySelector('.button-start')
const divBtn = document.querySelector('.buttons')
const pauseBtn = 'Pausar'
const continueBtn = 'Continuar'

const characters = [
    'meliodasCard',
    'banCard',
    'escanorCard',
    'gowtherCard',
    'merlinCard',
    'kingCard',
    'starrosaCard',
    'zeldrisCard',
    'dianeCard',
    'arthurCard'
]

let firstCard = ''
let secondCard = ''

// Functions

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
        checkCard()
    }
}

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabled-card')

    if (disabledCard.length === 20) {
        clearInterval(this.loop)
        alert(`Parabéns, você conseguiu finalizar o jogo da memória em: ${timer.innerHTML} segundos!`)

        resetGame()
    }
}

const checkCard = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondChraracter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondChraracter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEndGame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''

        }, 800)
    }
}

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createCard = (character) => {
    const card = createElement('div', 'card no-click')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url(../img/${character}.png)`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters]
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    duplicateCharacters.forEach(character => {
        const card = createCard(character)
        grid.appendChild(card)
    })
}

startBtn.addEventListener('click', () => {
    if (startBtn.classList.contains('button-start')) {

        startBtn.textContent = pauseBtn

        startBtn.classList.remove('button-start')
        startBtn.classList.add('button-pause')

        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('no-click')
        })

        startTimer()

    } else {

        startBtn.textContent = continueBtn

        startBtn.classList.remove('button-pause')
        startBtn.classList.add('button-start')

        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('no-click')
        })

        clearInterval(this.loop)
    }
})

// timer

const timer = document.querySelector('.timer')

const startTimer = () => {
    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1

    }, 1000)
}

const resetGame = () => {
    grid.style.transition = 'opacity 1s ease-out'
    grid.style.opacity = '0'

    setTimeout(() => {
        grid.innerHTML = ''
        grid.style.transition = ''
        grid.style.opacity = '1'

        timer.innerHTML = '0'
        loadGame()

        startBtn.textContent = 'Iniciar'
        startBtn.classList.remove('button-pause')
        startBtn.classList.add('button-start')

        clearInterval(this.loop)
    }, 1000)
}

loadGame()