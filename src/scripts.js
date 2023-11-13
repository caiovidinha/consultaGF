let SHEET_ID = '1gNdwnuiIEd8nRHw_S5Q2ONmsaD3zF3DO-AV6h2_KXD0'
let SHEET_TITLE = 'codes'
let SHEET_RANGE = 'A:D'
let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE

const inputGen = document.getElementById("codigo")
const buttonGen = document.getElementById("gen")
const inputID = document.getElementById("identificacao")
const wrongID = document.getElementById("wrongID")
const rightID = document.getElementById("rightID")
var existe = false;

function resetStatus() {
    wrongID.classList.add('hidden')
    rightID.classList.add('hidden')
}

async function genCode() {
    await getInfo()
    if(existe) {
        var randomString = Math.random().toString(36).slice(-6).toUpperCase()
        inputGen.value = randomString
        inputID.classList.add('border-none')
        inputID.classList.add('outline-none')
        inputID.classList.remove('outline-red-800')
        wrongID.classList.add('hidden')
        rightID.classList.remove('hidden')
    }
    else{
        inputID.classList.remove('border-none')
        inputID.classList.remove('outline-none')
        inputID.classList.add('outline-red-800')
        wrongID.classList.remove('hidden')
    }
    existe = false
}

async function getInfo() {
    let res = await fetch(FULL_URL)
    let data = JSON.parse((await res.text()).substr(47).slice(0,-2))
    for (let i = 0; i < data.table.rows.length; i++) {
        if(inputID.value==data.table.rows[i].c[0].v) existe=true
    }
    console.log(existe)
}

function resetCode(code) {
    let tempCode = code
    inputGen.value = "Copiado!"
    setTimeout(() => {
        inputGen.value = tempCode
      }, "2000")
}

function copyToClipboard() {
    navigator.clipboard.writeText(inputGen.value)
    resetCode(inputGen.value)
}

