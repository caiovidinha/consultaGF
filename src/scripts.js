let SHEET_ID = '1gNdwnuiIEd8nRHw_S5Q2ONmsaD3zF3DO-AV6h2_KXD0'
let SHEET_TITLE = 'codes'
let SHEET_RANGE = 'A:D'
let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE

const inputGen = document.getElementById("codigo")
const buttonGen = document.getElementById("gen")
var existe = false;

async function genCode() {
    await getInfo()
    if(existe) {
        var randomString = Math.random().toString(36).slice(-6).toUpperCase()
        inputGen.value = randomString
    }
    existe=false
}

async function getInfo() {
    let id = 101
    let res = await fetch(FULL_URL)
    let data = JSON.parse((await res.text()).substr(47).slice(0,-2))
    for (let i = 0; i < data.table.rows.length; i++) {
        if(id==data.table.rows[i].c[0].v) existe=true
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

