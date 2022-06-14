import { textFieldClasses } from "@mui/material";
import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

const initialState = {
  darkTheme: false,
};

export const Store = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkTheme: true };
    case "DARK_MODE_OFF":
      return { ...state, darkTheme: false };
    case "LOAD_THEME":
      return { ...state, darkTheme: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
