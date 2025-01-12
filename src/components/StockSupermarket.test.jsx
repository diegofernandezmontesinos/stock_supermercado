import { screen, render, fireEvent } from "@testing-library/react";
import StockSupermarket from "./StockSupermarket";

const renderComponentStockSupermarket = () => {
  render(<StockSupermarket />);
};

describe("test of the component StockSupermarket", () => {
  it("should show a list of product with name, price and quantity in stock", () => {
    renderComponentStockSupermarket();
    expect(screen.getByText(/Lechugas/i)).toBeInTheDocument();
    expect(screen.getByText(/Precio: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock: 10/i)).toBeInTheDocument();
  });

  it("should have a button with placeholder Comprar for each product", () => {
    renderComponentStockSupermarket();
    const buyButtons = screen.getAllByText(/Comprar/i);
    expect(buyButtons).toHaveLength(2); // Dos productos en el stock, por lo tanto dos botones
  }); 

  it("should reduce the quantity on stock after click on the button", () => {
    renderComponentStockSupermarket();
    const buyButtons = screen.queryAllByText(/Comprar/i); // Obtiene todos los botones
    const firstBuyButton = buyButtons[0]; // Selecciona el botón correspondiente al primer producto
  
    fireEvent.click(firstBuyButton);
    expect(screen.getByText(/Stock: 9/i)).toBeInTheDocument(); // Verifica que el stock disminuyó
  });

  it("should disable the buy button and show 'Sin stock' when stock is 0", () => {
    renderComponentStockSupermarket();

    const buyButtons = screen.queryAllByText(/Comprar/i);
    const firstBuyButton = buyButtons[0]; // Selecciona el botón para "Lechugas"
    for (let i = 0; i < 10; i++) {
      fireEvent.click(firstBuyButton);
    }

    expect(screen.getByText(/Stock: 0/i)).toBeInTheDocument();
    expect(firstBuyButton).toBeDisabled();
    expect(screen.getByText(/Sin stock/i)).toBeInTheDocument();
  });

  it("should reduce stock and add product to cart whn bought", async () => {
    renderComponentStockSupermarket();
    const buyButton = screen.getByTestId("buy-button-1");

    fireEvent.click(buyButton);
    expect(await screen.findByText(/Stock: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrito de Compras/i)).toBeInTheDocument();
    expect(screen.getByText(/Lechugas/i)).toBeInTheDocument();
  });
});
