var currenciesArr = [];

var uploadDate = (bankApi) =>{
    currenciesArr = [];

    var table = document.getElementById('table');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    var fromInput = document.getElementById('from_coin');
    var toInput = document.getElementById('to_coin');
    while (fromInput.firstChild && toInput.firstChild) {
        fromInput.removeChild(fromInput.firstChild);
        toInput.removeChild(toInput.firstChild);
    }

    fetch(bankApi)
        .then((response)=>{
            return response.json();
        }).then((currencies)=>{
        for(const item in currencies){
            currenciesArr.push(currencies[item]);
        }
        console.dir(currenciesArr);
        for(let i = 0; i < currenciesArr.length;i++){
            let row = table.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            cell1.innerHTML = currenciesArr[i].txt
            cell2.innerHTML = currenciesArr[i].cc
            cell3.innerHTML =  currenciesArr[i].rate



            var optionOne = document.createElement("option");
            var optionTwo = document.createElement("option");
            optionOne.innerHTML = currenciesArr[i].txt;
            optionTwo.innerHTML = currenciesArr[i].txt;
            fromInput.appendChild(optionOne);
            toInput.appendChild(optionTwo);
        }
    })
};

(()=>{
    uploadDate('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20230625&json');

    var fromInput = document.getElementById('from_coin');
    var toInput = document.getElementById('to_coin');

    var dateInput = document.getElementById('date');
    dateInput.addEventListener('change',()=>{
        var newDate = dateInput.value.replaceAll('-','');
        uploadDate(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${newDate}&json`);
    })
    var btn_exchange = document.getElementById('btn_exchange');

    btn_exchange.addEventListener('click',()=>{
        let amountInput = document.getElementById('amount_coin');

        let fromSelectedCoin = 0;
        let toSelectedCoin = 0;

        for(let i = 0; i < currenciesArr.length;i++){
            if(currenciesArr[i].txt == fromInput.value){
                fromSelectedCoin = i;
            }
            else if(currenciesArr[i].txt == toInput.value){
                toSelectedCoin = i;
            }
        }
        amountInput.value = (amountInput.value * currenciesArr[fromSelectedCoin].rate / currenciesArr[toSelectedCoin].rate).toFixed(4);
    });

})();

