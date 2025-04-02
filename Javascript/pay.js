const cardNum = document.getElementById("cardNum");


// Populate Expiry Month
const expMonth = document.getElementById("expmon");
for (let i = 1; i <=12; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, "0");
    expMonth.appendChild(option);
}


// Populate Expiry Year
const yearSelect = document.getElementById("expyear");
const currentYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
    let option = document.createElement("option");
    option.value = currentYear + i;
    option.textContent = currentYear + i;
    yearSelect.appendChild(option);
}
