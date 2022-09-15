//Atribuição dos valores das cartas
const name_card = document.querySelector('#card-name')
const type = document.querySelector('#type')
const id = document.querySelector('#id')
const level = document.querySelector('#level')
const race = document.querySelector('#race')
const card_set = document.querySelector('#card-set')
const position = document.querySelector('#position')
const description_content = document.querySelector('#description-content')
const total_cards = document.querySelector('#total-cards')
const img_preview = document.querySelector('#card-preview')

//Atribuição de eventos de controle
const btnPrev = document.querySelector('.btnPrev')
const btnNext = document.querySelector('.btnNext')
const btnSubmit = document.querySelector('.btn-submit')
const description = document.querySelector('.description')
const close_desc = document.querySelector('.close-desc')
const btn_alert = document.querySelector('.btn-alert')

//Atribuição de valores controle das listas
const openListCards = document.querySelector('.open-list-cards')
const input = document.querySelector('.input')
const list_select_card = document.querySelector('.list-select-card')
const list_select_input = document.querySelector('.list-select-input')
const list_of_names = document.querySelector('.list-of-name')
const input_list = document.querySelector('.list-of-input')
const list_divine_beast = document.querySelector('.list-beast-name')
const beast_name = document.querySelector('.beast-name')

const preview = document.querySelector('.all-preview')

//Atribuição dos valores relacionado aos sons
const easter_egg = document.querySelector('.easter-egg')
const container = document.querySelector('.container')
const pause = document.querySelector('.pause')

export {
    name_card, type, id, level, race, card_set, position, description_content, total_cards, img_preview, btnPrev, btnNext, openListCards, btnSubmit, list_of_names, input_list, beast_name, list_select_card, list_select_input, list_divine_beast, preview, easter_egg,container, description, close_desc, pause, input, btn_alert }