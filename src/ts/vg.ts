/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList = [...products];

  let sortedList: Product[] = [];
  switch (sort) {
    case Sort.PRICE_ASCENDING:
      sortedList = sortByPrice(copiedList).reverse();
      break;
    case Sort.PRICE_DECENDING:
      sortedList = sortByPrice(copiedList);
      break;
    case Sort.NAME_ALPHABETIC:
      sortedList = sortByName(copiedList);
      break;
    case Sort.NAME_ALPHABETIC_REVERSE:
      sortedList = sortByName(copiedList).reverse();
      break;
    }

  return sortedList;
}

function sortByPrice(products: Product[]) {
  return products.sort((p1, p2) => {
    if (p1.price < p2.price) {
      return 1;
    } else if (p1.price > p2.price) {
      return -1;
    }
    return 0;
  });
}

function sortByName(products: Product[]) {
  return products.sort((p1, p2) => {
    if (p1.name < p2.name) {
      return 1;
    } else if (p1.name > p2.name) {
      return -1;
    }
    return 0;
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export const cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export const productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }
  const floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  for (let i = 0; i < productList.length; i++) {
    const { dogImgContainer, dogproduct }: { 
      dogImgContainer: HTMLDivElement; dogproduct: HTMLDivElement; 
    } = createDogProductContainer();

    const { cartSymbolContainer, cartSymbol }: { 
      cartSymbolContainer: HTMLDivElement; cartSymbol: HTMLElement; 
    } = createProductContainer(dogImgContainer, i, dogproduct);

    const dogImg: HTMLImageElement = createDogImage(i, cartSymbolContainer, dogImgContainer);

    productList[i].productSpec = false;

    createEventListeners(dogImg, i, cartSymbol);

    if (productList[i].category === "sassy") showSassyCategory(dogproduct);
    if (productList[i].category === "kriminella") showKriminellaCategory(dogproduct);
    if (productList[i].category == "singlar") showSinglarCategory(dogproduct);
    if (productList[i].category === "puppy") showPuppyCategory(dogproduct);
    if (productList[i].category === "oldies") showOldiesCategory(dogproduct);
  }
  
  const listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

function showSassyCategory(dogproduct: HTMLDivElement) {
  const cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
  dogproduct.className = "dogproduct";
  cat1.appendChild(dogproduct);
}
function showOldiesCategory(dogproduct: HTMLDivElement) {
  const cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
  dogproduct.className = "dogproduct";
  cat5.appendChild(dogproduct);
}

function showPuppyCategory(dogproduct: HTMLDivElement) {
  const cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
  dogproduct.className = "dogproduct";
  cat4.appendChild(dogproduct);
}

function showSinglarCategory(dogproduct: HTMLDivElement) {
  const cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
  dogproduct.className = "dogproduct";
  cat3.appendChild(dogproduct);
}

function showKriminellaCategory(dogproduct: HTMLDivElement) {
  const cat2: HTMLElement = document.getElementById(
    "kriminella"
  ) as HTMLElement;
  dogproduct.className = "dogproduct";
  cat2.appendChild(dogproduct);
}
  
function createEventListeners(dogImg: HTMLImageElement, i: number, cartSymbol: HTMLElement) {
  dogImg.addEventListener("click", () => {
    productList[i].productSpec = !productList[i].productSpec;
    window.location.href = "product-spec.html#backArrow";
    const listastext = JSON.stringify(productList);
    localStorage.setItem("savedList", listastext);
  });

  cartSymbol.addEventListener("click", () => {
    const cart = new Cart();
    cart.addToCart(i);
  });
}

function createProductContainer(dogImgContainer: HTMLDivElement, i: number, dogproduct: HTMLDivElement) {
  const cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";
  dogImgContainer.appendChild(cartSymbolContainer);

  const cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";
  cartSymbolContainer.appendChild(cartSymbol);

  const name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = productList[i].name;
  dogproduct.appendChild(name);

  const price: HTMLHeadingElement = document.createElement("p");
  price.innerHTML = "$" + productList[i].price;
  dogproduct.appendChild(price);

  const info: HTMLHeadingElement = document.createElement("p");
  info.innerHTML = productList[i].info;
  dogproduct.appendChild(info);
  return { cartSymbolContainer, cartSymbol };
}

function createDogImage(i: number, cartSymbolContainer: HTMLDivElement, dogImgContainer: HTMLDivElement) {
  const dogImg: HTMLImageElement = document.createElement("img");
  dogImg.src = productList[i].picture;
  dogImg.alt = productList[i].pictureAlt;
  dogImg.addEventListener("mouseover", () => {
    cartSymbolContainer.classList.add("hover");
    dogImg.classList.add("hover");
  });
  dogImg.addEventListener("mouseout", () => {
    dogImg.classList.remove("hover");
    cartSymbolContainer.classList.remove("hover");
  });
  dogImgContainer.appendChild(dogImg);
  return dogImg;
}

function createDogProductContainer() {
  const dogproduct: HTMLDivElement = document.createElement("div");
  const dogImgContainer: HTMLDivElement = document.createElement("div");
  dogImgContainer.className = "dogimgcontainer";
  dogproduct.appendChild(dogImgContainer);
  return { dogImgContainer, dogproduct };
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getFromStorage() {
  const fromStorage: string = localStorage.getItem("cartArray") || "";
  const asText: CartProduct[] = JSON.parse(fromStorage) || [];

  const amountContainer = createAmountText();
  const titleContainer = createTitleContainer();
  const productQuantity = createQuantityText();
  const checkoutTotal2 = createTotalText();

  createProductTable(asText, titleContainer, amountContainer, productQuantity);

  const addition = asText.reduce((acc, cur) => acc + cur.price * cur.amount, 0);
  createPriceText(checkoutTotal2, addition);
}

function createPriceText(checkoutTotal2: HTMLTableCellElement, addition: number) {
  const totalPrice2: HTMLTableCellElement = document.createElement("th");
  checkoutTotal2.appendChild(totalPrice2);
  totalPrice2.innerHTML = `$${addition}`;
  totalPrice2.id = "totalincenter";
}

function createTotalText() {
  const checkoutTotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  const totalText: HTMLTableCellElement = document.createElement("th");
  checkoutTotal2.appendChild(totalText);
  totalText.innerHTML = "total:";
  return checkoutTotal2;
}

function createQuantityText() {
  const productQuantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  const qtText: HTMLTableCellElement = document.createElement("th");
  productQuantity.appendChild(qtText);
  qtText.innerHTML = "change quantity:";
  return productQuantity;
}

function createTitleContainer() {
  const titleContainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titleContainer.innerHTML = "<strong>products:</strong>";
  return titleContainer;
}

function createAmountText() {
  const amountContainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  const amountText: HTMLTableCellElement = document.createElement("th");
  amountContainer.appendChild(amountText);
  amountText.innerHTML = "amount:";
  return amountContainer;
}

function createProductTable(
  asText: CartProduct[], titleContainer: HTMLTableRowElement, 
  amountContainer: HTMLDivElement, productQuantity: HTMLTableRowElement) {
  asText.forEach((product) => {
    const productT: HTMLTableCellElement = document.createElement("th");
    titleContainer.appendChild(productT);
    productT.innerHTML = product.name;

    const amountT: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(amountT);
    amountT.innerHTML = `x${product.amount}`;

    const amountQt: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(amountQt);
    const amountPlusBtn: HTMLButtonElement = document.createElement("button");
    amountQt.appendChild(amountPlusBtn);

    const icon: HTMLSpanElement = document.createElement("i");
    amountPlusBtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountPlusBtn.className = "plusbtn";

    const icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    const amountMinusBtn: HTMLButtonElement = document.createElement("button");
    amountQt.appendChild(amountMinusBtn);
    amountMinusBtn.appendChild(icon2);
    amountMinusBtn.className = "minusbtn";
  });
}
