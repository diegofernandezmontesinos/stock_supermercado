import React, { useState } from "react";

const StockSupermarket = () => {
  const [products, setProducts] = useState([
    { id: 0, Name: "Lechugas", Price: 5, Quantity: 10 },
    { id: 1, Name: "Tomates", Price: 3, Quantity: 5 },
  ]);

  const [cart, setCart] = useState([]);

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

    setProducts((prevProducts) => {
      const product = prevProducts.find((product) => product.id === ProductId);
      if (product && product.Quantity > 0) {
        setCart((prevCart) => {
          const existingProduct = prevCart.find(
            (item) => item.id === ProductId
          );
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === ProductId
                ? { ...item, Quantity: item.Quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, Quantity: 1 }];
        });
      }
      return prevProducts;
    });
  };

  return (
    <>
      <h2>Stock Supermarket</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} data-testid={`product-${product.id}`}>
            {product.Name} - Precio: {product.Price}€ - Stock:{" "}
            {product.Quantity}
            <button
              onClick={() => handleBuyProduct(product.id)}
              disabled={product.Quantity === 0}
              data-testid={`buy-button-${product.id}`}
            >
              Comprar
            </button>
            {product.Quantity === 0 && <span> - Sin stock</span>}
          </li>
        ))}
      </ul>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.Name} - Precio: {item.Price}€ - Stock: {item.Quantity}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StockSupermarket;
