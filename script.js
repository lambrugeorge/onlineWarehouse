new FinisherHeader({
  "count": 100,
  "size": {
    "min": 2,
    "max": 3,
    "pulse": 0.1
  },
  "speed": {
    "x": {
      "min": 0,
      "max": 0.2
    },
    "y": {
      "min": 0,
      "max": 0.5
    }
  },
  "colors": {
    "background": "#201e30",
    "particles": [
      "#fbfcca",
      "#d7f3fe",
      "#fff8a7"
    ]
  },
  "blending": "overlay",
  "opacity": {
    "center": 1,
    "edge": 0.3
  },
  "skew": -2.4,
  "shapes": [
    "s",
    "t"
  ]
});
//---------------------------------------------Up design is import from site thank you---------------------//

class OnlineWarehouse {
  constructor() {
      this.stock = {};
  }

  addProduct = (category, product, quantity) => {
      const categoryStock = this.stock[category] || {};
      categoryStock[product] = categoryStock[product] ? categoryStock[product] + quantity : quantity;
      this.stock[category] = categoryStock;
  };

  checkQuantity = (category, product) => {
      const categoryStock = this.stock[category] || {};
      return categoryStock[product] || 0;
  };
}

const onlineWarehouse = new OnlineWarehouse();
const productList = [
  {
      category: "Clothing",
      products: {
          "Levi's Pants": 5,
          "Nike Hoodie": 3,
          "Adidas T-shirt": 10,
          "North Face Jacket": 7,
          "Reusch Gloves": 20,
          "Columbia Hat": 15,
          "Calvin Klein Dress": 8,
          "Hugo Boss Blazer": 4,
          "Tommy Hilfiger Sweater": 6,
          "Armani Suit": 2,
      },
  },
  {
      category: "Electronics",
      products: {
          "LG Fridge": 2,
          "Sony TV": 4,
          "Dell Laptop": 8,
          "Samsung Phone": 15,
          "Bosch Stove": 3,
          "Apple iPad Tablet": 7,
          "Bose Speakers": 10,
          "Sony Earphones": 12,
          "Canon Camera": 6,
      },
  },
  {
      category: "Furniture",
      products: {
          "IKEA Table": 10,
          "Kartell Chair": 12,
          "Ashley Furniture Sofa": 5,
          "Sleep Number Bed": 7,
          "IKEA Wardrobe": 6,
          "Steelcase Desk": 3,
          "Herman Miller Ergonomic Chair": 4,
      },
  },
  {
      category: "Toys",
      products: {
          "Nerf Water Gun": 50,
          "Hot Wheels Toy Car": 30,
          "Lego Star Wars Set": 25,
          "Barbie Doll": 40,
          "LEGO Toy Plane": 35,
          "Magnetic Tiles Building Game": 20,
          "Brio Train Set": 15,
      },
  },
];

const totalQuantity = productList.reduce(
  (total, category) =>total + Object.values(category.products).reduce((subtotal, quantity) => subtotal + quantity, 0),0
);

console.log(`The total quantity in the warehouse is: ${totalQuantity}`);

// HTML Elements
const nameInput = document.getElementById('name');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const addButton = document.getElementById('add');
const productListElement = document.getElementById('product-list');
const totalQuantitySpan = document.getElementById('total-quantity');

// Event for adding a product
addButton.addEventListener('click', () => {
  const productName = nameInput.value;
  const productCategory = categoryInput.value;
  const productQuantity = parseInt(quantityInput.value);

  // Add the product to the warehouse using the previously defined function
  onlineWarehouse.addProduct(productCategory, productName, productQuantity);

  // Update the product list and total quantity
  updateInterface();
});

// Function to update the interface
const updateInterface = () => {
  // Display the product list in the warehouse
  const warehouseProductList = onlineWarehouse.stock;
  productListElement.innerHTML = '';

  for (const category in warehouseProductList) {
      for (const product in warehouseProductList[category]) {
          const quantity = warehouseProductList[category][product];
          const listItem = document.createElement('li');
          listItem.textContent = `${product} (${category}): ${quantity}`;
          productListElement.appendChild(listItem);
      }
  }

  // Calculate and display the total quantity in the warehouse
  const totalQuantity = Object.values(onlineWarehouse.stock)
      .reduce((total, category) => {
          return total + Object.values(category)
              .reduce((subtotal, quantity) => subtotal + quantity, 0);
      }, 0);
  totalQuantitySpan.textContent = `The total quantity in the warehouse is: ${totalQuantity}`;
};

// Initialize the interface
updateInterface();
