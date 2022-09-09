import { fetchYuGiOh, fetchDivineBeast } from './modules/fetch.js'
import { flip_sound, easter_sound, theme_sound } from './modules/audio.js'
import { name_card, type, id, level, race, card_set } from './modules/const.js'
import { position, description_content, total_cards, img_preview } from './modules/const.js'
import { btnPrev, btnNext, openListCards, btnSubmit, list_of_names } from './modules/const.js'
import { beast_name, list_select_card, list_divine_beast } from './modules/const.js'
import { preview, easter_egg, container, description, close_desc, pause } from './modules/const.js'


let card_indice = 7569
let new_input_value
let new_indice_value

const globalRender = async () => {

    name_card.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    card_set.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    total_cards.innerHTML = 'Loading..'

    const response = await fetchYuGiOh()
    
    if (response) {
        const search = response.data[card_indice]
        name_card.innerHTML = `${search.name}`
        type.innerHTML = `${search.type}`
        id.innerHTML = `${search.id}`
        level.innerHTML = `${search.level}`
        img_preview.src = `${search.card_images[0].image_url}`
        card_set.innerHTML = `${search.card_sets[0].set_name}`
        race.innerHTML = `${search.race}`
        position.innerHTML = `${card_indice}`
        description_content.innerHTML = `${search.desc}`
        total_cards.innerHTML = `${response.data.length}`
    }
}

globalRender()

const nameRender = async () => {

    name_card.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    card_set.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    total_cards.innerHTML = 'Loading..'

    const response = await fetchYuGiOh()
    const cardList = response.data
    const search = cardList.find(arr => arr.name.toLowerCase() === new_input_value.toLowerCase())

    if (response && search) {
        name_card.innerHTML = `${search.name}`
        type.innerHTML = `${search.type}`
        id.innerHTML = `${search.id}`
        level.innerHTML = `${search.level}`
        img_preview.src = `${search.card_images[0].image_url}`
        card_set.innerHTML = `${search.card_sets[0].set_name}`
        race.innerHTML = `${search.race}`
        position.innerHTML = `${new_indice_value}`
        description_content.innerHTML = `${search.desc}`
        total_cards.innerHTML = `${response.data.length}`
        card_indice = new_indice_value
    }
}

const nameList = async () => {
    const response = await fetchYuGiOh()
    const cardList = response.data
    const listName = cardList.map((item, key) =>
    `<li data-id="${key}">${item.name}</li>`)
    list_of_names.innerHTML = listName.join('')
}

nameList()

const easterEgg = async () => {
    const response = await fetchDivineBeast()
    const cardList = response.data
    const listName = cardList.map((item, key) =>
    `<li data-id="${key}">${item.name}</li>`)
    beast_name.innerHTML = listName.join('')
}

easterEgg()

function catchNames(event) {
    new_input_value = event.target.textContent
    list_select_card.style.display = 'none'
    list_divine_beast.style.display = 'none'
    description_content.style.display = 'none'
    close_desc.style.display = 'none'
    preview.style.visibility = 'visible'
    nameRender()
}

function soundFlip() {
    setTimeout(sound, 500)
    function sound() {
        flip_sound.play()
        flip_sound.volume = 0.1
    }
}

window.addEventListener('load', () => {
    const overlay = document.querySelector('.overlay')
    overlay.style.display = 'none'
})

easter_egg.addEventListener('mouseover', () => {
    easter_sound.play()
    theme_sound.play()
    easter_sound.volume = 0.5
    theme_sound.volume = 0.1
    pause.style.display = "flex"
})

pause.addEventListener('click', () => {
    theme_sound.pause()
    pause.style.display = "none"
})

openListCards.addEventListener('click', (event) => {
    catchNames(event)
    list_select_card.style.display = 'flex'
    list_divine_beast.style.display = 'none'
    description_content.style.display = 'none'
    close_desc.style.display = 'none'
    preview.style.visibility = 'hidden'
})

easter_egg.addEventListener('click', (event) => {
    catchNames(event)
    list_divine_beast.style.display = 'flex'
    list_select_card.style.display = 'none'
    description_content.style.display = 'none'
    close_desc.style.display = 'none'
    preview.style.visibility = 'hidden'
})

list_of_names.addEventListener('click', (event) => {
    new_indice_value = +event.target.dataset.id + 1
    catchNames(event)
    soundFlip()
})

beast_name.addEventListener('click', (event) => {
    new_indice_value = +event.target.dataset.id + 1
    catchNames(event)
    soundFlip()
})

container.addEventListener('click', () => {
    list_divine_beast.style.display = 'none'
    list_select_card.style.display = 'none'
    preview.style.visibility = 'visible'
})

btnSubmit.addEventListener('click', () => {
    const input = document.getElementById('input')
    new_input_value = input.value.replace(/( )+/g, ' ').trim()
    input.value = ''
    nameRender()
    soundFlip()
})

btnNext.addEventListener('click', () => {
    if (card_indice < 10791) {//12144
        card_indice += 1
        globalRender()
        soundFlip()
    }
})

btnPrev.addEventListener('click', () => {
    if (card_indice > 0) {
        card_indice -= 1
        globalRender()
        soundFlip()
    }
})

description.addEventListener('mouseover', () => {
    description_content.style.display = 'flex'
    close_desc.style.display = 'flex'
})

close_desc.addEventListener('click', () => {
    description_content.style.display = 'none'
    close_desc.style.display = 'none'
})