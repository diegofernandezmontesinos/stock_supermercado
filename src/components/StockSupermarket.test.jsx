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

  it("should have a button with placeholder Comprar", () => {
    renderComponentStockSupermarket();
    expect(screen.getByText(/Comprar/i)).toBeInTheDocument();
  });

  it("should reduce the quantity on stock after click on the button", () => {
    renderComponentStockSupermarket();
    const buyButton = screen.getByText(/Comprar/i);

    fireEvent.click(buyButton, { target: { value: 1 } });
    expect(screen.getByText(/Stock: 9/i)).toBeInTheDocument();
  });

  it("should disable the buy button and show 'Sin stock' when stock is 0", () => {
    renderComponentStockSupermarket();

    // Simulamos 10 compras para agotar el stock
    const buyButton = screen.getByText(/Comprar/i);
    for (let i = 0; i < 10; i++) {
      fireEvent.click(buyButton);
    }

    expect(screen.getByText(/Stock: 0/i)).toBeInTheDocument();
    expect(buyButton).toBeDisabled();
    expect(screen.getByText(/Sin stock/i)).toBeInTheDocument();
  });
});
