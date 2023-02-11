export class DiceRoll {
    private value: number;
    constructor(value: number) {
      this.value = value;
    }
  
    getValue(): number {
      return this.value;
    }
}