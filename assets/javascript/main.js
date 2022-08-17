//Atribuição dos valores
const cardName = document.querySelector('#cardName')
const type = document.querySelector('#type')
const id = document.querySelector('#id')
const level = document.querySelector('#level')
const race = document.querySelector('#race')
const cardSet = document.querySelector('#cardSet')
const position = document.querySelector('#position')
const totalcards = document.querySelector('#totalcards')
const imgPreview = document.querySelector('#img_preview')
const listOfNames = document.querySelector('#listOfNames')

let cards = 2399 //indico do 'Dark Magician'
let newInputValue = 'Dark Magician'
//=========================================================================

//Tratando os dados da API
const fetchYuGiOh = async () =>{
    const fetchAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    if(fetchAPI.status == 200){
        const data = await fetchAPI.json()
        return data
    }
}

//Renderizando dados da API
const globalRender = async () => {

    cardName.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    cardSet.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    totalcards.innerHTML = 'Loading..'

    const data = await fetchYuGiOh()
        const search = data.data[cards]

        if(data){
            cardName.innerHTML = `${search.name}`
            type.innerHTML = `${search.type}`
            id.innerHTML = `${search.id}`
            level.innerHTML = `${search.level}`
            imgPreview.src = `${search.card_images[0].image_url}`
            cardSet.innerHTML = `${search.card_sets[0].set_name}`
            race.innerHTML = `${search.race}`
            position.innerHTML = `${cards}`
            totalcards.innerHTML = `${data.data.length}`
        }        
}

globalRender()

//Buscando dados por nome
const nameRender = async () => {

    cardName.innerHTML = 'Loading..'
    type.innerHTML = 'Loading..'
    id.innerHTML = 'Loading..'
    level.innerHTML = 'Loading..'
    cardSet.innerHTML = 'Loading..'
    race.innerHTML = 'Loading..'
    position.innerHTML = 'Loading..'
    totalcards.innerHTML = 'Loading..'

    const data = await fetchYuGiOh()
        const filter = data.data
        const search = filter.find(arr => arr.name === newInputValue)
   
        if(data){
            cardName.innerHTML = `${search.name}`
            type.innerHTML = `${search.type}`
            id.innerHTML = `${search.id}`
            level.innerHTML = `${search.level}`
            imgPreview.src = `${search.card_images[0].image_url}`
            cardSet.innerHTML = `${search.card_sets[0].set_name}`
            race.innerHTML = `${search.race}`
            position.innerHTML = `${cards}`
            totalcards.innerHTML = `${data.data.length}`
        } 
    }

//Criando lista de nomes de todas as cartas
const nameList = async () => {
    const data = await fetchYuGiOh()
    const filter = data.data
    const listName = filter.map(item =>    
    `<option>${item.name}</option>`)
    listOfNames.innerHTML = listName.join('')
}

nameList()

//Funções
//=========================================================================

//Capturando os valores do Select
function listNames(){
    const indice = listOfNames.selectedIndex
    const optionText = listOfNames.options[indice].text
    newInputValue = optionText
    cards = indice
    position.innerHTML = indice
    nameRender()
}

//Capturando o valor do input
function btnSubmit(){
    const input = document.getElementById('input')
        newInputValue = input.value
        input.value = ''
        nameRender()
}

//Selecionando e buscando os dados das próximas cartas
function btnNext() {
    if(cards < 12132){
       cards += 1 
       globalRender()
    }
}

//Selecionando e buscando os dados das cartas atenriores
function btnPrev() {
    if(cards > 0){
        cards -= 1
        globalRender()
    }
}

//Eventos
//=========================================================================

//Preload
window.addEventListener('load', function(){
    const overlay = document.querySelector('#overlay')
    overlay.style.display = 'none'
})