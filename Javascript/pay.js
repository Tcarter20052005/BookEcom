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

// Toggle Error Text
function ErrorTXT(show, message = "") {
    const errortxt = document.getElementById("error-text")
    errortxt.parentNode.style.display = show ? "block" : "none";
    errortxt.textContent = message;
}

// Add a Form Submit Event Listener
document.getElementById("pay-form"). addEventListener("submit", async function(event) {
    event.preventDefault();
    const form = document.getElementById("pay-form");
    
    try {
        ErrorTXT(false); // Ensure Error Text has been hiden again

        // Retrieve Form Values
        const cardNum = document.getElementById("cardNum").value.trim();
        const expMon = document.getElementById("expmon").value;
        const expYear = document.getElementById("expyear").value;
        const CCV = document.getElementById("seCode").value.trim();

        // Ensure Numeric Inputs
        if (isNaN(cardNum) || isNaN(expMon) || isNaN(expYear) || isNaN(CCV)) {
            throw new Error("Incorrect Data Type entered");
        }

        // Form Validation - Step 1 -- Master Card Number and Length Check
        const MCregex = /^5[1-5]\d{14}$/;
        if (!MCregex.test(cardNum)) {
            throw new Error("Invalid Card Number");
        }

        // Form Validation - Step 2 -- Card Expiry Check
        const checkYear = new Date().getFullYear();
        const checkMonth = new Date().getMonth()+1;

        if (checkYear > expYear) {
            throw new Error("Card is Expired or Incorrect")
        } else if (expYear == currentYear && checkMonth > expMon) {
            throw new Error("Card is Expired or Incorrect")
        }
            
        // Form Validation - Step 3 -- CCV Length Check
        const CCVlen = CCV.toString().length;
        if (CCVlen < 3 || CCVlen > 4) {
            throw new Error("CCV Incorrect Length")
        }

        // Build Data
        const sendData = {
            "master_card": cardNum,
            "exp_year": expYear,
            "exp_month": expMon,
            "cvv_code": CCV
        }


        // Post Request Data
        fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server Error: Incorrerct Data");
            }
            if (response.headers.get("Content-Type").includes("application/json")) {
                return response.json()
            } else {
                return response.text()
            }
        })
        .then (resp => {
            if (typeof resp === "string") {
                throw new Error(resp);
            }
            alert(resp.message);
        })


        alert("ok");
    }
    catch(error) {
        ErrorTXT(true, error.message);
        form.reset();
    }

    
})
