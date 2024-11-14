"use client"
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state of the cart
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

// Create context
const CartContext = createContext(initialState);

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Item already exists in the cart, update its quantity
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: (item.quantity || 1) + 1 }; // Increase quantity
          }
          return item;
        });
      } else {
        // Item does not exist, add it to the cart with quantity set to 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Calculate total items and total amount
      const totalItems = updatedItems.reduce((total, item) => total + (item.quantity || 1), 0);
      const totalAmount = updatedItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
      };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotalItems = filteredItems.reduce((total, item) => total + (item.quantity || 1), 0);
      const newTotalAmount = filteredItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

      return {
        ...state,
        items: filteredItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      };

    case 'UPDATE_ITEM':
      const updatedCartItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

      // Recalculate totals
      const updatedTotalItems = updatedCartItems.reduce((total, item) => total + (item.quantity || 1), 0);
      const updatedTotalAmount = updatedCartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

      return {
        ...state,
        items: updatedCartItems,
        totalItems: updatedTotalItems,
        totalAmount: updatedTotalAmount,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalAmount: action.payload.totalAmount,
      };

    case 'ALL_CLEAR':
      return initialState

    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', payload: storedCart });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      totalItems: state.totalItems,
      totalAmount: state.totalAmount,
    }));
  }, [state]);

  const addItem = item => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = id => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateItem = (id, updatedProperties) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, ...updatedProperties } });
  };

  const allClear = () => {
    dispatch({type: 'ALL_CLEAR'})
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateItem,allClear }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  return useContext(CartContext);
};
