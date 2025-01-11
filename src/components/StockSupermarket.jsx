import React, { useState } from "react";

const StockSupermarket = () => {
  const [products, setProducts] = useState([
    { id: 0, Name: "Lechugas", Price: 5, Quantity: 10 },
  ]);

  const handleBuyProduct = (ProductId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === ProductId
          ? {
              ...product,
              Quantity: product.Quantity > 0 ? product.Quantity - 1 : 0,
            }
          : product
      )
    );
  };
  return (
    <>
      <h2>Stock Supermarket</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.Name} - Precio: {product.Price}€ - Stock:{" "}
            {product.Quantity}
            <button onClick={() => handleBuyProduct(product.id)} disabled={product.Quantity === 0}>
              Comprar
            </button>
            {product.Quantity === 0 && <span> - Sin stock</span>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StockSupermarket;
