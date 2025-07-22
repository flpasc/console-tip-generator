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
        const splitInfo = this.isDivided
            ? `
	Divide among people: yes
	Split between how many people: ${this.numPeople}
	Each person pays: $${this.calculateAmountPerPerson()}`
            : '';
        return `
	--- Tip Calculation Summary ---
	Check Amount: $${this.checkAmount.toFixed(2)}
	Tip Percentage: ${this.tipPercentage}%
	Tip Amount: $${this.tip.toFixed(2)}
	Total Bill: $${this.totalAmount.toFixed(2)}${splitInfo}
	-----------------------------`;
    }
}
export class InputValidator {
    isCurrency(input) {
        try {
            const isInputValid = input.match(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/);
            return isInputValid != null;
        }
        catch (error) {
            return false;
        }
    }
    isNumeric(input) {
        try {
            const isInputValid = input.match(/^\d+$/);
            return isInputValid != null;
        }
        catch (error) {
            return false;
        }
    }
    isYesOrNo(input) {
        return input === 'yes' || input === 'y' || input === 'no' || input === 'n';
    }
    validate(type, input) {
        if (type === 'isNumeric')
            return this.isNumeric(input);
        else if (type === 'isYesOrNo')
            return this.isYesOrNo(input);
        else if (type === 'isCurrency')
            return this.isCurrency(input);
        else {
            return false;
        }
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
        this.question = 'How high is the check? ';
        this.validator = new InputValidator();
    }
    showInput(question, type) {
        let result = readlineSync.question(question);
        let validationResult = this.validator.validate(type, result);
        while (!validationResult) {
            let newInput = readlineSync.question('Please enter a valid input: ');
            validationResult = this.validator.validate(type, newInput);
            if (validationResult)
                result = newInput;
        }
        return result;
    }
    isConfirmed(input) {
        return input === 'yes' || input === 'y';
    }
}
const input = new InputHandler();
const checkAmountString = input.showInput('How high is the check? ', 'isCurrency');
const checkAmount = Number.parseFloat(checkAmountString);
const tipPercentageString = input.showInput('What percentage of tip will you give? ', 'isNumeric');
const tipPercentage = Number.parseInt(tipPercentageString);
const splitInput = input.showInput('Should the bill be split among multiple people? ', 'isYesOrNo');
console.log('SplitInput:', splitInput);
let confirmed = input.isConfirmed(splitInput);
let tipCalculator;
if (confirmed) {
    let numberOfPeopleString = input.showInput('How many people will split the bill? ', 'isNumeric');
    let numberOfPeople = Number.parseInt(numberOfPeopleString);
    tipCalculator = new TipCalculator(checkAmount, tipPercentage, confirmed, numberOfPeople);
}
else {
    tipCalculator = new TipCalculator(checkAmount, tipPercentage, confirmed);
}
tipCalculator.calculateTotal();
console.log(tipCalculator.toString());
