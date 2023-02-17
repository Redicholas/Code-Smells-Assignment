export class Product {
    constructor(
      public name: string,
      public price: number,
      public imageUrl: string,
      public parent: HTMLElement,
      public description?: string,
      public amount?: number,
    ) {}
  }