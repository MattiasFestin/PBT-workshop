import { sum } from "lodash";
import OrderRow from "./OrderRow.js";

export default class Order {
  public rows: OrderRow[];
  public order_number: string;

  constructor(order_number: string, rows: OrderRow[]) {
    this.rows = rows;
    this.order_number = order_number;
  }

  public sum_with_vat(): number { 
    return sum(
        this.rows.map(x => x.amount() + x.vat())
      );
  }

  public sum(): number {
    return sum(
        this.rows.map(x => x.amount())
    );
  }

  public sum_group_vat(): Map<number, number> {
    const groups = new Map();
    
    for (const r of this.rows) {
      let amount = groups.get(r.vat_rate) ?? 0;
      amount += r.amount();
      groups.set(r.vat_rate, amount);
    }

    return groups;
  }
}