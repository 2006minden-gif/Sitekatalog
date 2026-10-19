import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as defaultProducts, categories as defaultCategories, Product, Category } from '../data/products';

interface CatalogContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  importProducts: (newProducts: Product[]) => void;
  clearProducts: () => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('catalog_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('catalog_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('catalog_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('catalog_categories', JSON.stringify(categories));
  }, [categories]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const importProducts = (newProducts: Product[]) => {
    setProducts(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const toUpdate = newProducts.filter(p => existingIds.has(p.id));
      const toAdd = newProducts.filter(p => !existingIds.has(p.id));
      
      let updated = prev.map(p => {
        const update = toUpdate.find(u => u.id === p.id);
        return update ? { ...p, ...update } : p;
      });
      
      return [...updated, ...toAdd];
    });
  };

  const clearProducts = () => {
    setProducts([]);
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CatalogContext.Provider value={{
      products, categories,
      addProduct, updateProduct, deleteProduct, importProducts, clearProducts,
      addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('useCatalog must be used within CatalogProvider');
  return context;
}
