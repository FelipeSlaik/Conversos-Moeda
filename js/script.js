import dotenv from '../dotenv';
dotenv.config();

let dolar = 5.1;
let usdInput = document.querySelector('#usd');
let brlInput = document.querySelector('#brl');
const API_KEY = process.env.API_KEY;
function fetchExchangeRate(){
    let url = process.env.API_URL;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //atualizando o valor do dólar atualmente
        dolar = data.conversion_rates.BRL;
        console.log(`Taxa atual do ${dolar}`);
        convert('usd-to-brl');
    })

    .catch(error => {
        console.log('Erro ao buscar a taxa de câmbio', error);
    });
}

fetchExchangeRate();

usdInput.addEventListener('keyup', () => {
    convert('usd-to-brl');
})

brlInput.addEventListener('keyup', () => {
    convert('brl-to-usd');
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value);
})

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value);
})

usdInput.value = '0,00';
brlInput.value = '0,00';


function formatCurrency(value){
    // ajustar o valor
    let fixedValue = fixValue(value);
    // utilizar função de formatar 
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }

    let formatter = new Intl.NumberFormat('pt-BR', options);
    // retorna o valor formatado
    return formatter.format(fixedValue);
}

//Função que ajusta o valor
function fixValue(value){
    let fixedValue = value.replace(",", "."); // troca , por .
    let floatValue = parseFloat(fixedValue); //tranforma string em número
    
    if(isNaN(floatValue)){
        floatValue = 0;
    } // verifica se é um número sendo usado 
    return floatValue;
}

function convert(type) {
    if(type == 'usd-to-brl'){
        // ajustar o valor
        let fixedValue = fixValue(usdInput.value);
        // converter valor
        let result = fixedValue * dolar
        result = result.toFixed(2);
        // mostra no campo de real
        brlInput.value = formatCurrency(result);
    }
    
    if(type == 'brl-to-usd'){
        // ajustar o valor
        let fixedValue = fixValue(brlInput.value);
        // converter valor
        let result = fixedValue / dolar
        result = result.toFixed(2);
        // mostra no campo de dolar
        usdInput.value = formatCurrency(result);
    }
}
