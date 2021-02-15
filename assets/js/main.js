const koerperGroesseElement = document.getElementById("koerperGroesse");
const alterElement = document.getElementById("alter");
const gewichtElement = document.getElementById("gewicht");
const mannElement = document.getElementById("mann");
const faktorElement = document.getElementById("aktivitaet");

const grundUmsatzOutput = document.getElementById("grundUmsatzOutput");
const gesamtUmsatzOutput = document.getElementById("gesamtUmsatzOutput");
const calcBtn = document.getElementById("calcBtn");

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (mannElement.checked === true) {
        console.log("männlich");
        let grundUmsatz = (gewicht, koerperGroesse, alter) => grundUmsatz = 664.7 + (13.7 * gewicht) + (5 * koerperGroesse) - (6.8 * alter);
        let grundUmsatzValue = (grundUmsatz(gewichtElement.value, koerperGroesseElement.value, alterElement.value));
        grundUmsatzOutput.innerHTML = grundUmsatzValue;
        gesamtUmsatzOutput.innerHTML = (grundUmsatzValue * faktorElement.value);
        
    } else {
        console.log("weiblich");
        let grundUmsatzWeiblich = (gewicht, koerperGroesse, alter) => grundUmsatzWeiblich = 655.1 + (9.6 * gewicht) + (1.8 * koerperGroesse) - (4.7 * alter);
        let grundUmsatzWeiblichValue = (grundUmsatzWeiblich(gewichtElement.value, koerperGroesseElement.value, alterElement.value));
        grundUmsatzOutput.innerHTML = grundUmsatzWeiblichValue;
        gesamtUmsatzOutput.innerHTML = (grundUmsatzWeiblichValue * faktorElement.value);
    }
})