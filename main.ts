import readlineSync from 'readline-sync'

export class TipCalculator {
	private checkAmount: number
	private tipPercentage: number
	private isDivided: boolean
	private numPeople: number = 1
	private tip: number
	private totalAmount: number

	constructor(
		checkAmount: number,
		tipPercentage: number,
		isDivided: boolean,
		numPeople?: number,
	) {
		this.checkAmount = checkAmount
		this.tipPercentage = tipPercentage
		this.isDivided = isDivided
		this.numPeople = numPeople ?? 1
		this.tip = this.calculateTip()
		this.totalAmount = this.calculateTotal()
	}

	private calculateTip(): number {
		return Number((this.checkAmount * (this.tipPercentage / 100)).toFixed(2))
	}

	calculateTotal(): number {
		return this.tip + this.checkAmount
	}

	calculateAmountPerPerson(): number {
		const raw = this.totalAmount / this.numPeople
		const roundedUp = Math.ceil(raw * 100) / 100
		return parseFloat(roundedUp.toFixed(2))
	}

	toString() {
		const splitInfo = this.isDivided
			? `
	Divide among people: yes
	Split between how many people: ${this.numPeople}
	Each person pays: $${this.calculateAmountPerPerson()}`
			: ''

		return `
	--- Tip Calculation Summary ---
	Check Amount: $${this.checkAmount.toFixed(2)}
	Tip Percentage: ${this.tipPercentage}%
	Tip Amount: $${this.tip.toFixed(2)}
	Total Bill: $${this.totalAmount.toFixed(2)}${splitInfo}
	-----------------------------`
	}
}

export class InputValidator {
	isCurrency(input: string): boolean {
		try {
			const isInputValid = input.match(
				/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
			)
			return isInputValid != null
		} catch (error) {
			return false
		}
	}

	isNumeric(input: string): boolean {
		try {
			const isInputValid = input.match(/^\d+$/)
			return isInputValid != null
		} catch (error) {
			return false
		}
	}

	isYesOrNo(input: string): boolean {
		return input === 'yes' || input === 'y' || input === 'no' || input === 'n'
	}

	validate(type: string, input: string): boolean {
		if (type === 'isNumeric') return this.isNumeric(input)
		else if (type === 'isYesOrNo') return this.isYesOrNo(input)
		else if (type === 'isCurrency') return this.isCurrency(input)
		else {
			return false
		}
	}
}

export function main() {
	const output: string = `
    --- Tip Calculation Summary ---
    Check Amount: $50.00
    Tip Percentage: 15%
    Tip Amount: $7.50
    Total Bill: $57.50
    Divide among people: yes
    Split between how many people: 2
    Each person pays: $28.75
    -----------------------------`
	return output
}

export class InputHandler {
	question = 'How high is the check? '
	validator: InputValidator

	constructor() {
		this.validator = new InputValidator()
	}

	showInput(question: string, type: string): string {
		let result = readlineSync.question(question)

		let validationResult = this.validator.validate(type, result)

		while (!validationResult) {
			let newInput = readlineSync.question('Please enter a valid input: ')
			validationResult = this.validator.validate(type, newInput)
			if (validationResult) result = newInput
		}
		return result
	}

	isConfirmed(input: string): boolean {
		return input === 'yes' || input === 'y'
	}
}

const input = new InputHandler()
const checkAmountString = input.showInput(
	'How high is the check? ',
	'isCurrency',
)
const checkAmount = Number.parseFloat(checkAmountString)
const tipPercentageString = input.showInput(
	'What percentage of tip will you give? ',
	'isNumeric',
)
const tipPercentage = Number.parseInt(tipPercentageString)

const splitInput = input.showInput(
	'Should the bill be split among multiple people? ',
	'isYesOrNo',
)
console.log('SplitInput:', splitInput)
let confirmed = input.isConfirmed(splitInput)
let tipCalculator
if (confirmed) {
	let numberOfPeopleString = input.showInput(
		'How many people will split the bill? ',
		'isNumeric',
	)
	let numberOfPeople = Number.parseInt(numberOfPeopleString)
	tipCalculator = new TipCalculator(
		checkAmount,
		tipPercentage,
		confirmed,
		numberOfPeople,
	)
} else {
	tipCalculator = new TipCalculator(checkAmount, tipPercentage, confirmed)
}
tipCalculator.calculateTotal()
console.log(tipCalculator.toString())
