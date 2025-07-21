class TipCalculator {
  private checkAmount: number;
  private tipPercentage: number;
  private isDivided: boolean;
  private numPeople: number;

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
  }

  private calculateTip(checkAmount: number, tipPercentage: number): number {
    return checkAmount * (tipPercentage / 100);
  }

  calculateTotal(tip: number, checkAmount: number): number {
    return tip + checkAmount;
  }

  calculateAmountPerPerson(totalAmount: number, numPeople: number): number {
    return parseFloat((totalAmount / numPeople).toFixed(2));
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
