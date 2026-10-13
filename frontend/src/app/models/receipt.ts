export class Receipt {
    constructor(
      public receiptNumber: string,
      public receiptDate: string,
      public totalAmount: string,
      public storeName: string,
      public salesTax: string
    ) {}
  }
  