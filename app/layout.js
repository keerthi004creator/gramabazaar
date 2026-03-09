import "./globals.css";
import { CartProvider } from "../context/cartContext";
import CartDrawer from "./components/cartDrawer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}