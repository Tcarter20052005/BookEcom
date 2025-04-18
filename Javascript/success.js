window.onload = () =>{
    //get last four digits from card number sent by user
    // local storage api can be use look at w3schools
    
    const lastFour = localStorage.getItem("lastFour");

    document.getElementById("successTXT").textContent = "Your Credit Card Number Ends In " + lastFour.toString();
}