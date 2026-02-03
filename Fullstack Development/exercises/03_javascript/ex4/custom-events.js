// Event listener for roll-button.
document.getElementById('roll-button').addEventListener('click', () => {
    rollDice();
});

// Handle rollDice event
document.addEventListener('rollDice', (event) => {
    const rollValue = event.detail.value;

    updateDiceCount(rollValue);

    updateTotalRollCount();

    updateRollButton(rollValue);
});

// Function for updating count for individual dice (ones, twos, etc)
function updateDiceCount(rollValue)
{
    const rollDivs = {
        1: document.getElementById('ones').querySelector('p'),
        2: document.getElementById('twos').querySelector('p'),
        3: document.getElementById('threes').querySelector('p'),
        4: document.getElementById('fours').querySelector('p'),
        5: document.getElementById('fives').querySelector('p'),
        6: document.getElementById('sixes').querySelector('p')
    };

    const currentCount = parseInt(rollDivs[rollValue].textContent) || 0;
    rollDivs[rollValue].textContent = currentCount + 1;
}

// Function to update the total roll count
function updateTotalRollCount() {
    const totalRollSpan = document.querySelector('#totals span');
    const currentTotal = parseInt(totalRollSpan.textContent) || 0;
    totalRollSpan.textContent = currentTotal + 1;
}
// function to update the roll-button with latest dice roll value
function updateRollButton(rollValue) {
    const rollButton = document.getElementById('roll-button');
    const template = document.getElementById(`template${rollValue}`).content.cloneNode(true);
    rollButton.innerHTML = '';
    rollButton.appendChild(template);
}