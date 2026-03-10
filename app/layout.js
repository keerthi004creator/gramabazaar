import "./globals.css";
import { CartProvider } from "../context/cartContext";
 import { LanguageProvider } from "../context/languageContext";
import CartDrawer from "./components/cartDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
        <LanguageProvider>
          {children}
          <CartDrawer />
        </LanguageProvider>
        </CartProvider>
      </body>

    </html>
  );
}