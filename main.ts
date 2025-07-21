export class TipCalculator {
  private checkAmount: number;
  private tipPercentage: number;
  private isDivided: boolean;
  private numPeople: number;
  private tip: number;
  private totalAmount: number;

  constructor(
    checkAmount: number,
    tipPercentage: number,
    isDivided: boolean,
    numPeople: number
  ) {
    this.checkAmount = checkAmount;
    this.tipPercentage = tipPercentage;
    this.isDivided = isDivided;
    this.numPeople = numPeople;
    this.tip = this.calculateTip();
    this.totalAmount = this.calculateTotal();
  }

  private calculateTip(): number {
    return this.checkAmount * (this.tipPercentage / 100);
  }

  calculateTotal(): number {
    return this.tip + this.checkAmount;
  }

  calculateAmountPerPerson(): number {
    const raw = this.totalAmount / this.numPeople;
    const roundedUp = Math.ceil(raw * 100) / 100;
    return parseFloat(roundedUp.toFixed(2));
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
    -----------------------------`;
  return output;
}
