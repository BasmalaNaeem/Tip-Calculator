const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom');
const peopleInput = document.getElementById('numOfpeaple');
const tipButtons = document.querySelectorAll('.btns button');
const tipAmountDisplay = document.getElementById('tipNum');
const totalAmountDisplay = document.getElementById('totalNum');
const resetButton = document.getElementById('reset');

let selectedTip = 0;

function calculateAmounts() {
    const billValue = parseFloat(billInput.value);
    const peopleValue = parseInt(peopleInput.value);

    if (isNaN(billValue) || isNaN(peopleValue) || peopleValue <= 0) {
        tipAmountDisplay.textContent = `$0.00`;
        totalAmountDisplay.textContent = `$0.00`;
        return;
    }

    const tipAmount = (billValue * selectedTip) / 100 / peopleValue;
    const totalAmount = (billValue * (1 + selectedTip / 100)) / peopleValue;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

function clearActiveState() {
    tipButtons.forEach(button => {
        button.classList.remove('active');
    });
}


tipButtons.forEach(button => {
    button.addEventListener('click', function() {
        clearActiveState();
        this.classList.add('active');
        selectedTip = parseFloat(this.textContent);
        customTipInput.value = ''; 
        calculateAmounts();
    });
});

customTipInput.addEventListener('input', () => {
    clearActiveState(); 
    selectedTip = parseFloat(customTipInput.value) || 0;
    calculateAmounts();
});

billInput.addEventListener('input', calculateAmounts);
peopleInput.addEventListener('input', calculateAmounts);

resetButton.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    selectedTip = 0;
    tipAmountDisplay.textContent = `$0.00`;
    totalAmountDisplay.textContent = `$0.00`;
    clearActiveState();
});
