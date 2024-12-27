//const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

// for (code in countryList) {
//     console.log(code);
// }  

for (let select of dropdowns) {
    for (currCode in countryList) {     
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "From" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && currCode === "IND") {
            newOption.selected = "selected";
        }            
    } 

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    //console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg = element.parentElement.querySelector("img");
    newImg.src = newSrc;
}

btn.addEventListener(("click"), (evt) => {
    evt.preventDefault();
    updateExchangeRate(); 

});

const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    //console.log(amtValue);
    //console.log(fromCurr.value, toCurr.value);

    //const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //console.log(URL);
    let response = await fetch(URL);
    //console.log(response);
    let data = await response.json();
    //console.log(data);
    //console.log(toCurr.value.toLowerCase());
    let rateArray = data[fromCurr.value.toLowerCase()];
    //console.log(rateArray);
    let rate = rateArray[toCurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = (amtValue * rate).toFixed(2);
    //console.log(finalAmount);

    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
};

