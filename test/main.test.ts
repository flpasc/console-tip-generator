import { main } from "../main";

import { TipCalculator } from "../main";
const instanceofTipCalculator = new TipCalculator(50, 15, true, 2);

test("Expected tip amount", () => {
  const result = (instanceofTipCalculator as any).calculateTip();
  expect(result).toBe(7.5);
});

test("Expected total amount", () => {
  expect(instanceofTipCalculator.calculateTotal()).toBe(57.5);
});

test("Expected amount per person", () => {
  expect(instanceofTipCalculator.calculateAmountPerPerson()).toBe(28.75);
});

test("Expected final output", () => {
  expect(main()).toBe(`
    --- Tip Calculation Summary ---
    Check Amount: $50.00
    Tip Percentage: 15%
    Tip Amount: $7.50
    Total Bill: $57.50
    Divide among people: yes
    Split between how many people: 2
    Each person pays: $28.75
    -----------------------------`);
});
