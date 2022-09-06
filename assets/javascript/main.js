//Atribuição dos valores das cartas
const name_card = document.querySelector('#card-name')
const type = document.querySelector('#type')
const id = document.querySelector('#id')
const level = document.querySelector('#level')
const race = document.querySelector('#race')
const card_set = document.querySelector('#card-set')
const position = document.querySelector('#position')
const total_cards = document.querySelector('#total-cards')
const img_preview = document.querySelector('#img-preview')
//=========================================================================

//Atribuição dos valores das listas
const list_of_names = document.querySelector('#list-of-names')
const divine_of_beast = document.querySelector('#divine-beast')
const list_name = document.querySelector('#list-select-name')
const divine_beast = document.querySelector('#list-select-divine')
const preview = document.querySelector('#preview')

//Atribuição dos valores relacionado aos sons
const easter_egg = document.querySelector('#easter-egg')
const container = document.querySelector('#container')
const pause = document.querySelector('#pause')

//Atribuição dos sons
const flip_sound = new Audio('./assets/audio/card-flip.mp3')
const easter_sound= new Audio('./assets/audio/easter-sound.mp3')
const theme_sound = new Audio('./assets/audio/theme-sound.mp3')

let card_indice = 10725
let new_input_value
let new_indice_value
//2398 posição do 'Dark Magician'
//=========================================================================

//Tratando os dados da API
const fetchYuGiOh = async () =>{
    const fetchAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    if(fetchAPI.status == 200){
        const data = await fetchAPI.json()
        return data
    }
}

const fetchDivineBeast = async () =>{
    const fetchAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Divine-Beast`)
    if(fetchAPI.status == 200){
        const data = await fetchAPI.json()
        return data
    }
}
//=========================================================================

//Renderizando dados da API
//=========================================================================
const globalRender = async () => {

    name_card.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    card_set.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    total_cards.innerHTML = 'Loading..'

    const data = await fetchYuGiOh()
        const search = data.data[card_indice]

        if(data){
            name_card.innerHTML = `${search.name}`
            type.innerHTML = `${search.type}`
            id.innerHTML = `${search.id}`
            level.innerHTML = `${search.level}`
            img_preview.src = `${search.card_images[0].image_url}`
            card_set.innerHTML = `${search.card_sets[0].set_name}`
            race.innerHTML = `${search.race}`
            position.innerHTML = `${card_indice}`
            total_cards.innerHTML = `${data.data.length}`
        }        
}

globalRender()

//Renderizando as cartas por nome
const nameRender = async () => {

    name_card.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    card_set.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    total_cards.innerHTML = 'Loading..'

    const data = await fetchYuGiOh()
        const filter = data.data
        const search = filter.find(arr => arr.name === new_input_value)

        if(data){
            name_card.innerHTML = `${search.name}`
            type.innerHTML = `${search.type}`
            id.innerHTML = `${search.id}`
            level.innerHTML = `${search.level}`
            img_preview.src = `${search.card_images[0].image_url}`
            card_set.innerHTML = `${search.card_sets[0].set_name}`
            race.innerHTML = `${search.race}`
            position.innerHTML = `${new_indice_value}`
            total_cards.innerHTML = `${data.data.length}`
        } 
    }
//=========================================================================

//Criando lista de nomes de todas as cartas
const nameList = async () => {
    const data = await fetchYuGiOh()
    const filter = data.data
    const listName = filter.map((item, key) =>    
    `<li data-id="${key}" onclick="catchNames(event)">${item.name}</li>`)
    list_of_names.innerHTML = listName.join('')
}

nameList()

//Easter-egg lista
const easterEgg = async () => {
    const data = await fetchDivineBeast()
    const filter = data.data
    const listName = filter.map((item, key) =>    
    `<li data-id="${key}" onclick="catchNames(event)">${item.name}</li>`)
    divine_of_beast.innerHTML = listName.join('')
}

easterEgg()
//=========================================================================

//Funções
//=========================================================================

//Capturando os valores das listas e jogando para um novo input
function catchNames(event){
    new_input_value = event.target.textContent
    list_name.style.display = 'none'
    divine_beast.style.display = 'none'
    preview.style.visibility = 'visible'
    nameRender()
    soundFlip()
}

//Capturando o valor do input digitado e tratando erro de espaços
function btnSubmit(){
    const input = document.getElementById('input')
    new_input_value = input.value.replace(/( )+/g, ' ').trim()
        input.value = ''
        nameRender()
        soundFlip()
}

//Selecionando e buscando os dados das próximas cartas
function btnNext() {
    if(card_indice < 12144){
        card_indice += 1 
        globalRender()
        soundFlip()
    }
}

//Selecionando e buscando os dados das cartas atenriores
function btnPrev() {
    if(card_indice > 0){
        card_indice -= 1
        globalRender()
        soundFlip()
    }
}

//Abrindo as listas de nomes de todas as cartas
function openList(){
    list_name.style.display = 'flex'
    divine_beast.style.display = 'none'
    preview.style.visibility = 'hidden'
}

//Abrindo lista do easter-egg
function easterList(){
    divine_beast.style.display = 'flex'
    list_name.style.display = 'none'
    preview.style.visibility = 'hidden'
}

//Fechando todas as listas
function closeLists(){
    divine_beast.style.display = 'none'
    list_name.style.display = 'none'
    preview.style.visibility = 'visible'
}

//Som de flip efeito
function soundFlip() {
    setTimeout(sound, 500)
    function sound() {
        flip_sound.play()
        flip_sound.volume = 0.5
    }
}

//=========================================================================

//Evento de Preload
window.addEventListener('load', function(){
    const overlay = document.querySelector('#overlay')
    overlay.style.display = 'none'
})

//Pegando o indice de cada item da lista e jogando na posição
list_of_names.addEventListener('click', function (event) {
    new_indice_value = +event.target.dataset.id+1
})

//Pegando o indice de cada item da lista easter-egg e jogando na posição
divine_of_beast.addEventListener('click', function (event) {
    new_indice_value = +event.target.dataset.id+1
})

//Easter-egg som efeito
easter_egg.addEventListener('mouseover', function () {
    easter_sound.play()
    theme_sound.play()
    easter_sound.volume = 0.8
    theme_sound.volume = 0.1
    pause.style.display = "flex"
})

//Pausando a musica do easter-egg
pause.addEventListener('click', function () {
    theme_sound.pause()
    pause.style.display = "none"
})
