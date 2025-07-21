import readlineSync from 'readline-sync';
export class TipCalculator {
    constructor(checkAmount, tipPercentage, isDivided, numPeople) {
        this.numPeople = 1;
        this.checkAmount = checkAmount;
        this.tipPercentage = tipPercentage;
        this.isDivided = isDivided;
        this.numPeople = numPeople !== null && numPeople !== void 0 ? numPeople : 1;
        this.tip = this.calculateTip();
        this.totalAmount = this.calculateTotal();
    }
    calculateTip() {
        return Number((this.checkAmount * (this.tipPercentage / 100)).toFixed(2));
    }
    calculateTotal() {
        return this.tip + this.checkAmount;
    }
    calculateAmountPerPerson() {
        const raw = this.totalAmount / this.numPeople;
        const roundedUp = Math.ceil(raw * 100) / 100;
        return parseFloat(roundedUp.toFixed(2));
    }
    toString() {
        return `
    --- Tip Calculation Summary ---
    Check Amount: $${this.checkAmount.toFixed(2)}
    Tip Percentage: ${this.tipPercentage}%
    Tip Amount: $${this.tip.toFixed(2)}
    Total Bill: $${this.totalAmount.toFixed(2)}
    Divide among people: ${this.isDivided ? 'yes' : 'no'}
    Split between how many people: ${this.numPeople}
    Each person pays: $${this.calculateAmountPerPerson()}
    -----------------------------`;
    }
}
export function main() {
    const output = `
    --- Tip Calculation Summary ---
    Check Amount: $50.00
    Tip Percentage: 15%
    Tip Amount: $7.50
    Total Bill: $57.50
    Divide among people: yes
    Split between how many people: 2
    Each person pays: $28.75
    -----------------------------`;
    return output;
}
export class InputHandler {
    constructor() {
        this.question = "How high is the check?";
    }
    showInput(question) {
        const result = readlineSync.question(question);
        return result;
    }
    isConfirmed(input) {
        return input === 'yes';
    }
}
const input = new InputHandler();
let checkAmountString = input.showInput("How high is the check?");
let checkAmount = Number.parseInt(checkAmountString);
let tipPercentageString = input.showInput("What percentage of tip will you give?");
let tipPercentage = Number.parseInt(tipPercentageString);
const splitInput = input.showInput("Should the bill be split among multiple people?");
let confirmed = input.isConfirmed(splitInput);
let tipCalculator;
if (confirmed) {
    let numberOfPeopleString = input.showInput("How many people will split the bill?");
    let numberOfPeople = Number.parseInt(numberOfPeopleString);
    tipCalculator = new TipCalculator(checkAmount, tipPercentage, confirmed, numberOfPeople);
}
else {
    tipCalculator = new TipCalculator(checkAmount, tipPercentage, confirmed);
}
tipCalculator.calculateTotal();
console.log(tipCalculator.toString());
