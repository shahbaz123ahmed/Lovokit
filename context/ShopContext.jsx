"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export function parseNumericPrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return 125000;
  const cleaned = String(priceStr).replace(/[^0-9]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) || num === 0 ? 125000 : num;
}

const ShopContext = createContext({
  cart: [],
  wishlist: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartSubtotal: 0,
  cartGst: 0,
  cartTotal: 0,
  toggleWishlist: () => {},
  isInWishlist: () => false,
  removeFromWishlist: () => {},
  wishlistCount: 0,
  cartDrawerOpen: false,
  setCartDrawerOpen: () => {},
  toastMessage: "",
  showToast: () => {},
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  authModalOpen: false,
  setAuthModalOpen: () => {},
  authPromptReason: "",
  setAuthPromptReason: () => {},
});

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authPromptReason, setAuthPromptReason] = useState("");
  const [mounted, setMounted] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  const login = (userData) => {
    const fullUser = {
      name: userData?.name || "Customer",
      email: userData?.email || "customer@lovokit.in",
      phone: userData?.phone || "+91 98000 00000",
      company: userData?.company || "Lovosis Technology Pvt Ltd",
      gstin: userData?.gstin || "27AABCL1234F1Z5",
      address: userData?.address || {
        street: "Office 402, Technology Park, Phase 1",
        landmark: "Near Hinjawadi IT Park",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
        country: "India",
      },
      ...userData,
    };
    setUser(fullUser);
    try {
      localStorage.setItem("lovokit_user", JSON.stringify(fullUser));
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("lovokit_user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
    showToast("Signed out successfully");
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedFields };
      try {
        localStorage.setItem("lovokit_user", JSON.stringify(merged));
      } catch (e) {
        console.error("Failed to update user in localStorage:", e);
      }
      return merged;
    });
    showToast("Profile details updated successfully!");
  };

  // Hydrate from localStorage once on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = localStorage.getItem("lovokit_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedCart = localStorage.getItem("lovokit_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("lovokit_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to read cart/wishlist from localStorage:", e);
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("lovokit_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart:", e);
      }
    }
  }, [cart, mounted]);

  // Sync wishlist to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("lovokit_wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlist:", e);
      }
    }
  }, [wishlist, mounted]);

  const addToCart = (product, quantity = 1, openDrawer = true) => {
    if (!product || !product.id) return;
    const numericPrice = parseNumericPrice(product.price);
    const qty = Math.max(1, quantity);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            model: product.model,
            brand: product.brand,
            title: product.title,
            image: product.image,
            price: product.price || `₹${numericPrice.toLocaleString("en-IN")}`,
            numericPrice,
            quantity: qty,
            specs: typeof product.specs === "string" ? product.specs : product.specs?.[0]?.value || "",
            categoryName: product.categoryName || "Instrument",
          },
        ];
      }
    });

    showToast(`Added ${product.brand} ${product.model} (Qty: ${qty}) to Cart!`);
    if (openDrawer) {
      setCartDrawerOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast("Item removed from Cart");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared");
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.model} from Wishlist`);
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved ${product.model} to Wishlist!`);
        return [
          ...prevWishlist,
          {
            id: product.id,
            model: product.model,
            brand: product.brand,
            title: product.title,
            image: product.image,
            price: product.price,
            numericPrice: parseNumericPrice(product.price),
            specs: typeof product.specs === "string" ? product.specs : product.specs?.[0]?.value || "",
            categoryName: product.categoryName || "Instrument",
            inStock: product.inStock !== false,
          },
        ];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from Wishlist");
  };

  // Calculated totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.numericPrice * item.quantity,
    0
  );
  const cartGst = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + cartGst;
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartGst,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount,
        cartDrawerOpen,
        setCartDrawerOpen,
        toastMessage,
        showToast,
        user,
        login,
        logout,
        updateUser,
        authModalOpen,
        setAuthModalOpen,
        authPromptReason,
        setAuthPromptReason,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
