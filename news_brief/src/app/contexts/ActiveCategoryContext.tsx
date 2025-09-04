"use client";
import { createContext, ReactNode, useState } from "react";

interface ActiveCategoryContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

interface Props {
  children: ReactNode;
}

export const ActiveCategoryContext = createContext<ActiveCategoryContextType | undefined>(undefined);

const ActiveCategoryProvider = ({ children }: Props) => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  return (
    <ActiveCategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </ActiveCategoryContext.Provider>
  );
};

export default ActiveCategoryProvider;