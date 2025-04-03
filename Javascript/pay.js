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
const currentYear = new Date().getFullYear()-2;
for (let i = 0; i < 10; i++) {
    let option = document.createElement("option");
    option.value = currentYear + i;
    option.textContent = currentYear + i;
    yearSelect.appendChild(option);
}

function HideErrorTXT() {
    const errortxt = document.getElementById("error-text")
    errortxt.parentNode.style.display = 'none';
}

function ShowErrorTXT() {
    const errortxt = document.getElementById("error-text")
    errortxt.parentNode.style.display = '';
}



// Add a Form Submit Event Listener
document.getElementById("pay-form"). addEventListener("submit", async function(event) {
    event.preventDefault();
    const form = document.getElementById("pay-form");
    
    try {
        // Retrieve Form Values
        HideErrorTXT();
        
        const cardNum = document.getElementById("cardNum").value.trim();
        const expMon = document.getElementById("expmon").value;
        const expYear = document.getElementById("expyear").value;
        const CCV = document.getElementById("seCode").value.trim();

        // Check if not a number
        if (isNaN(cardNum) || isNaN(expMon) || isNaN(expYear) || isNaN(CCV)) {
            throw new Error("Incorrect Data Type entered");
        }

        // Form Validation - Step 1 -- Card Number Length Check
        const cardNumLen = cardNum.toString().length;
        if (cardNumLen != 16) {
            throw new Error("Card Number is of Incorrect Size");
        } 

        // Form Validation - Step 2 -- Master Card Check
        const allowed = [51, 52, 53, 54, 55]
        if (!allowed.includes(Number(cardNum.toString().slice(0, 2)))) {
            throw new Error("Invalid MasterCard number");
        }

        // Form Validation - Step 3 -- Card Expiry Check
        const checkYear = new Date().getFullYear();
        const checkMonth = new Date().getMonth()+1;

        if (checkYear > expYear) {
            throw new Error("Card is Expired or Incorrect")
        } else if (expYear === currentYear && checkMonth > expMon) {
            throw new Error("Card is Expired or Incorrect")
        }
            
        // Form Validation - Step 4 -- CCV Length Check
        const CCVlen = CCV.toString().length;
        if (2 >= CCVlen || CCVlen >= 5) {
            throw new Error("CCV Incorrect Length")
        }

        // Compile to Send
        const sendData = {
            "master_card": cardNum,
            "exp_year": expYear,
            "exp_month": expMon,
            "cvv_code": CCV
        }

        // Post Data
        const response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
            
        })
        // Await and store Response
        const res = await response.json();

        alert(res.message);
    }
    catch(error) {
        const errortxt = document.getElementById("error-text")
        ShowErrorTXT();
        errortxt.innerHTML = error.message;
        form.reset();
    }

    
})
