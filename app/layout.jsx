import { Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "LOVOKIT® | Precision Instrumentation for Education, Research & Industry",
  description:
    "Official website of LOVOKIT. High-performance test, measurement, and automation solutions for labs, R&D, and industrial applications.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} light scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#FFC400] selection:text-black">
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
