const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const btn = document.querySelector(".ex-rate-btn");
let msg = document.querySelector(".msg");
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from") {
            if (currcode === "USD") {
                newOption.selected = "selected";
            }
        }
        else if (select.name === "to") {
            if (currcode === "INR") {
                newOption.selected = "selected";
            }
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
let updateFlag = (element) => {
    let currcode = element.value;
    // console.log(element);
    let countryCode = countryList[currcode]
    console.log(countryCode)
    let newSRC = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSRC;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal <= 0 || amtVal === "") {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let rate = data[toCurr.value.toLowerCase()] * amtVal;
    console.log(`${rate} ${toCurr.value}`);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
});